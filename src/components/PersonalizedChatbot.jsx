import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PersonalizedChatbot = () => {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll when new messages appear
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input field when component loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Simulate typing effect for more natural interaction
  useEffect(() => {
    if (isLoading && !isTyping) {
      setIsTyping(true);
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 500);
      return () => clearTimeout(typingTimeout);
    }
  }, [isLoading, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    setInputValue('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { 
      sender: 'user', 
      text: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setIsLoading(true);
    
    try {
      // Using a brief timeout to improve UX with typing animation
      setTimeout(async () => {
        try {
          const response = await axios.post(`http://127.0.0.1:5000/api/${username}/chatbot`, {
            question: userMessage
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          // Add chatbot response to chat
          setMessages(prev => [...prev, { 
            sender: 'bot', 
            text: response.data.answer,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        } catch (error) {
          console.error('Error fetching response:', error);
          setMessages(prev => [...prev, { 
            sender: 'bot', 
            text: 'Sorry, I encountered an error processing your question. Please try again later.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: true
          }]);
        } finally {
          setIsLoading(false);
        }
      }, 500); // Small delay for better UX
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                {username ? username.charAt(0).toUpperCase() : 'R'}
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">{username ? `${username}'s Resume Assistant` : 'Resume Chatbot'}</h1>
              <p className="text-xs text-green-100">Ask me anything about the resume</p>
            </div>
          </div>
          <div className="hidden md:flex items-center text-sm">
            <span className="px-3 py-1 bg-green-700 rounded-full text-white">Online</span>
          </div>
        </div>
      </div>
      
      {/* Chat Container */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-6xl w-full mx-auto px-4 py-6">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to the Resume Chatbot</h2>
              <p className="text-gray-500 max-w-md">
                Ask questions about {username}'s professional experience, skills, education, or any other information found in their resume.
              </p>
              <div className="mt-6 space-y-2">
                <button 
                  onClick={() => {
                    setInputValue("What are your key skills?");
                    setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
                  }}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm hover:bg-green-100 transition"
                >
                  What are your key skills?
                </button>
                <button 
                  onClick={() => {
                    setInputValue("Tell me about your work experience");
                    setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
                  }}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm hover:bg-green-100 transition"
                >
                  Tell me about your work experience
                </button>
                <button 
                  onClick={() => {
                    setInputValue("What's your educational background?");
                    setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
                  }}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm hover:bg-green-100 transition"
                >
                  What's your educational background?
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-3">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    flex max-w-xs md:max-w-md lg:max-w-lg
                    ${message.sender === 'user' 
                      ? 'ml-auto items-end' 
                      : 'mr-auto items-start'
                    }
                  `}>
                    {message.sender === 'bot' && (
                      <div className="h-8 w-8 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center text-white font-bold mr-2">
                        {username ? username.charAt(0).toUpperCase() : 'R'}
                      </div>
                    )}
                    <div>
                      <div 
                        className={`p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-green-600 text-white rounded-br-none' 
                            : message.isError 
                              ? 'bg-red-50 text-red-600 rounded-bl-none border border-red-200' 
                              : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className={`text-xs mt-1 text-gray-400 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {message.timestamp}
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500 ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start max-w-xs md:max-w-md">
                    <div className="h-8 w-8 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center text-white font-bold mr-2">
                      {username ? username.charAt(0).toUpperCase() : 'R'}
                    </div>
                    <div className="p-3 rounded-lg bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="pt-4 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex items-end">
            <div className="relative flex-1 mr-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your question about the resume..."
                className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit" 
              className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-300 transition-colors flex-shrink-0"
              disabled={isLoading || !inputValue.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <div className="text-xs text-gray-400 mt-2 text-center">
            Ask questions related to resume skills, experience, or qualifications
          </div>
        </div>
      </div>

      {/* CSS for typing animation */}
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
          margin-right: 3px;
          animation: bounce 1.2s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
          }
          40% { 
            transform: scale(1.0);
          }
        }

        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thumb-green-200::-webkit-scrollbar-thumb {
          background-color: #bbf7d0;
          border-radius: 3px;
        }
        .scrollbar-thumb-green-200::-webkit-scrollbar-thumb:hover {
          background-color: #86efac;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default PersonalizedChatbot;