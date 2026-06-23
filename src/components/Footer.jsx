import React from 'react';
import '../styles/footer.css';

const COLS = [
  { title: 'Product', links: ['AI Platform', 'Intelligent Canvas', 'Integrations', 'Templates', 'Security', 'Changelog'] },
  { title: 'Solutions', links: ['Product Teams', 'Engineering', 'Design & UX', 'Marketing', 'Enterprise', 'Startups'] },
  { title: 'Resources', links: ['Blog', 'Academy', 'Help Center', 'Community', 'Events', 'Webinars'] },
  { title: 'Company', links: ['About Us', 'Careers', 'Newsroom', 'Contact Sales', 'Privacy', 'Terms'] },
];

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="var(--blue)"/>
            <path d="M8 20V10l4 6 4-6v10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="footer-tagline">Where ideas take shape.<br/>Think together. Build together.</p>
        </div>
        <div className="footer-cols">
          {COLS.map((col, i) => (
            <div key={i} className="footer-col">
              <h4>{col.title}</h4>
              {col.links.map((link, j) => <a key={j} href="#">{link}</a>)}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Canvas Inc. All rights reserved.</span>
        <div className="footer-badges">
          <span className="badge">SOC 2</span>
          <span className="badge">ISO 27001</span>
          <span className="badge">GDPR</span>
        </div>
      </div>
    </footer>
  );
}
