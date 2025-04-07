import React, { useState } from "react";
import "./features.css";
import {
  FaRobot, FaFileAlt, FaSearch, FaChartBar,
  FaLinkedin, FaMicrophone, FaQuestionCircle,
  FaHeartbeat, FaPlusSquare, FaPenFancy,
  FaRocket, FaComments
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <FaRobot />,
    title: "ATS Scoring",
    desc: "Analyzes resume compatibility with Applicant Tracking Systems.",
    popupDesc: "✅ What it does: Analyzes your resume against job descriptions to see how well it performs in Applicant Tracking Systems (ATS) used by recruiters.\n\n✅ Why it helps: Increases your chances of getting noticed by ensuring your resume has the right keywords and formatting."
  },
  {
    icon: <FaFileAlt />,
    title: "Resume Optimization",
    desc: "Enhances resumes based on job descriptions.",
    popupDesc: "✅ What it does: Fine-tunes your resume based on the job you're targeting.\n\n✅ Why it helps: Aligns your experience and skills with what recruiters are looking for, improving your visibility."
  },
  {
    icon: <FaSearch />,
    title: "Job Recommendations",
    desc: "Finds best-matching jobs tailored to you.",
    popupDesc: "✅ What it does: Scans platforms like LinkedIn to suggest jobs that match your resume, experience, and preferences.\n\n✅ Why it helps: Saves time and surfaces better opportunities tailored to you."
  },
  {
    icon: <FaChartBar />,
    title: "Skill Gap Analysis",
    desc: "Identifies missing skills for a target job.",
    popupDesc: "✅ What it does: Compares your current skills with your target job and highlights what's missing.\n\n✅ Why it helps: Helps you focus your learning efforts on high-impact areas to become more qualified."
  },
  {
    icon: <FaLinkedin />,
    title: "LinkedIn Optimization",
    desc: "Improves your LinkedIn profile to attract recruiters.",
    popupDesc: "✅ What it does: Reviews and enhances your LinkedIn profile to appeal to recruiters.\n\n✅ Why it helps: A stronger profile increases visibility and trust, making you stand out in job searches."
  },
  {
    icon: <FaMicrophone />,
    title: "AI Interview Practicer",
    desc: "Conducts mock interviews with AI feedback.",
    popupDesc: "✅ What it does: Simulates real interview scenarios with AI-driven questions and feedback.\n\n✅ Why it helps: Builds your confidence and prepares you to respond calmly and clearly under pressure."
  },
  {
    icon: <FaQuestionCircle />,
    title: "Interview Questions",
    desc: "Generates personalized questions for interviews.",
    popupDesc: "✅ What it does: Generates questions tailored to the job you're applying for and your resume content.\n\n✅ Why it helps: Gives you a competitive edge by preparing for questions you're likely to face."
  },
  {
    icon: <FaHeartbeat />,
    title: "Emotional Support Chatbot",
    desc: "Real-time support for mental well-being.",
    popupDesc: "✅ What it does: Offers 24/7 support during the stressful job-hunting journey.\n\n✅ Why it helps: Reduces anxiety, boosts motivation, and keeps you mentally strong."
  },
  {
    icon: <FaPlusSquare />,
    title: "New Resume Generator",
    desc: "Creates a fresh resume from scratch.",
    popupDesc: "✅ What it does: Helps you build a clean, effective resume using AI with industry-standard formatting.\n\n✅ Why it helps: Perfect for job seekers starting from scratch or switching careers."
  },
  {
    icon: <FaPenFancy />,
    title: "Cover Letter Optimization",
    desc: "Refines cover letters for strong first impressions.",
    popupDesc: "✅ What it does: Helps you craft persuasive cover letters aligned with the job description.\n\n✅ Why it helps: Increases your chances of landing interviews by making strong first impressions."
  },
  {
    icon: <FaRocket />,
    title: "One-Click Apply",
    desc: "Apply to multiple jobs instantly.",
    popupDesc: "✅ What it does: Allows you to apply to multiple relevant jobs with a single click.\n\n✅ Why it helps: Saves time and ensures quick outreach to many opportunities without sacrificing quality."
  },
  {
    icon: <FaComments />,
    title: "Personalized Chatbot",
    desc: "Guides you through your job journey.",
    popupDesc: "✅ What it does: AI-powered assistant that answers queries and guides you through your job search.\n\n✅ Why it helps: Keeps you supported, informed, and on track throughout your journey."
  }
];
export { features };

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const navigate = useNavigate();
  return (
    <section className="features-container-F bg-white-500">
      <h2 className="features-heading-F">Here the services we are providing</h2>
      <p className="features-subheading-F">Who can you do with this website?</p>
      <div className="features-grid-F">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card-F"
            onClick={() => setSelectedFeature(feature)}
          >
            <div className="feature-icon-F">{feature.icon}</div>
            <h3 className="feature-title-F">{feature.title}</h3>
            <p className="feature-desc-F">{feature.desc}</p>
          </div>
        ))}
      </div>

      {selectedFeature && (
        <div className="popup-overlay-F" onClick={() => setSelectedFeature(null)}>
          <div className="popup-F" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-F" onClick={() => setSelectedFeature(null)}>✖</button>
            <div className="popup-icon-F">{selectedFeature.icon}</div>
            <h3>{selectedFeature.title}</h3>
            <pre className="popup-desc-F">{selectedFeature.popupDesc}</pre>
            <div className="popup-login-section-F">
              <p className="popup-login-text-F">Login to use this feature</p>
              <div className="popup-login-btn-container-F">
                <button className="popup-login-btn-F"> Login </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Features;