import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import gsap from 'gsap';
import heroPhoto from '../assets/WhatsApp Image 2026-03-10 at 12.29.36 AM.jpeg';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

function MagneticLink({ children, href, className }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPos({ x, y });
  };
  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      {children}
    </a>
  );
}

function ScrollIndicator() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });
  }, []);
  return (
    <div className="scroll-indicator" ref={ref} aria-hidden="true">
      <span className="scroll-mouse">
        <span className="scroll-wheel" />
      </span>
    </div>
  );
}

export default function Hero() {
  const titleRef = useRef(null);
  const labelRef = useRef(null);
  const lineRef = useRef(null);
  const taglineRef = useRef(null);
  const socialRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const chars = titleRef.current?.querySelectorAll('.char');
    if (!chars?.length) return;
    gsap.set(chars, { opacity: 0, y: 72 });
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.72,
      stagger: 0.035,
      ease: 'power3.out',
      delay: 0.2,
    });
    if (labelRef.current) {
      gsap.fromTo(labelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: 'power2.out' });
    }
    if (lineRef.current) {
      gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.9, delay: 0.5, ease: 'power2.inOut' });
    }
    if (taglineRef.current) {
      gsap.fromTo(taglineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.9, ease: 'power2.out' });
    }
    const socialItems = socialRef.current?.children;
    if (socialItems?.length) {
      gsap.fromTo(socialItems, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, delay: 1.2, ease: 'power2.out' });
    }
    if (photoRef.current) {
      gsap.fromTo(photoRef.current, { opacity: 0, x: 80, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 1.1, delay: 0.35, ease: 'power3.out' });
    }
  }, []);

  const name = 'RAKSHITHA AJ';
  const letters = name.split('').map((char, i) => (
    <span key={i} className="char" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section id="home" className="hero">
      <div className="hero-canvas-wrap" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-overlay" />
        <div className="hero-bg-gradient" />
        <div className="hero-bg-noise" />
      </div>
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-text">
            <p ref={labelRef} className="hero-label" aria-hidden="true">
              Data Science · Machine Learning
            </p>
            <h1 ref={titleRef} className="hero-title">
              {letters}
            </h1>
            <div ref={lineRef} className="hero-title-line" aria-hidden="true" />
            <p ref={taglineRef} className="hero-tagline">
              Building intelligence from data. Exploring the edge of what’s possible.
            </p>
            <ul ref={socialRef} className="hero-social" aria-label="Social and contact links">
              <li><MagneticLink href="https://linkedin.com/in/rakshitha-aj" className="hero-social-link">LinkedIn</MagneticLink></li>
              <li><MagneticLink href="https://github.com/rakshitha-aj" className="hero-social-link">GitHub</MagneticLink></li>
              <li><MagneticLink href="mailto:rakshachahan011@gmail.com" className="hero-social-link">Email</MagneticLink></li>
              <li><MagneticLink href="tel:+919901242862" className="hero-social-link">Phone</MagneticLink></li>
            </ul>
          </div>
          <div className="hero-photo-wrap" ref={photoRef}>
            <div className="hero-photo-inner">
              <img src={heroPhoto} alt="Rakshitha A J" className="hero-photo" fetchPriority="high" />
              <div className="hero-photo-shine" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
