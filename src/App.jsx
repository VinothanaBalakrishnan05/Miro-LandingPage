import React, { useRef, useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';

import useMousePosition from './hooks/useMousePosition';
import useScrollProgress from './hooks/useScrollProgress';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import BackgroundGrid from './components/BackgroundGrid';
import AmbientGlows from './components/AmbientGlows';
import ParticleField from './components/ParticleField';
import FloatingPapers from './components/FloatingPapers';
import Hero from './components/Hero';
import ScrollHint from './components/ScrollHint';
import BlueprintLabels from './components/BlueprintLabels';
import Connections from './components/Connections';
import StickyNote from './components/StickyNote';
import FeatureCard from './components/FeatureCard';
import LogoBar from './components/LogoBar';
import StatsBar from './components/StatsBar';
import ProductShowcase from './components/ProductShowcase';
import Testimonial from './components/Testimonial';
import RevealLabel from './components/RevealLabel';
import CTASticky from './components/CTASticky';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';

import NOTES from './data/notes';
import FEATURES from './data/features';
import { mapClamped, easeInOut } from './utils/math';

export default function App() {
  const scrollRef = useRef(null);
  const workspaceRef = useRef(null);
  const mouse = useMousePosition();
  const progress = useScrollProgress(scrollRef);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ── Responsive detection ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Lenis smooth scroll ──
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const lenis = new Lenis({
      wrapper: el,
      content: el.firstElementChild,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2.0,
      wheelMultiplier: 1,
      infinite: false,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // ── Keyboard scrolling ──
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const STEP = window.innerHeight * 0.35;
    const PAGE = window.innerHeight * 0.85;

    const handleKey = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      let delta = 0;
      switch (e.key) {
        case 'ArrowDown': case 'j': delta = STEP; break;
        case 'ArrowUp': case 'k': delta = -STEP; break;
        case ' ': delta = e.shiftKey ? -PAGE : PAGE; break;
        case 'PageDown': delta = PAGE; break;
        case 'PageUp': delta = -PAGE; break;
        case 'Home': el.scrollTo({ top: 0, behavior: 'smooth' }); e.preventDefault(); return;
        case 'End': el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }); e.preventDefault(); return;
        case 'Tab':
          // Allow natural tab but nudge scroll to follow focus
          setTimeout(() => {
            const focused = document.activeElement;
            if (focused && focused.getBoundingClientRect) {
              const rect = focused.getBoundingClientRect();
              if (rect.bottom > window.innerHeight || rect.top < 0) {
                el.scrollBy({ top: rect.top - window.innerHeight / 3, behavior: 'smooth' });
              }
            }
          }, 50);
          return;
        default: return;
      }
      e.preventDefault();
      el.scrollBy({ top: delta, behavior: e.repeat ? 'auto' : 'smooth' });
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Workspace camera transform
  useEffect(() => {
    let raf;
    const update = () => {
      if (!workspaceRef.current) { raf = requestAnimationFrame(update); return; }
      const p = progress.current;
      let tx = 0, ty = 0, scale = 1, rotate = 0;

      if (p >= 0.15 && p < 0.55) {
        const phase = mapClamped(p, 0.15, 0.55, 0, 1);
        tx = Math.sin(phase * Math.PI) * (isMobile ? -5 : -15);
        ty = phase * (isMobile ? -15 : -30);
        rotate = Math.sin(phase * Math.PI * 2) * 0.3;
      }
      if (p >= 0.55) {
        const phase = mapClamped(p, 0.55, 0.72, 0, 1);
        const eased = easeInOut(Math.min(phase, 1));
        scale = 1 - eased * 0.2;
        ty = (isMobile ? -15 : -30) + eased * (isMobile ? 15 : 30);
        rotate = eased * -0.5;
        tx = eased * 5;
      }

      workspaceRef.current.style.transform =
        `translate(${tx}px, ${ty}px) scale(${scale}) rotate(${rotate}deg)`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [progress, isMobile]);

  // ── Hover detection ──
  const handleMouseOver = useCallback((e) => {
    const hit = e.target.closest('.sticky-note, .feature-card, .cta-sticky, a, button, .nav-link');
    setIsHovering(!!hit);
  }, []);

  return (
    <>
      <style>{`
        .scroll-container { -webkit-overflow-scrolling: touch; }
        .scroll-container:focus { outline: none; }
      `}</style>

      <div ref={scrollRef} className="scroll-container" onMouseOver={handleMouseOver} tabIndex={0}>
        {/* Tall spacer for scroll — holds the static sections at end */}
        <div style={{ position: 'relative' }}>
          <div className="scroll-spacer" />

          {/* Static sections pinned AFTER the canvas experience */}
          <div className="static-sections">
            <LogoBar />
            <StatsBar />
            <ProductShowcase />
            <Testimonial />
            <Footer />
          </div>
        </div>

        {/* Fixed viewport — all animated canvas layers */}
        <div className="viewport">
          <div className="bg-gradient" />
          <AmbientGlows />
          <BackgroundGrid mouse={mouse} progress={progress} />
          {!isMobile && <ParticleField />}
          <FloatingPapers mouse={mouse} />

          <div ref={workspaceRef} className="workspace">
            <Hero progress={progress} />
            <ScrollHint progress={progress} />
            <BlueprintLabels progress={progress} />
            <Connections progress={progress} />
            {NOTES.map((note) => (
              <StickyNote key={note.id} note={note} progress={progress} mouse={mouse} />
            ))}
            <div className="features-container">
              {FEATURES.map((f, i) => (
                <FeatureCard key={i} feature={f} progress={progress} mouse={mouse} />
              ))}
            </div>
            <RevealLabel progress={progress} />
            <CTASticky progress={progress} />
          </div>
        </div>

        <Navbar />
        <ProgressBar progress={progress} />
      </div>

      {!isMobile && <CustomCursor mouse={mouse} isHovering={isHovering} />}
    </>
  );
}
