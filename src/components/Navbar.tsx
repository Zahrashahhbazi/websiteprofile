import { useState, useEffect } from 'react';
import AuthDialog from './AuthDialog';

const navItems = [
  { label: 'خانه', href: '#home' },
  { label: 'درباره', href: '#about' },
  { label: 'مهارت‌ها', href: '#skills' },
  { label: 'پروژه‌ها', href: '#portfolio' },
  { label: 'تماس', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          return { href: item.href, top: rect.top, id: item.href.slice(1) };
        }
        return null;
      }).filter(Boolean);

      const current = sections.find(s => s && s.top <= 100);
      if (current) setActive(current.href);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <nav className="glass-nav">
      <img className="nav-bg-media" src="/videos/img1.jpg" alt="" aria-hidden="true" />
      <div className="nav-bg-overlay" />
      <ul id="primary-navigation" className={`glass-nav-links${menuOpen ? ' open' : ''}`}>
        {navItems.map(item => (
          <li key={item.href}>
            <a
              href={item.href}
              className={active === item.href ? 'active' : ''}
              onClick={() => {
                setActive(item.href);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            className="auth-trigger"
            onClick={() => {
              setMenuOpen(false);
              setAuthOpen(true);
            }}
          >
            ورود / ثبت‌نام
          </button>
        </li>
      </ul>
      <button
        type="button"
        className="nav-toggle"
        aria-label={menuOpen ? 'بستن فهرست' : 'باز کردن فهرست'}
        aria-controls="primary-navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(open => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <a href="#home" className="glass-nav-logo" dir="ltr">
        <img src="/videos/logo.jpg" alt="لوگوی زهرا شهبازی" className="logo-img" />
        <span className="logo-text">
          <span className="logo-name">ZAHRA</span>
          <span className="logo-tag">SHAHHBAZI</span>
        </span>
      </a>
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </nav>
  );
}