import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function InterviewPracticeApp() {
  const { username } = useParams();
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    jobDescription: ''
  });
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [currentView, setCurrentView] = useState('form'); // 'form', 'questions', 'interview', 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [optimizedAnswers, setOptimizedAnswers] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [reportData, setReportData] = useState(null);
  
  // Speech recognition
  const recognitionRef = useRef(null);
  const [transcript, setTranscript] = useState('');
  
  // Speech synthesis
  const synthRef = useRef(null);

  // Define all render functions at the top
  const renderForm = () => {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">AI Interview Practice</h1>
        <h2 className="text-xl font-semibold mb-4">Generate tailored interview questions</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Job Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-medium">Job Role <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g. Frontend Developer"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Company Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Acme Inc."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Job Description <span className="text-red-500">*</span></label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                placeholder="Paste the job description..."
                className="w-full p-2 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`py-2 px-6 ${isLoading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
            >
              {isLoading ? 'Generating...' : 'Generate Questions'}
            </button>
          </div>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}
        
        <div className="mt-8 text-center text-sm text-gray-500">
          Powered by AI to help you interview better.
        </div>
      </div>
    );
  };

  const renderQuestionsList = () => {
    if (!generatedQuestions) return null;
    
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-600 mb-6">Generated Interview Questions</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-green-700">Technical Questions</h2>
          <ul className="list-disc pl-5 space-y-2">
            {generatedQuestions.technical.map((q, idx) => (
              <li key={`tech-${idx}`} className="text-gray-700">{q}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-green-700">Resume-Based Questions</h2>
          <ul className="list-disc pl-5 space-y-2">
            {generatedQuestions.custom.map((q, idx) => (
              <li key={`custom-${idx}`} className="text-gray-700">{q}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-green-700">Behavioral Questions</h2>
          <ul className="list-disc pl-5 space-y-2">
            {generatedQuestions.behavioral.map((q, idx) => (
              <li key={`behav-${idx}`} className="text-gray-700">{q}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentView('form')}
            className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition-colors"
          >
            Back
          </button>
          
          <button
            onClick={startInterview}
            className="py-2 px-6 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
          >
            Start Practice Interview
          </button>
        </div>
      </div>
    );
  };

  const renderInterview = () => {
    if (!generatedQuestions || generatedQuestions.length === 0) return null;
    
    const currentQuestionObj = generatedQuestions[currentQuestion];
    if (!currentQuestionObj) return null;
    
    const questionTypeLabel = 
      currentQuestionObj.type === 'technical' ? 'Technical Question' :
      currentQuestionObj.type === 'custom' ? 'Resume-Based Question' : 'Behavioral Question';
    
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <span className="inline-block py-1 px-3 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Question {currentQuestion + 1} of {generatedQuestions.length} - {questionTypeLabel}
          </span>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-1">{currentQuestionObj.question}</h2>
          <div className="flex items-center mt-2">
            <button 
              onClick={() => speakQuestion(currentQuestionObj.question)}
              className="text-sm flex items-center text-green-600 hover:text-green-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Listen to question
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={handleRecording}
              className={`p-4 rounded-full ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white shadow-md flex items-center`}
            >
              {isRecording ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                  </svg>
                  Stop Recording
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                  Start Recording
                </>
              )}
            </button>
          </div>
          
          {isRecording && (
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm animate-pulse">
                Recording in progress...
              </div>
              {transcript && (
                <div className="mt-2 p-3 bg-gray-50 rounded text-sm text-gray-600">
                  {transcript}
                </div>
              )}
            </div>
          )}
          
          {!isRecording && userAnswers[currentQuestion] && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Your recorded answer:</h3>
              <p className="bg-gray-50 p-3 rounded border border-gray-200">{userAnswers[currentQuestion]}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`py-2 px-4 font-medium rounded-md ${
              currentQuestion === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={nextQuestion}
            disabled={isLoading}
            className={`py-2 px-6 ${isLoading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white font-medium rounded-md`}
          >
            {isLoading ? 'Processing...' : currentQuestion === generatedQuestions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!generatedQuestions) return null;
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-600 mb-6">Interview Results</h1>
        
        <div className="mb-8">
          <p className="bg-green-50 p-4 border-l-4 border-green-500 text-green-700">
            You've completed all {generatedQuestions.length} questions! Here's your feedback:
          </p>
        </div>
        
        {generatedQuestions.map((questionObj, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Question {index + 1}: {questionObj.question}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-r border-gray-200 pr-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-1">Your answer:</h4>
                <div className="bg-white p-3 rounded border border-gray-200 h-full">
                  <p>{userAnswers[index] || "(No answer recorded)"}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-1">Optimized answer:</h4>
                <div className="bg-white p-3 rounded border border-green-200 h-full">
                  <p className="text-green-700">
                    {optimizedAnswers[index] || "No optimized answer available."}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-500 mb-1">Feedback:</h4>
              <p className="text-sm">
                {feedback[index]?.feedback || "Feedback for this answer is not available."}
              </p>
            </div>
          </div>
        ))}
        
        {reportData && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Overall Interview Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-medium text-blue-600">Overall Score</h4>
                <p className="text-2xl font-bold">{reportData.overallScore}/100</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-medium text-blue-600">Strengths</h4>
                <ul className="list-disc pl-5">
                  {reportData.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-medium text-blue-600">Areas to Improve</h4>
                <ul className="list-disc pl-5">
                  {reportData.areasToImprove.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-medium text-blue-600">Detailed Feedback</h4>
              <p>{reportData.detailedFeedback}</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              setCurrentView('form');
              setGeneratedQuestions(null);
              setUserAnswers([]);
              setCurrentQuestion(0);
              setFeedback([]);
              setTranscript('');
              setOptimizedAnswers([]);
              setReportData(null);
            }}
            className="py-2 px-6 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md"
          >
            Start New Practice
          </button>
        </div>
      </div>
    );
  };

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech Recognition not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscript("Listening...");
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onresult = (event) => {
      const finalTranscript = event.results[0][0].transcript.trim();
      setTranscript(finalTranscript || "No response detected.");
      
      // Update the user answers with the new transcript
      setUserAnswers(prev => {
        const updated = [...prev];
        updated[currentQuestion] = finalTranscript || "No response detected.";
        return updated;
      });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setTranscript("Could not detect audio properly.");
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    
    // Cleanup function to stop recognition when component unmounts
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          // Ignore errors when stopping (might not be started)
        }
      }
    };
  }, [currentQuestion]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // API call to generate questions
      const response = await fetch(`https://vzg-bck-1.onrender.com/api/${username}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }
      
      const data = await response.json();
      
      // Format received questions into our application structure
      const questions = {
        technical: data.questions?.technical || [],
        behavioral: data.questions?.behavioral || [],
        custom: data.questions?.custom || [],
      };
  
      setGeneratedQuestions(questions);
      setCurrentView('questions');
    } catch (err) {
      setError(err.message || 'An error occurred while generating questions');
      console.error('Error generating questions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const startInterview = () => {
    if (!generatedQuestions) return;
    
    // Convert from categorized object to flat array with type information
    const allQuestions = [
      ...generatedQuestions.technical.map(q => ({ question: q, type: 'technical' })),
      ...generatedQuestions.behavioral.map(q => ({ question: q, type: 'behavioral' })),
      ...generatedQuestions.custom.map(q => ({ question: q, type: 'custom' }))
    ];
  
    setUserAnswers(Array(allQuestions.length).fill(""));
    setGeneratedQuestions(allQuestions);
    setCurrentView('interview');
    setCurrentQuestion(0);
  
    // Give a short delay before speaking the first question
    setTimeout(() => {
      if (allQuestions.length > 0) {
        speakQuestion(allQuestions[0].question);
      }
    }, 1000);
  };

  const handleRecording = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not supported in your browser');
      return;
    }
    
    if (!isRecording) {
      // Start recording
      recognitionRef.current.start();
    } else {
      // Stop recording
      recognitionRef.current.stop();
    }
  };

  const speakQuestion = (text) => {
    if (!synthRef.current) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
    };

    synthRef.current.speak(utterance);
  };

  const nextQuestion = async () => {
    // If this is the last question, get feedback and go to results
    if (currentQuestion === generatedQuestions.length - 1) {
      await getFeedback();
      return;
    }
    
    // Otherwise, go to the next question
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    
    // Speak the next question after a short delay
    setTimeout(() => {
      if (generatedQuestions[currentQuestion + 1]) {
        speakQuestion(generatedQuestions[currentQuestion + 1].question);
      }
    }, 500);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prevQuestion => prevQuestion - 1);
      
      // Speak the previous question after a short delay
      setTimeout(() => {
        if (generatedQuestions[currentQuestion - 1]) {
          speakQuestion(generatedQuestions[currentQuestion - 1].question);
        }
      }, 500);
    }
  };
  
  const getFeedback = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const answersData = generatedQuestions.map((q, idx) => ({
        question: q.question,
        answer: userAnswers[idx] || '',
        type: q.type
      }));
      
      const response = await axios.post('http://localhost:5000/feedback', {
        jobDetails: formData,
        answers: answersData
      });
      
      const { feedback, optimizedAnswers, report } = response.data;
      
      if (!feedback || !optimizedAnswers || !report) {
        throw new Error('Invalid response structure from server');
      }
      console.log(feedback)
      console.log(optimizedAnswers)
      console.log(report)
      setFeedback(feedback);
      setOptimizedAnswers(optimizedAnswers);
      setReportData(report);
      setCurrentView('results');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to get feedback');
      console.error('Feedback error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {currentView === 'form' && renderForm()}
      {currentView === 'questions' && renderQuestionsList()}
      {currentView === 'interview' && renderInterview()}
      {currentView === 'results' && renderResults()}
    </div>
  );
}