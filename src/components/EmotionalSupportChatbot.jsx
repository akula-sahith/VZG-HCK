import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Briefcase, AlertTriangle } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function MotivationalSupportChatbot() {
  const { username } = useParams();
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: `Hello ${username}, I'm here for you. How can I help you today?`, 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Backend API request function
  const fetchSupportResponse = async (userMessage) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // API endpoint URL - replace with your actual backend URL
      const apiUrl = `https://vzg-bck-1.onrender.com/api/${username}/mchatbot`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          // 'Authorization': 'Bearer YOUR_TOKEN'
        },
        body: JSON.stringify({
          message: userMessage
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setIsLoading(false);
      return data.answer; // Assuming your API returns a response field
      
    } catch (err) {
      console.error('Error fetching response:', err);
      setError('Unable to get a response. Please try again.');
      setIsLoading(false);
      
      // Return a fallback response
      return "I'm having trouble connecting to my systems. Please try again in a moment, or reach out to our support team if the issue persists.";
    }
  };

  // Fallback function in case the API fails
  const getFallbackResponse = () => {
    const fallbackResponses = [
      "I understand this is a challenging time. What specific aspect of your job search are you finding most difficult?",
      "Job searching can be emotionally taxing. Remember to be kind to yourself through this process.",
      "It's normal to experience ups and downs during a career transition. What helped you navigate challenges in the past?",
      "Thank you for sharing your feelings. Would it help to discuss some coping strategies for job search stress?",
      "Many job seekers feel the same way. Remember that your worth isn't defined by your employment status."
    ];
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    const userMessageText = inputValue;
    setInputValue('');
    
    // Get response from backend
    try {
      const response = await fetchSupportResponse(userMessageText);
      
      // Add bot response
      const botResponse = {
        id: messages.length + 2,
        text: response,
        sender: 'bot'
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      // If the API call completely fails, use fallback
      const fallbackResponse = {
        id: messages.length + 2,
        text: getFallbackResponse(),
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white py-3 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Briefcase size={22} className="mr-3" />
            <h1 className="text-xl font-semibold">Motivational support chatbot</h1>
          </div>
          <div className="text-sm font-medium">
            {username ? `Welcome, ${username}` : 'Welcome'}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-hidden container mx-auto p-6 flex flex-col max-w-6xl">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto mb-6 rounded-lg bg-white shadow-md border border-gray-200 p-6">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-6 ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'} max-w-xl`}
            >
              <div className={`p-4 rounded-lg shadow-sm ${
                message.sender === 'user' 
                  ? 'bg-green-700 text-white rounded-br-none' 
                  : 'bg-gray-100 border border-gray-200 rounded-bl-none'
              }`}>
                <div className="flex items-start">
                  {message.sender === 'bot' && <Bot size={18} className="mr-2 mt-1 text-green-700 flex-shrink-0" />}
                  <p className={message.sender === 'user' ? 'text-white' : 'text-gray-800'}>{message.text}</p>
                  {message.sender === 'user' && <User size={18} className="ml-2 mt-1 text-white flex-shrink-0" />}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1 px-2">
                {message.sender === 'user' ? 'You' : 'Career Assistant'} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          ))}
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 max-w-xl mx-auto">
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex items-center">
                <AlertTriangle size={16} className="mr-2" />
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center space-x-2 mb-4 max-w-xl">
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Bot size={18} className="text-green-700" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <form onSubmit={handleSubmit} className="flex p-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Share your career questions or concerns..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="bg-green-700 text-white px-6 rounded-r-lg hover:bg-green-800 transition-colors flex items-center justify-center disabled:bg-green-400"
              disabled={isLoading || !inputValue.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center">
        <div className="container mx-auto">
          <p className="text-gray-600 text-sm">Uplifting your spirit and guiding you through every challenge on your career journey.</p>
          <div className="mt-2 text-xs text-gray-500">© 2025 Motivational Support Assistant</div>
        </div>
      </footer>
    </div>
  );
}