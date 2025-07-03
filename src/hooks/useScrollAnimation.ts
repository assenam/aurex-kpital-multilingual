import { useEffect, useState } from 'react';

export const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.getAttribute('data-scroll-id');
          if (elementId) {
            if (entry.isIntersecting) {
              setVisibleElements(prev => new Set([...prev, elementId]));
              entry.target.classList.add('visible');
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('[data-scroll-id]');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return { visibleElements };
};

export const useParallax = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return offsetY;
};