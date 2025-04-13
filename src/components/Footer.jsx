import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      access_key: "f274313a-0806-4b10-a5bb-6f316e8df74b", // replace this with your real Web3Forms access key
      name: formData.name,
      email: formData.email,
      message: formData.message
    };
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        console.log("Form submitted successfully");
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
  
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <div className="footer-page-ft">
      {/* Contact Form Section */}
      <section className="hero-section-ft">
        <div className="contact-content-ft">
          <h2 className="contact-title-ft">Get in Touch</h2>
          {submitted ? (
            <div className="form-success-ft">
              <p>Thank you for your message! We'll get back to you soon.</p>
            </div>
          ) : (
            <form className="contact-form-ft" onSubmit={handleSubmit}>
              <div className="form-group-ft">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="form-input-ft"
                  placeholder="Your name"
                />
              </div>
              <div className="form-group-ft">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="form-input-ft"
                  placeholder="Your email address"
                />
              </div>
              <div className="form-group-ft">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  className="form-textarea-ft"
                  placeholder="Your message"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="submit-form-btn-ft">Send Message</button>
            </form>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-ft">
        <div className="footer-container-ft">
          {/* Brand Section */}
          <div className="brand-section-ft">
            <div className="logo-container-ft">
              <svg className="logo-ft" width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.79902 0L0 24H5.71855L14.5175 0H8.79902Z" fill="#28a745"/>
                <path d="M19.8785 0L11.0795 24H16.798L25.597 0H19.8785Z" fill="#28a745"/>
                <path d="M25.6367 19.2L27.4157 13.6L31.4217 13.6L33.2007 8L29.1947 8L30.1942 4.8L25.8937 4.8L24.8942 8L22.8952 8L24.8942 0L19.1758 0L16.4258 8L21.2258 8L17.7893 19.2L25.6367 19.2Z" fill="#28a745"/>
              </svg>
              <span className="logo-text-ft">CareerSpot</span>
            </div>
            <p className="copyright-ft">Copyright © 2025  INDIAN Kit.</p>
            <p className="rights-ft">All rights reserved</p>
            <div className="social-icons-ft">
              <a href="https://www.instagram.com/accounts/login/?hl=en" className="social-icon-ft">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
              <a href="https://github.com/" className="social-icon-ft">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8zm5.284 3.688a6.802 6.802 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.736-2.551-4C6.95 1.206 7.463 1.18 8 1.18zm-2.907.642A43.123 43.123 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.865 6.865 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162-1.667.47-3.256 1.31-5.524 2.76A6.77 6.77 0 0 1 1.163 8.01zm6.837 6.809c-3.712 0-6.723-3-6.723-6.703 0-.08.001-.16.003-.24 2.17.013 4.957-.42 7.11-1.814 1.3 2.375 1.926 4.409 2.102 5.089-1.167.566-2.465.876-3.817.876-2.612 0-4.84-1.583-5.783-3.836 1.256-.789 2.259-1.485 3.642-2.005 1.7 2.002 2.98 2.45 3.015 2.464-.27.032-.612.065-.955.065-2.079 0-3.8-1.686-3.845-3.766 1.418-.244 2.88-.3 4.241-.223.09.578.262 1.14.489 1.674.48.19 1.1.388 1.845.388 1.993 0 3.617-1.617 3.643-3.61 1.086-.282 1.888-.343 2.09-.346A6.71 6.71 0 0 1 14.926 8c0 3.76-3.04 6.818-6.806 6.818z"/>
                </svg>
              </a>
              <a href="https://x.com/?lang=en" className="social-icon-ft">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/" className="social-icon-ft">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="links-container-ft">
            {/* Company Column */}
            <div className="links-column-ft">
              <h3 className="column-title-ft">Company</h3>
              <ul className="links-list-ft">
                <li><a href="#">About us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Testimonials</a></li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="links-column-ft">
              <h3 className="column-title-ft">Support</h3>
              <ul className="links-list-ft">
                <li><a href="#">Help center</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Legal</a></li>
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Status</a></li>
              </ul>
            </div>

            {/* Stay up to date Column */}
         
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;