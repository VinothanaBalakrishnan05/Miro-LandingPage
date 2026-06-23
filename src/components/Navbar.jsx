import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const el = document.querySelector('.scroll-container');
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main">
      <div className="nav-inner">
        <a href="#" className="nav-logo" aria-label="Home">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="var(--blue)"/>
            <path d="M8 20V10l4 6 4-6v10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="nav-brand">Canvas</span>
        </a>
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <a href="#" className="nav-link">Product</a>
          <a href="#" className="nav-link">Solutions</a>
          <a href="#" className="nav-link">Resources</a>
          <a href="#" className="nav-link">Pricing</a>
        </div>
        <div className="nav-actions">
          <a href="#" className="nav-link nav-login">Log in</a>
          <a href="#" className="nav-cta-btn">Get started free</a>
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  );
}
