import React, { useEffect, useRef } from 'react';
import './Stats.css';

const StatsComponent = () => {
  const statsRef = useRef(null);
  const counterRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.stat-item-stat').forEach((item, index) => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
            item.style.transitionDelay = `${index * 0.1}s`;
          });

          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  const animateCounters = () => {
    const counters = counterRefs.current;
    const speed = 200;

    const startCounts = [
      224534,  // Resumes
      192643,  // Applications
      82886,   // LinkedIn
      4632     // Interviews
    ];

    counters.forEach((counter, index) => {
      if (!counter) return;

      let current = startCounts[index];
      const dec = Math.ceil(current / speed);

      const updateCount = () => {
        if (current > 0) {
          current -= dec;
          counter.innerText = formatNumber(Math.max(current, 0));
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = "0";
        }
      };

      updateCount();
    });
  };

  const formatNumber = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="stats-container-stat" ref={statsRef}>
      <div className="stats-header-stat">
        <h2 className="animate-title">Empowering Professionals<br /><span>to Achieve Career Excellence</span></h2><br />
        <p className="animate-description">
          Our comprehensive suite of tools has helped thousands of candidates transform their career prospects and secure ideal positions.
        </p>
      </div>
      <div className="stats-grid-stat">
        <div className="stat-item-stat">
          <svg viewBox="0 0 24 24" className="icon-stat">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4S8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <h3 ref={el => counterRefs.current[0] = el}>0</h3>
          <p>Resumes Generated</p>
        </div>
        <div className="stat-item-stat">
          <svg viewBox="0 0 24 24" className="icon-stat">
            <path d="M6 2h12a2 2 0 012 2v16l-6-3-6 3V4a2 2 0 012-2z" />
          </svg>
          <h3 ref={el => counterRefs.current[1] = el}>0</h3>
          <p>Job Applications</p>
        </div>
        <div className="stat-item-stat">
          <svg viewBox="0 0 24 24" className="icon-stat">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <h3 ref={el => counterRefs.current[2] = el}>0</h3>
          <p>LinkedIn Optimizations</p>
        </div>
        <div className="stat-item-stat">
          <svg viewBox="0 0 24 24" className="icon-stat">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
          </svg>
          <h3 ref={el => counterRefs.current[3] = el}>0</h3>
          <p>Mock Interviews</p>
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
