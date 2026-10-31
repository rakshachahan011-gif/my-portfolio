import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: { trigger: section, start: 'top 82%' },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          scrollTrigger: { trigger: cardRef.current, start: 'top 88%' },
          y: 60,
          opacity: 0,
          rotateX: 12,
          duration: 1,
          ease: 'power3.out',
        });
      }
      if (textRef.current) {
        gsap.from(textRef.current, {
          scrollTrigger: { trigger: textRef.current, start: 'top 92%' },
          opacity: 0,
          y: 20,
          duration: 0.7,
          delay: 0.2,
          ease: 'power2.out',
        });
      }
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about" ref={sectionRef}>
      <h2 ref={titleRef} className="section-title about-title">About Me</h2>
      <div className="about-card-wrap" ref={cardRef}>
        <div className="about-card">
          <div className="about-card-glow gradient-border-mask" />
          <p ref={textRef} className="about-text">
            I am a <strong>Computer Science (Data Science)</strong> undergraduate passionate about
            Machine Learning, AI applications and data-driven solutions. I have experience building
            real-world projects in computer vision, speech processing and data analytics. Currently
            working as a <strong>Data Science Intern</strong> where I build Python-based pipelines,
            automate reporting systems and work with real datasets.
          </p>
        </div>
      </div>
    </section>
  );
}
