import React from 'react';
import '../styles/sections.css';

export default function Testimonial() {
  return (
    <section className="section-testimonial" aria-label="Customer testimonial">
      <blockquote className="testimonial-quote">
        <p>"Being able to bring everyone together to plan ultimately means that the most impactful initiatives happen at the right time — and customers get the features they actually need."</p>
        <footer className="testimonial-author">
          <div className="author-avatar">LS</div>
          <div>
            <cite className="author-name">Lucy Starling</cite>
            <span className="author-role">Product Operations Lead at ASOS</span>
          </div>
        </footer>
      </blockquote>
    </section>
  );
}
