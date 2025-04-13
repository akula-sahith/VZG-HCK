import React, { useState, useEffect, useRef } from "react";
import "./LandingPage.css";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import l1image from "../assets/l1image.jpg";
import l2image from "../assets/l2image.png";
import l3image from "../assets/l3image.png";
import logo from "../assets/icon.jpg";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const slides = [
  {
    title: "Your Smartest",
    highlight: "Employee Assistant",
    description: "Meet your AI-powered tool – helping you complete tasks efficiently and saving you valuable time.",
    image: l1image,
  },
  {
    title: "Complete your tasks",
    highlight: "faster",
    description: "Leverage AI-driven tools to streamline your workflow and improve productivity.",
    image: l2image,
  },
  {
    title: "Enhance Efficiency",
    highlight: "Save Valuable Time",
    description: "Reduce manual effort and let AI assist you in achieving your goals faster.",
    image: l3image,
  },
];

const extendedSlides = [
  slides[slides.length - 1],
  ...slides,
  slides[0]
];

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // start from actual first slide (index 1)
  const [isAnimating, setIsAnimating] = useState(true);
  const [statsKey, setStatsKey] = useState(0); // Add a key for the Stats component
  const slideRef = useRef(null);
  const navigate = useNavigate();
  // Create refs for each section
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll to section function with additional logic for Stats
  const scrollToSection = (elementRef, isStats = false) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    });
    
    // If navigating to Stats section, increment the key to force a reload
    if (isStats) {
      setStatsKey(prevKey => prevKey + 1);
    }
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Slide transition logic
  const handleNext = () => {
    if (currentSlide >= slides.length + 1) return;
    setCurrentSlide((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentSlide <= 0) return;
    setCurrentSlide((prev) => prev - 1);
  };

  // Snap to real slide after transition ends (circular illusion)
  useEffect(() => {
    if (currentSlide === slides.length + 1) {
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentSlide(1);
      }, 300); // match with transition duration
    }
    if (currentSlide === 0) {
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentSlide(slides.length);
      }, 300);
    } else {
      setIsAnimating(true);
    }
  }, [currentSlide]);

  return (
    <>
    <div className="landing-container-L" ref={homeRef}>
      <nav className="navbar-L">
           <h3>QuickCareer</h3>
        <ul className="nav-links-L">
          <li onClick={() => scrollToSection(homeRef)}>Home</li>
          <li onClick={() => scrollToSection(featuresRef)}>Features</li>
          <li onClick={() => scrollToSection(statsRef, true)}>Stats</li>
          <li onClick={() => scrollToSection(faqRef)}>FAQS</li>
          <li onClick={() => scrollToSection(contactRef)}>Contact</li>
        </ul>
        <button className="register-btn-L" onClick={()=>navigate("/auth")}>
          Register Now <FaArrowRight className="arrow-icon-L" />
        </button>
      </nav>

      <div className="carousel-container-L">
        <button className="carousel-control-L prev-btn-L" onClick={handlePrev}>
          <FaChevronLeft />
        </button>

        <div
          className="carousel-track-L"
          ref={slideRef}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: isAnimating ? "transform 0.3s ease-in-out" : "none"
          }}
        >
          {extendedSlides.map((slide, index) => (
            <section key={index} className="carousel-slide-L">
              <div className="hero-content-L">
                <h1>
                  {slide.title} <br />
                  <span className="highlight-L">{slide.highlight}</span>
                </h1>
                <p>{slide.description}</p>
                <button className="watch-demo-L">Watch Demo</button>
              </div>
              <div className="hero-image-L">
                <img src={slide.image} alt={`Slide ${index}`} />
              </div>
            </section>
          ))}
        </div>

        <button className="carousel-control-L next-btn-L" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>

      <div className="dots-navigation-L">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot-L ${currentSlide === index + 1 ? "active-L" : ""}`}
            onClick={() => setCurrentSlide(index + 1)}
          ></div>
        ))}
      </div>
    </div>
    <div ref={featuresRef}>
      <Features/>
    </div>
    <div ref={statsRef}>
      <Stats key={statsKey} /> {/* Add the key prop here */}
    </div>
    <div ref={faqRef}>
      <FAQ/>
    </div>
    <div ref={contactRef}>
      <Footer/>
    </div>
    </>
  );
};

export default LandingPage;