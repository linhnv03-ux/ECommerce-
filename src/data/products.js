export const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    title: 'Ghế Armchair Nhung Marseille Minimalist',
    titleEn: 'Marseille Minimalist Velvet Armchair',
    subtitle: 'Luxury Scandinavian Design',
    category: 'furniture',
    categoryLabel: 'Nội thất cao cấp',
    priceVND: 4250000,
    priceUSD: 185,
    originalPriceVND: 5500000,
    originalPriceUSD: 239,
    rating: 4.9,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=1000&q=80'
    ],
    badges: ['BESTSELLER', '-22%'],
    isFlashSale: true,
    colors: [
      { name: 'Xanh Emerald', hex: '#004d40' },
      { name: 'Xám Tần Bì', hex: '#607d8b' },
      { name: 'Kem Sữa', hex: '#f5f5dc' }
    ],
    sizes: ['Đơn', 'Đôi'],
    inStock: true,
    stockCount: 14,
    description: 'Ghế Armchair nhung mịn cao cấp kết hợp khung chân gỗ sồi mạ vàng tinh tế. Mang lại sự thư thái tuyệt đối cho không gian phòng khách hoặc góc đọc sách.',
    descriptionEn: 'Premium velvet upholstery combined with gold-accented oak wood legs. Delivers supreme comfort for living rooms or reading nooks.',
    specifications: {
      'Chất liệu': 'Nhung Ý cao cấp, Chân Gỗ Sồi mạ đồng',
      'Kích thước': '85cm x 80cm x 92cm',
      'Tải trọng': '180 kg',
      'Xuất xứ': 'Nhập khẩu Pháp'
    },
    features: [
      'Đệm mút D40 độ đàn hồi cao không sụt lún',
      'Vải nhung chống bám bụi và dễ dàng vệ sinh',
      'Khung gỗ tự nhiên đã qua xử lý sấy khô chống mối mọt'
    ],
    reviews: [
      {
        id: 'rev-101',
        userName: 'Trần Hoàng Nam',
        rating: 5,
        date: '2026-07-28',
        comment: 'Ghế cực kỳ êm và mượt, đúng chuẩn phong cách Marseille Pháp. Giao hàng rất nhanh và cẩn thận.',
        verifiedPurchase: true
      },
      {
        id: 'rev-102',
        userName: 'Sophie Martin',
        rating: 5,
        date: '2026-07-15',
        comment: 'Absolutely stunning velvet chair! Perfect accent piece in our apartment.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-002',
    title: 'Đầm Lụa Tơ Tằm Pháp Marseille Evening',
    titleEn: 'Marseille Silk Evening Dress',
    subtitle: 'French Haute Couture',
    category: 'fashion',
    categoryLabel: 'Thời trang & May mặc',
    priceVND: 2850000,
    priceUSD: 125,
    originalPriceVND: 3500000,
    originalPriceUSD: 152,
    rating: 4.8,
    reviewCount: 24,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    badges: ['NEW', 'HOT'],
    isFlashSale: false,
    colors: [
      { name: 'Đỏ Burgundy', hex: '#800020' },
      { name: 'Đen Huyền', hex: '#111111' },
      { name: 'Vàng Champagne', hex: '#f7e7ce' }
    ],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    stockCount: 8,
    description: 'Đầm dạ hội chất liệu 100% lụa tơ tằm mềm mại rủ nhẹ theo đường cong cơ thể, mang lại vẻ quyến rũ và kiêu sa trong mọi sự kiện sang trọng.',
    descriptionEn: '100% pure Mulberry silk evening gown crafted with fluid elegance for glamorous galas and cocktail parties.',
    specifications: {
      'Chất liệu': '100% Lụa Tơ Tằm Bảo Lộc / Silk',
      'Kiểu dáng': 'Dạ hội Maxi ôm dáng',
      'Bảo quản': 'Giặt khô hoặc giặt tay nước lạnh'
    },
    features: [
      'Sợi lụa tự nhiên thoáng mát, óng ánh tự nhiên',
      'Cắt may thủ công chi tiết từng đường chỉ',
      'Đi kèm túi bảo quản lụa chuyên dụng'
    ],
    reviews: [
      {
        id: 'rev-201',
        userName: 'Nguyễn Bích Phương',
        rating: 5,
        date: '2026-08-01',
        comment: 'Mặc lên tôn dáng kinh khủng, vải lụa mướt như sương. Sẽ ủng hộ shop dài dài!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-003',
    title: 'Bình Gốm Nghệ Thuật Thủ Công Provence',
    titleEn: 'Provence Handmade Artisan Ceramic Vase',
    subtitle: 'Handcrafted French Pottery',
    category: 'decor',
    categoryLabel: 'Trang trí & Décor',
    priceVND: 890000,
    priceUSD: 39,
    originalPriceVND: 1100000,
    originalPriceUSD: 48,
    rating: 4.9,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581783342308-f792dbdd77c5?auto=format&fit=crop&w=1000&q=80'
    ],
    badges: ['BESTSELLER'],
    isFlashSale: true,
    colors: [
      { name: 'Trắng Gốm Nhám', hex: '#f0ede6' },
      { name: 'Nâu Đất Nung', hex: '#8b5a2b' }
    ],
    sizes: ['32cm', '45cm'],
    inStock: true,
    stockCount: 20,
    description: 'Bình gốm thủ công vuốt tay khắc họa nét tối giản hiện đại. Điểm nhấn hoàn hảo cho bàn trà, kệ sách hoặc tủ trưng bày phòng khách.',
    descriptionEn: 'Artisanal hand-thrown ceramic vase with earthy tactile finish, designed for minimalist floral arrangements.',
    specifications: {
      'Chất liệu': 'Đất sét tự nhiên nung nhiệt độ cao 1280°C',
      'Chiều cao': '32 cm x Đường kính 18 cm',
      'Trọng lượng': '1.8 kg'
    },
    features: [
      'Nung nhiệt độ cao chống thấm nước 100%',
      'Mỗi sản phẩm có vân gốm độc bản không trùng lặp'
    ],
    reviews: [
      {
        id: 'rev-301',
        userName: 'Lê Thu Trang',
        rating: 5,
        date: '2026-07-20',
        comment: 'Cắm hoa khô hay hoa tươi đều đẹp xuất sắc!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-004',
    title: 'Nước Hoa Unisex Marseille Botanical Eau De Parfum 100ml',
    titleEn: 'Marseille Botanical Eau De Parfum 100ml',
    subtitle: 'Grasse Niche Fragrance',
    category: 'beauty',
    categoryLabel: 'Mỹ phẩm & Nước hoa',
    priceVND: 3200000,
    priceUSD: 139,
    originalPriceVND: 3800000,
    originalPriceUSD: 165,
    rating: 5.0,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80'
    ],
    badges: ['HOT'],
    isFlashSale: false,
    colors: [],
    sizes: ['50ml', '100ml'],
    inStock: true,
    stockCount: 12,
    description: 'Mùi hương ngát hương oải hương miền Nam nước Pháp hòa quyện gỗ đàn hương và cảm giác mát lành của biển Địa Trung Hải. Lưu hương lên tới 12 giờ.',
    descriptionEn: 'An enchanting blend of French lavender, cedarwood, and coastal sea breeze from the South of France. Lasts up to 12 hours.',
    specifications: {
      'Nồng độ': 'Eau De Parfum (EDP)',
      'Tầng hương': 'Cam Bergamot, Hoa Oải Hương, Gỗ Đàn Hương, Cỏ Hương Bài',
      'Dung tích': '100 ml'
    },
    features: [
      'Chiết xuất tinh dầu thiên nhiên nguyên chất từ thủ phủ Grasse',
      'Chai thủy tinh thủ công vòi xịt phun sương mịn'
    ],
    reviews: [
      {
        id: 'rev-401',
        userName: 'Đặng Minh Quân',
        rating: 5,
        date: '2026-07-29',
        comment: 'Mùi hương vô cùng thanh lịch và sang trọng, không hề nồng gắt. Rất đáng giá tiền.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-005',
    title: 'Túi Xách Da Bò Thật Khóa Mạ Vàng Marseille Classic',
    titleEn: 'Marseille Leather Crossbody Bag',
    subtitle: 'Genuine Calfskin Leather',
    category: 'accessories',
    categoryLabel: 'Phụ kiện tinh tế',
    priceVND: 2490000,
    priceUSD: 108,
    originalPriceVND: 3200000,
    originalPriceUSD: 139,
    rating: 4.7,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    badges: ['-22%'],
    isFlashSale: true,
    colors: [
      { name: 'Nâu Caramel', hex: '#a52a2a' },
      { name: 'Đen Matte', hex: '#222222' },
      { name: 'Kem Nude', hex: '#f0e68c' }
    ],
    sizes: ['Size M (22cm)', 'Size L (26cm)'],
    inStock: true,
    stockCount: 15,
    description: 'Túi xách da bò nguyên tấm cao cấp chống xước, đường may tỉ mỉ kết hợp khóa quay mạ vàng 18K sang trọng.',
    descriptionEn: 'Full-grain calfskin leather crossbody bag with 18K gold-plated hardware and multi-compartment interior.',
    specifications: {
      'Chất liệu': 'Da Bò Thật 100% Full Grain',
      'Kích thước': '22cm x 15cm x 8cm',
      'Phụ kiện': 'Khóa hợp kim mạ vàng 18k'
    },
    features: [
      'Ngăn chứa thông minh vừa điện thoại, ví tiền và mỹ phẩm',
      'Dây đeo tùy chỉnh độ dài linh hoạt'
    ],
    reviews: []
  },
  {
    id: 'prod-006',
    title: 'Đèn Sàn Chân Đồng Vintage Riviera',
    titleEn: 'Riviera Brass Floor Lamp',
    subtitle: 'Mid-Century Modern Lighting',
    category: 'decor',
    categoryLabel: 'Trang trí & Décor',
    priceVND: 1950000,
    priceUSD: 85,
    originalPriceVND: 2400000,
    originalPriceUSD: 104,
    rating: 4.9,
    reviewCount: 16,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80'
    ],
    badges: ['NEW'],
    isFlashSale: false,
    colors: [
      { name: 'Đồng Cổ', hex: '#b8860b' }
    ],
    sizes: ['155cm'],
    inStock: true,
    stockCount: 9,
    description: 'Đèn cây chiếu sáng điểm nhấn góc phòng với ánh sáng vàng ấm cúng dịu mắt. Khung đồng vàng chống gỉ sét bọc chao đèn vải lanh tự nhiên.',
    descriptionEn: 'Mid-century brass floor lamp with warm diffused light shade, creating ambient warmth for living spaces.',
    specifications: {
      'Chất liệu': 'Đồng thau xước + Chao vải Lanh',
      'Bóng đèn': 'LED E27 3 màu ánh sáng',
      'Chiều cao': '155 cm'
    },
    features: [
      'Công tắc chân bấm tiện lợi',
      'Bóng LED tiết kiệm điện năng tới 85%'
    ],
    reviews: []
  },
  {
    id: 'prod-007',
    title: 'Áo Sơ Mi Lanh Marseille Linen Summer',
    titleEn: 'Marseille Linen Summer Shirt',
    subtitle: '100% Pure French Linen',
    category: 'fashion',
    categoryLabel: 'Thời trang & May mặc',
    priceVND: 1150000,
    priceUSD: 50,
    originalPriceVND: 1450000,
    originalPriceUSD: 63,
    rating: 4.8,
    reviewCount: 41,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80'
    ],
    badges: ['BESTSELLER'],
    isFlashSale: true,
    colors: [
      { name: 'Trắng Tinh Khôi', hex: '#ffffff' },
      { name: 'Xanh Biển Địa Trung Hải', hex: '#4682b4' },
      { name: 'Vàng Cát', hex: '#f4a460' }
    ],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    stockCount: 25,
    description: 'Áo sơ mi vải lanh tự nhiên thoáng khí vượt trội, phong cách phóng khoáng cho những chuyến du lịch hay dạo phố mùa hè.',
    descriptionEn: 'Breathable 100% organic French linen shirt tailored with relaxed elegance for summer getaways.',
    specifications: {
      'Chất liệu': '100% Linen Pháp',
      'Form dáng': 'Relaxed Fit phóng khoáng'
    },
    features: [
      'Chất vải càng giặt càng mềm mại',
      'Chống tia UV tự nhiên'
    ],
    reviews: []
  },
  {
    id: 'prod-008',
    title: 'Bàn Trà Gỗ Sồi Tự Nhiên Scandinavia',
    titleEn: 'Scandinavia Solid Oak Coffee Table',
    subtitle: 'Organic Wood Design',
    category: 'furniture',
    categoryLabel: 'Nội thất cao cấp',
    priceVND: 3600000,
    priceUSD: 156,
    originalPriceVND: 4200000,
    originalPriceUSD: 182,
    rating: 4.9,
    reviewCount: 27,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80'
    ],
    badges: ['HOT'],
    isFlashSale: false,
    colors: [
      { name: 'Gỗ Sồi Tự Nhiên', hex: '#d2b48c' },
      { name: 'Gỗ Óc Chó sẫm', hex: '#5c4033' }
    ],
    sizes: ['110cm x 60cm'],
    inStock: true,
    stockCount: 10,
    description: 'Bàn sofa mặt gỗ sồi sơn phủ bóng mờ chống nước, bo tròn các góc an toàn tuyệt đối cho gia đình có trẻ nhỏ.',
    descriptionEn: 'Minimalist solid oak coffee table with water-resistant matte finish and rounded child-safe edges.',
    specifications: {
      'Chất liệu': 'Gỗ Sồi Bắc Mỹ tự nhiên 100%',
      'Sơn phủ': 'Sơn lau lau dầu thực vật lau nước an toàn'
    },
    features: [
      'Chịu lực cao, mặt gỗ dày 3cm',
      'Lắp ráp đơn giản chỉ trong 5 phút'
    ],
    reviews: []
  }
];

export const AVAILABLE_COUPONS = [
  {
    code: 'XSTORE10',
    discountType: 'percentage',
    discountValue: 10,
    minSpendVND: 1000000,
    minSpendUSD: 45,
    description: 'Giảm 10% cho đơn hàng từ 1.000.000₫ ($45)'
  },
  {
    code: 'WELCOME50',
    discountType: 'fixed',
    discountValue: 50000,
    minSpendVND: 500000,
    minSpendUSD: 20,
    description: 'Giảm ngay 50.000₫ cho khách hàng mới'
  },
  {
    code: 'MARSEILLE2026',
    discountType: 'percentage',
    discountValue: 15,
    minSpendVND: 3000000,
    minSpendUSD: 130,
    description: 'Ưu đãi Đặc biệt VIP 15% cho đơn từ 3.000.000₫'
  }
];
