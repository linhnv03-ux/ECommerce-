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
