import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Speech Recognition & Translation',
    description: 'Python, Flask, Google Translate API — speech-to-text and translation into multiple languages.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=400&fit=crop',
  },
  {
    title: 'Real-Time Object Detection',
    description: 'YOLOv3, OpenCV — real-time object detection.',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop',
  },
  {
    title: 'Market Basket Analysis',
    description: 'Django, Apriori/FP-Growth — product recommendations from transaction data.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  },
  {
    title: 'Flood & Landslide Prediction',
    description: 'Random Forest, Logistic Regression — disaster risk prediction.',
    image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72',
  },
  {
    title: 'Sales Dashboard',
    description: 'Excel — pivot tables, charts, and formulas for sales analysis.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
  },
];

function TiltCard({ project, index }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -12;
    const tiltY = (x - 0.5) * 12;
    setTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`);
  };
  const handleMouseLeave = () => setTransform('');

  return (
    <article
      ref={cardRef}
      className="work-card"
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="work-card-inner">
        <div className="work-card-image-wrap">
          <img src={project.image} alt={project.title} loading="lazy" />
        </div>
        <div className="work-card-content">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="work-card-border gradient-border-mask" />
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

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
      const grid = gridRef.current;
      const cards = grid?.querySelectorAll('.work-card');
      if (grid && cards?.length) {
        gsap.from(cards, {
          scrollTrigger: { trigger: grid, start: 'top 88%' },
          y: 70,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        });
      }
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="works" className="section projects-section" ref={sectionRef}>
      <h2 ref={titleRef} className="section-title">Projects</h2>
      <div className="work-grid" ref={gridRef}>
        {projects.map((project, index) => (
          <TiltCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
