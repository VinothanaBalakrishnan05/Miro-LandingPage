import React from 'react';
import '../styles/sections.css';

const LOGOS = ['SONY', 'PayPal', 'Cisco', 'Deloitte', 'Okta', 'Shopify', 'NEC', 'Servicenow'];

export default function LogoBar() {
  return (
    <section className="section-logobar" aria-label="Trusted by leading companies">
      <p className="logobar-label">Trusted by teams at 250,000+ organizations</p>
      <div className="logobar-track">
        {LOGOS.map((name, i) => (
          <span key={i} className="logo-item">{name}</span>
        ))}
      </div>
    </section>
  );
}
