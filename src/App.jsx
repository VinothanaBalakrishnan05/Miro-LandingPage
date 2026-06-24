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
import UseCases from './components/UseCases';
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

  /* ═══════════════════════════════════════════════════
     LENIS — desktop only
     
     Mobile browsers already have excellent momentum
     scrolling. Lenis fights the native touch engine
     and causes stutter on phones/tablets. Skip it
     entirely on narrow viewports and let the browser
     handle touch scroll natively.
     ═══════════════════════════════════════════════════ */
  useEffect(() => {
    // Check width directly — avoids the state‐timing race
    // where isMobile hasn't settled yet on first render
    if (window.innerWidth < 768) return;

    const el = scrollRef.current;
    if (!el) return;

    const lenis = new Lenis({
      wrapper: el,
      content: el.firstElementChild,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
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
        case 'ArrowUp':   case 'k': delta = -STEP; break;
        case ' ': delta = e.shiftKey ? -PAGE : PAGE; break;
        case 'PageDown': delta = PAGE; break;
        case 'PageUp':   delta = -PAGE; break;
        case 'Home': el.scrollTo({ top: 0, behavior: 'smooth' }); e.preventDefault(); return;
        case 'End':  el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }); e.preventDefault(); return;
        case 'Tab':
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

  /* ═══════════════════════════════════════════════════
     WORKSPACE CAMERA — scroll-driven transform

     NEW TIMELINE (old → new):
     ─────────────────────────────────────────────────
     Phase 1  0.00–0.20  Hero (static camera)
     Phase 2  0.20–0.84  Gentle drift while notes,
                          connections, features build
     Phase 3  0.84–0.97  Zoom out AFTER features done
                          (was 0.55 — way too early)
     ═══════════════════════════════════════════════════ */
  useEffect(() => {
    let raf;
    const update = () => {
      if (!workspaceRef.current) { raf = requestAnimationFrame(update); return; }
      const p = progress.current;
      const mobile = isMobile;
      let tx = 0, ty = 0, scale = 1, rotate = 0;

      // Phase 2: workspace drift
      if (p >= 0.20 && p < 0.84) {
        const phase = mapClamped(p, 0.20, 0.84, 0, 1);
        tx     = Math.sin(phase * Math.PI) * (mobile ? -5 : -15);
        ty     = phase * (mobile ? -10 : -25);
        rotate = Math.sin(phase * Math.PI * 2) * 0.25;
      }

      // Phase 3: zoom out — begins AFTER last feature (0.78 + 0.06 = 0.84)
      if (p >= 0.84) {
        const phase = mapClamped(p, 0.84, 0.97, 0, 1);
        const eased = easeInOut(Math.min(phase, 1));
        scale  = 1 - eased * 0.22;
        ty     = (mobile ? -10 : -25) + eased * (mobile ? 10 : 25);
        rotate = eased * -0.4;
        tx     = eased * 4;
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
      <div ref={scrollRef} className="scroll-container" onMouseOver={handleMouseOver} tabIndex={0}>
        <div style={{ position: 'relative' }}>
          <div className="scroll-spacer" />
          <div className="static-sections">
            <LogoBar />
            <StatsBar />
            <ProductShowcase />
            <UseCases />
            <Testimonial />
            <Footer />
          </div>
        </div>

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
