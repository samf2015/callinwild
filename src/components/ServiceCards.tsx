import { useEffect, useRef, useState } from 'react';

export type ServiceCard = { title: string; summary?: string | null; link?: string | null };
type Props = { heading?: string | null; services: ServiceCard[]; headingField?: string };

// "Our Services" section, shared by the homepage and the Services page (styles: public/css/service-cards.css).
// Cards come from the Services collection; the heading comes from the Homepage document.
export default function ServiceCards({ heading, services, headingField }: Props) {
  // Cards fade + slide in as the section scrolls into view (same behaviour as the proof)
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<Set<number>>(new Set());
  useEffect(() => {
    const cards = Array.from(gridRef.current?.querySelectorAll<HTMLElement>('.cw-service-card') ?? []);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setVisible(new Set(cards.map((_, i) => i)));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = cards.indexOf(entry.target as HTMLElement);
            setVisible((v) => new Set(v).add(i));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [services.length]);

  if (services.length === 0) return null;

  return (
    <section className="cw-services">
      <div className="cw-container">
        <div className="cw-services-heading">
          <span className="cw-services-heading-mark"></span>
          <h2 data-tina-field={headingField}>{heading || 'Our Services'}</h2>
          <span className="cw-services-heading-rule"></span>
        </div>
        <div className="cw-services-grid" ref={gridRef}>
          {services.map((service, i) => (
            <a key={i} className={`cw-service-card${visible.has(i) ? ' is-visible' : ''}`} href={service.link ?? '#'}>
              <span className="cw-service-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
              <h3>{service.title}</h3>
              {service.summary && <p>{service.summary}</p>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
