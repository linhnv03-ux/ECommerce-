import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@context/StoreContext';
import { Menu, X, ChevronDown } from 'lucide-react';
import styles from './styles.module.scss';

function NavMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    t,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setActiveCategory
  } = useStore();

  const handleCategoryNav = (catKey) => {
    setActiveCategory(catKey);
    navigate('/shop');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.leftSection}>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={styles.mobileToggle}
      >
        {isMobileMenuOpen ? <X style={{ width: 24, height: 24 }} /> : <Menu style={{ width: 24, height: 24 }} />}
      </button>

      <nav className={styles.navMenu}>
        <button
          onClick={() => handleNav('/')}
          className={location.pathname === '/' ? styles.active : ''}
        >
          {t.navHome}
        </button>

        <button
          onClick={() => {
            setActiveCategory('all');
            handleNav('/shop');
          }}
          className={location.pathname === '/shop' ? styles.active : ''}
        >
          {t.navShop}
        </button>

        <div className={styles.dropdownGroup}>
          <button className={styles.dropdownTrigger}>
            {t.navElements}
            <ChevronDown className={styles.chevron} />
          </button>

          <div className={styles.dropdownMenu}>
            <button onClick={() => handleCategoryNav('furniture')} className={styles.dropdownItem}>
              {t.furniture}
            </button>
            <button onClick={() => handleCategoryNav('fashion')} className={styles.dropdownItem}>
              {t.fashion}
            </button>
            <button onClick={() => handleCategoryNav('decor')} className={styles.dropdownItem}>
              {t.decor}
            </button>
            <button onClick={() => handleCategoryNav('beauty')} className={styles.dropdownItem}>
              {t.beauty}
            </button>
          </div>
        </div>

        <button
          onClick={() => handleNav('/blog')}
          className={location.pathname === '/blog' ? styles.active : ''}
        >
          Blog
        </button>

        <button
          onClick={() => handleNav('/about-us')}
          className={location.pathname === '/about-us' ? styles.active : ''}
        >
          {t.navAbout}
        </button>

        <button
          onClick={() => handleNav('/contact-us')}
          className={location.pathname === '/contact-us' ? styles.active : ''}
        >
          {t.navContact}
        </button>
      </nav>
    </div>
  );
}

export default NavMenu;
