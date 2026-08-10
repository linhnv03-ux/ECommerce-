import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import ContactUs from './ContactUs';

function ContactPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;
