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
      question: "What is an AI-powered employee assistant?",
      answer:
        "Our AI assistant is a smart tool that helps automate routine tasks, streamline workflows, and boost overall productivity in your workplace.",
      icon: <Zap size={20} />,
    },
    {
      question: "How can this assistant improve my daily workflow?",
      answer:
        "It manages repetitive tasks, sets reminders, helps with documentation, and offers real-time support, freeing you to focus on higher-priority work.",
      icon: <Clock size={20} />,
    },
    {
      question: "Is my data safe and secure?",
      answer:
        "Absolutely. We prioritize data privacy with top-tier encryption protocols and secure cloud infrastructure.",
      icon: <Shield size={20} />,
    },
    {
      question: "Can I integrate this assistant with existing tools?",
      answer:
        "Yes! Our assistant is designed to integrate with popular workplace apps like Slack, Google Workspace, Microsoft Teams, and more.",
      icon: <Settings size={20} />,
    },
    {
      question: "Do I need technical knowledge to use it?",
      answer:
        "Not at all. The platform is user-friendly and intuitive, designed for everyone—no coding or tech background needed.",
      icon: <CheckCircle size={20} />,
    },
    {
      question: "Is this solution suitable for small teams or freelancers?",
      answer:
        "Definitely. Whether you're a team of 2 or 200, the assistant adapts to your workflow and scales with your needs.",
      icon: <CheckCircle size={20} />,
    },
    {
      question: "What kind of tasks can the assistant handle?",
      answer:
        "It can schedule meetings, manage emails, track tasks, generate reports, and much more.",
      icon: <Zap size={20} />,
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a free trial so you can experience the benefits before making any commitment.",
      icon: <Clock size={20} />,
    },
    {
      question: "Can I customize the assistant's behavior?",
      answer:
        "Yes, the assistant is fully customizable to match your workflow and preferences.",
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
