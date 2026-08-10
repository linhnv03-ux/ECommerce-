import React from 'react';
import MyHeader from './MyHeader/MyHeader';
import Banner from './Banner/Banner';
import Info from './Info/Info';
import AdvanceHeading from './AdvanceHeading/AdvanceHeading';
import HeadingListProducts from './HeadingListProducts/HeadingListProducts';
import PopularProduct from './PopularProduct/PopularProduct';
import SaleHomepage from './SaleHomepage/SaleHomepage';
import MyFooter from './MyFooter/MyFooter';
import { useStore } from '@context/StoreContext';

function HomePage() {
  const { products } = useStore();
  const listProducts = products || [];

  return (
    <>
      <MyHeader />
      <Banner />
      <Info />
      <AdvanceHeading />
      <HeadingListProducts data={listProducts.slice(0, 2)} />
      <PopularProduct data={listProducts.slice(2, listProducts.length)} />
      <SaleHomepage />
      <MyFooter />
      <div
        style={{
          height: '200px'
        }}
      ></div>
    </>
  );
}

export default HomePage;
