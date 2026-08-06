import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, AVAILABLE_COUPONS } from '@data/products';
import { translations } from '@data/translations';

const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  const [language, setLanguage] = useState('VI');
  const [currency, setCurrency] = useState('VND');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  
  // Load local state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('xstore_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('xstore_wishlist');
      return saved ? JSON.parse(saved) : ['prod-001', 'prod-003'];
    } catch {
      return ['prod-001', 'prod-003'];
    }
  });

  const [compareList, setCompareList] = useState([]);
  const [activeView, setActiveView] = useState('home');
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState(null);

  // Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [userOrders, setUserOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('xstore_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastCreatedOrder, setLastCreatedOrder] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Persist
  useEffect(() => {
    localStorage.setItem('xstore_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('xstore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('xstore_orders', JSON.stringify(userOrders));
  }, [userOrders]);

  const t = translations[language];

  const addToast = (title, description, type = 'success', image) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type, image }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const formatPrice = (priceVND, priceUSD) => {
    if (currency === 'USD') {
      return `$${priceUSD.toLocaleString()}`;
    }
    return `${priceVND.toLocaleString('vi-VN')}₫`;
  };

  const addToCart = (product, quantity = 1, color, size) => {
    const targetColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    const targetSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === targetColor && item.selectedSize === targetSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor: targetColor, selectedSize: targetSize }];
      }
    });

    addToast(
      language === 'VI' ? 'Đã thêm vào giỏ hàng' : 'Added to Cart',
      `${product.title} x ${quantity}`,
      'success',
      product.image
    );
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, color, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size))
    );
  };

  const updateCartQuantity = (productId, quantity, color, size) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === color && item.selectedSize === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId) => {
    const isSaved = wishlist.includes(productId);
    const product = products.find((p) => p.id === productId);

    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      if (product) {
        addToast(
          language === 'VI' ? 'Đã xóa khỏi Yêu thích' : 'Removed from Wishlist',
          product.title,
          'info'
        );
      }
    } else {
      setWishlist((prev) => [...prev, productId]);
      if (product) {
        addToast(
          language === 'VI' ? 'Đã thêm vào Yêu thích' : 'Saved to Wishlist',
          product.title,
          'success',
          product.image
        );
      }
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const toggleCompare = (product) => {
    const exists = compareList.some((p) => p.id === product.id);
    if (exists) {
      setCompareList((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      if (compareList.length >= 4) {
        addToast(
          language === 'VI' ? 'Tối đa 4 sản phẩm so sánh' : 'Maximum 4 compare items',
          language === 'VI' ? 'Vui lòng bỏ bớt sản phẩm để thêm mới' : 'Please remove an item first',
          'warning'
        );
        return;
      }
      setCompareList((prev) => [...prev, product]);
      setIsCompareOpen(true);
    }
  };

  const isInCompare = (productId) => compareList.some((p) => p.id === productId);

  const openProductDetail = (product) => {
    setSelectedProductDetail(product);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyCoupon = (code) => {
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return {
        success: false,
        message: language === 'VI' ? 'Mã giảm giá không hợp lệ!' : 'Invalid voucher code!'
      };
    }

    const subtotalVND = cart.reduce((acc, item) => acc + item.product.priceVND * item.quantity, 0);
    const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

    if (currency === 'VND' && subtotalVND < found.minSpendVND) {
      return {
        success: false,
        message: language === 'VI' ? `Đơn hàng tối thiểu ${found.minSpendVND.toLocaleString()}₫ để dùng mã này` : `Minimum spend ${found.minSpendVND.toLocaleString()}₫ required`
      };
    }

    if (currency === 'USD' && subtotalUSD < found.minSpendUSD) {
      return {
        success: false,
        message: language === 'VI' ? `Đơn hàng tối thiểu $${found.minSpendUSD} để dùng mã này` : `Minimum spend $${found.minSpendUSD} required`
      };
    }

    setAppliedCoupon(found);
    addToast(
      language === 'VI' ? 'Áp dụng voucher thành công!' : 'Voucher Applied!',
      found.description,
      'success'
    );
    return {
      success: true,
      message: language === 'VI' ? 'Đã áp dụng mã giảm giá thành công!' : 'Voucher successfully applied!'
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const placeOrder = (shippingAddress, paymentMethod) => {
    const subtotalVND = cart.reduce((acc, item) => acc + item.product.priceVND * item.quantity, 0);
    const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

    let discountVND = 0;
    let discountUSD = 0;

    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discountVND = (subtotalVND * appliedCoupon.discountValue) / 100;
        discountUSD = (subtotalUSD * appliedCoupon.discountValue) / 100;
      } else {
        discountVND = appliedCoupon.discountValue;
        discountUSD = appliedCoupon.discountValue / 23000;
      }
    }

    const shippingVND = subtotalVND >= 500000 ? 0 : 30000;
    const shippingUSD = subtotalUSD >= 39 ? 0 : 3;

    const totalVND = Math.max(0, subtotalVND - discountVND + shippingVND);
    const totalUSD = Math.max(0, subtotalUSD - discountUSD + shippingUSD);

    const newOrder = {
      id: `XS-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotalVND,
      subtotalUSD,
      discountVND,
      discountUSD,
      shippingVND,
      shippingUSD,
      totalVND,
      totalUSD,
      shippingAddress,
      paymentMethod,
      status: 'processing'
    };

    setUserOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setActiveView('checkout-success');

    addToast(
      language === 'VI' ? 'Đặt hàng thành công!' : 'Order Placed!',
      `Mã đơn: ${newOrder.id}`,
      'success'
    );

    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        isInCompare,
        activeView,
        setActiveView,
        selectedProductDetail,
        setSelectedProductDetail,
        openProductDetail,
        selectedQuickViewProduct,
        setSelectedQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCompareOpen,
        setIsCompareOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        formatPrice,
        userOrders,
        placeOrder,
        lastCreatedOrder,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
