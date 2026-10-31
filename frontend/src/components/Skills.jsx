import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { label: 'Python / Data Science', width: 90 },
  { label: 'Machine Learning', width: 88 },
  { label: 'JavaScript / Java / SQL', width: 78 },
  { label: 'Power BI / Tableau / Excel', width: 82 },
  { label: 'MySQL / MongoDB', width: 75 },
  { label: 'Spring Boot / REST API', width: 72 },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

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
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const fill = el.querySelector('.skill-fill');
        const width = el.dataset.width || 0;
        if (fill) {
          gsap.to(fill, {
            width: `${width}%`,
            scrollTrigger: { trigger: el, start: 'top 90%' },
            duration: 1.2,
            delay: i * 0.08,
            ease: 'power2.out',
          });
        }
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 92%' },
          opacity: 0,
          x: -30,
          duration: 0.6,
          delay: i * 0.06,
          ease: 'power2.out',
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section skills-section" ref={sectionRef}>
      <h2 ref={titleRef} className="section-title">Technical Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, i) => (
          <div
            key={skill.label}
            className="skill-orb"
            ref={(r) => (itemsRef.current[i] = r)}
            data-width={skill.width}
          >
            <div className="skill-orb-track">
              <div className="skill-fill" />
              <div className="skill-orb-glow" style={{ width: `${skill.width}%` }} />
            </div>
            <span className="skill-label">{skill.label}</span>
            <span className="skill-pct">{skill.width}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}
