import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import AboutUs from './AboutUs';

function AboutPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;
