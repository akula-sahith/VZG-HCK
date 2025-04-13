import React, { useState, useRef } from "react";
import {
  ChevronDown,
  CheckCircle,
  Shield,
  Clock,
  Zap,
  Settings,
} from "lucide-react";

const FAQComponent = () => {
  const faqs = [
    {
      question: " How does the resume analysis and ATS scoring work?",
      answer:
        " When a user uploads a resume, it's parsed using libraries like pdf2docx, docx, or NLP tools. We extract key sections (skills, education, experience) and run them through a scoring algorithm that compares them with industry-standard ATS filters using TF-IDF and keyword matching.",
      icon: <Zap size={20} />,
    },
    {
      question: " What technologies power the job matching and recommendation system?",
      answer:
        " We use NLP models like BERT and Sentence Transformers to extract embeddings from both resumes and job descriptions, then compute cosine similarity scores to rank job matches based on relevance.",
      icon: <Clock size={20} />,
    },
    {
      question: "How is user data stored and kept secure?",
      answer:
        "All user authentication is handled via Firebase Auth. Sensitive data (like resumes or LinkedIn credentials for automation) is stored in MongoDB with strict access controls, and passwords are never stored—only used in encrypted memory during automation.",
      icon: <Shield size={20} />,
    },
    {
      question: "How is the AI Interview Assistant implemented?",
      answer:
        "It uses OpenAI's GPT-3.5 or T5 to analyze job descriptions and generate personalized behavioral and technical interview questions. We plan to use Text-to-Speech (TTS) and Speech-to-Text (STT) to simulate a full interview experience.",
      icon: <Settings size={20} />,
    },
    {
      question: "What backend architecture are you using?",
      answer:
        "The backend is built with Express.js and Flask. Express handles routing, user management, and basic API tasks, while Flask serves ML/NLP models like resume parsing, scoring, and job match computation.",
      icon: <CheckCircle size={20} />,
    },
    {
      question: " Can the user download or share their optimized resume?",
      answer:
        " Yes! After analysis and optimization, the resume is displayed in a well-structured design via a ResumeDownload.jsx component and can be downloaded as a PDF using react-to-print.",
      icon: <CheckCircle size={20} />,
    },
    {
      question: "How does the LinkedIn Easy Apply feature work technically?",
      answer:
        "We use Playwright with LangChain + Browser Toolkit to control a headless browser. It logs into LinkedIn, navigates to the job link, uploads the resume, and submits the application using an AI Agent with step-by-step task execution.",
      icon: <Zap size={20} />,
    },
    {
      question: "What frontend frameworks and libraries are used?",
      answer:
        " The frontend is built in React.js with Tailwind CSS for styling, Firebase for auth, react-to-print for download, and Chart.js/Recharts for dashboard visualizations.",
      icon: <Clock size={20} />,
    },
    {
      question: "How are resume improvement suggestions generated?",
      answer:
        "We use rule-based NLP and fine-tuned GPT prompts to analyze grammar, format, and keyword density. It checks for action verbs, passive voice, and missing keywords, then gives specific, editable suggestions.",
      icon: <Settings size={20} />,
    },
    {
      question: "What support options do you offer?",
      answer:
        "We provide 24/7 customer support through chat, email, and a detailed knowledge base.",
      icon: <Shield size={20} />,
    },
  ];

  const [openItems, setOpenItems] = useState({});
  const answerRefs = useRef({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderFaqItem = (faq, index) => {
    const isOpen = openItems[index] || false;

    return (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden transition-all"
      >
        {/* Question Header */}
        <div
          onClick={() => toggleItem(index)}
          className="flex items-center justify-between p-4 cursor-pointer min-h-[80px]"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <div className="text-green-600">{faq.icon}</div>
            <h3 className="text-base font-semibold text-gray-800">
              {faq.question}
            </h3>
          </div>
          <div
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronDown size={20} className="text-green-600" />
          </div>
        </div>

        {/* Collapsible Answer */}
        <div
          className="overflow-hidden transition-all duration-300 px-4"
          style={{
            height: isOpen
              ? `${answerRefs.current[index]?.scrollHeight}px`
              : "0px",
          }}
        >
          <div
            className="text-sm text-gray-700 pb-4"
            ref={(el) => (answerRefs.current[index] = el)}
          >
            {faq.answer}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-green-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-green-600 mx-auto mt-2 rounded-full"></div>
          <p className="text-gray-600 mt-4">
            Everything you need to know about our AI assistant
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => renderFaqItem(faq, index))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-700">
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-green-700 font-semibold underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
