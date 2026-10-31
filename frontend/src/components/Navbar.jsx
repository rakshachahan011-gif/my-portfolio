import { useState, useEffect } from 'react';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#works', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`nav ${scrolled ? 'nav-scrolled' : ''} ${menuOpen ? 'nav-menu-open' : ''}`}
      role="navigation"
      aria-label="Main"
    >
      <a href="#home" className="logo" aria-label="Rakshitha A J" onClick={closeMenu}>
        <span className="logo-ra">RA</span>
      </a>
      <button
        type="button"
        className="nav-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>
      <ul className="nav-links">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a href={href} className="nav-link" onClick={closeMenu}>
              <span className="nav-link-text">{label}</span>
              <span className="nav-link-line" />
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-backdrop" aria-hidden="true" onClick={closeMenu} />
      <div className="nav-glow" aria-hidden="true" />
    </nav>
  );
}
