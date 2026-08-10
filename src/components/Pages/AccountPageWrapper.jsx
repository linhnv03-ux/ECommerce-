import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import AccountPage from './AccountPage';

function AccountPageWrapper() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <AccountPage />
      </main>
      <Footer />
    </>
  );
}

export default AccountPageWrapper;
