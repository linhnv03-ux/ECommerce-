# PROJECT ARCHITECTURE & CODING STANDARDS (PROMPT SPECIFICATION)

Dưới đây là bộ quy chuẩn kiến trúc và format code chuẩn Senior React/Vite được đóng gói thành 1 tài liệu Prompt Specification duy nhất. Bạn có thể sử dụng toàn bộ nội dung file này để prompt cho bất kỳ AI nào (hoặc làm guideline dự án mới) để tạo ra codebase đồng bộ và chuẩn mực.

---

## 1. Cấu Trúc Thư Mục & Path Aliases (Vite Config)

### Alias Mapping trong `vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@routers': path.resolve(__dirname, './src/routers'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@context': path.resolve(__dirname, './src/context'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  }
});
```

### Cấu trúc thư mục chuẩn (Senior Modular Structure):
```text
/src
  ├── assets/                # Hình ảnh, font, icon tĩnh
  ├── context/               # React Context (StoreContext, AuthContext,...)
  │   └── StoreContext.jsx
  ├── routers/               # Khai báo danh sách Router tập trung
  │   └── routers.js
  ├── styles/                # Global styles, variables SCSS/CSS
  │   └── global.scss
  └── components/            # Các module giao diện chia nhỏ
      ├── Header/
      │   ├── Header.jsx          # Component tổng hợp
      │   ├── TopBar.jsx          # Component con
      │   ├── NavMenu.jsx         # Component con
      │   ├── HeaderLogo.jsx      # Component con
      │   ├── HeaderActions.jsx   # Component con
      │   └── styles.module.scss
      ├── Footer/
      │   ├── Footer.jsx
      │   ├── NewsletterSection.jsx
      │   ├── FooterLinksGroup.jsx
      │   ├── FooterBottom.jsx
      │   └── styles.module.scss
      ├── Shop/
      │   ├── ProductGrid.jsx
      │   ├── ProductCard.jsx
      │   ├── ShopToolbar.jsx
      │   ├── FilterSidebar.jsx
      │   ├── CategoryTabs.jsx
      │   ├── NoProductsFound.jsx
      │   └── styles.module.scss
      └── Pages/
          ├── ShopPage.jsx
          ├── AboutPage.jsx
          ├── ContactPage.jsx
          ├── ProductDetailPage.jsx
          ├── ProductGallery.jsx
          ├── ProductInfo.jsx
          ├── ProductTabs.jsx
          └── styles.module.scss
```

---

## 2. Quy Chuẩn Routing (Router Array + Dynamic Lazy Loading)

Tất cả đường dẫn ứng dụng được định nghĩa theo dạng Array trong `/src/routers/routers.js` kết hợp với `React.lazy()` để tối ưu hóa performance và code splitting.

### File `/src/routers/routers.js`:
```js
import { lazy } from 'react';

const routers = [
  {
    path: '/',
    component: lazy(() => import('@components/HomePage/HomePage'))
  },
  {
    path: '/blog',
    component: lazy(() => import('@components/Blog/Blog'))
  },
  {
    path: '/shop',
    component: lazy(() => import('@components/Pages/ShopPage'))
  },
  {
    path: '/product/:id',
    component: lazy(() => import('@components/Pages/ProductDetailPageWrapper'))
  },
  {
    path: '/about-us',
    component: lazy(() => import('@components/Pages/AboutPage'))
  },
  {
    path: '/contact-us',
    component: lazy(() => import('@components/Pages/ContactPage'))
  },
  {
    path: '/account',
    component: lazy(() => import('@components/Pages/AccountPageWrapper'))
  }
];

export default routers;
```

---

## 3. Khởi Tạo App Routes trong `/src/App.jsx`

`App.jsx` đóng vai trò Wrapper chính tích hợp `BrowserRouter`, `Suspense`, map danh sách `routers`, và mount các Modal/Drawer dùng chung ở cấp toàn cục.

### File `/src/App.jsx`:
```jsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routers from '@routers/routers';
import { StoreProvider } from '@context/StoreContext';

// Global Drawers & Modals
import CartDrawer from '@components/Cart/CartDrawer';
import WishlistDrawer from '@components/Wishlist/WishlistDrawer';
import CompareModal from '@components/Compare/CompareModal';
import QuickViewModal from '@components/Shop/QuickViewModal';
import SearchModal from '@components/Search/SearchModal';
import CheckoutModal from '@components/Checkout/CheckoutModal';
import ToastContainer from '@components/Toast/ToastContainer';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Routes>
          {routers.map((item, index) => {
            const Component = item.component;
            return (
              <Route
                path={item.path}
                element={<Component />}
                key={index}
              />
            );
          })}
        </Routes>
      </Suspense>

      {/* Mounting Global Overlay Components */}
      <CartDrawer />
      <WishlistDrawer />
      <CompareModal />
      <QuickViewModal />
      <SearchModal />
      <CheckoutModal />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  );
}
```

---

## 4. Nguyên Tắc Chia Nhỏ Component (Component Decomposition Principles)

1. **Single Responsibility Principle (SRP):**
   - Mỗi file component chỉ thực hiện 1 nhiệm vụ duy nhất (ví dụ: `ProductGallery` xử lý xem ảnh, `ProductInfo` xử lý nút bấm mua/chọn size, `ProductTabs` xử lý đánh giá & mô tả).
   - Tuyệt đối không viết file monolith vượt quá 200-250 dòng code.

2. **Container - Presentational Pattern:**
   - Component cha (`Header.jsx`, `Footer.jsx`, `ProductDetailPage.jsx`) chịu trách nhiệm gom nhóm và truyền props/layout.
   - Component con chịu trách nhiệm renderUI chi tiết.

3. **Điều Hướng Trang (Navigation):**
   - Sử dụng `useNavigate()` và `useLocation()` từ `react-router-dom` để chuyển trang thay vì thay đổi state view thủ công.

4. **Style Encapsulation:**
   - Ưu tiên dùng SCSS Modules (`styles.module.scss`) hoặc Tailwind CSS để tránh đụng độ classname.
   - Nhập style qua `import styles from './styles.module.scss'`.

---

## 5. Mẫu Prompt Dùng Để Yêu Cầu AI Khởi Tạo Dự Án Mới Theo Format Này

> **PROMPT MẪU CHO DỰ ÁN KHÁC:**
> "Hãy khởi tạo/refactor ứng dụng React + Vite của tôi theo chuẩn Senior Architecture sau đây:
> 1. Thiết lập alias path trong `vite.config.ts`: `@` cho `src`, `@routers` cho `src/routers`, `@components` cho `src/components`, `@context` cho `src/context`.
> 2. Chia nhỏ toàn bộ giao diện thành các sub-components độc lập theo thư mục (ví dụ: `Header/TopBar.jsx`, `Header/NavMenu.jsx`, `Footer/NewsletterSection.jsx`, `Shop/ProductGrid.jsx`, `Shop/FilterSidebar.jsx`). Không gộp chung vào 1 file lớn.
> 3. Cấu hình Router bằng mảng `/src/routers/routers.js` sử dụng `React.lazy()` import từng Page component.
> 4. Trong `App.jsx`, bọc `<StoreProvider>`, `<BrowserRouter>`, `<Suspense>` và map mảng `routers` ra thẻ `<Route path={item.path} element={<item.component />} key={index} />`.
> 5. Sử dụng `useNavigate()` cho tất cả các nút chuyển trang."
