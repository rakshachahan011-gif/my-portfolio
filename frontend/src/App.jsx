import { useEffect, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    gsap.to(hero, {
      scale: 0.92,
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<section className="section" aria-hidden="true" style={{ minHeight: '50vh' }} />}>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
