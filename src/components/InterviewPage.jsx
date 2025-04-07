import React, { useState, useEffect, useRef } from "react";

const dummyQuestions = [
  "Tell me about yourself.",
  "What are your strengths?",
  "Why do you want to work here?",
];

const dummyBetterAnswers = [
  "I'm a motivated developer with experience in building real-world applications and working in collaborative teams.",
  "My key strengths include problem-solving, teamwork, and adaptability in challenging environments.",
  "I'm excited about this company because of its focus on innovation and the chance to grow as an engineer.",
];

const InterviewPage = () => {
  const [questions] = useState(dummyQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showStartRecording, setShowStartRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser.");
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
      setAllAnswers((prev) => {
        const updated = [...prev];
        updated[currentIndex] = finalTranscript || "No response detected.";
        return updated;
      });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setTranscript("Could not detect audio properly.");
    };

    recognitionRef.current = recognition;
  }, [currentIndex]);

  const speakQuestion = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;

    utterance.onend = () => {
      setShowStartRecording(true);
    };

    window.speechSynthesis.cancel(); // cancel previous queued utterances
    window.speechSynthesis.speak(utterance);
  };

  const startInterview = () => {
    setIsInterviewStarted(true);
    speakQuestion(questions[currentIndex]);
  };

  const startRecording = () => {
    setTranscript("");
    setShowStartRecording(false);
    if (recognitionRef.current) recognitionRef.current.start();
  };

  const handleNext = () => {
    if (recognitionRef.current) recognitionRef.current.stop();

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTranscript("");
      setTimeout(() => {
        speakQuestion(questions[currentIndex + 1]);
      }, 500);
    }
  };

  const handleSubmit = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsFinished(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">AI Interview Practice</h1>

      {!isInterviewStarted && !isFinished && (
        <button
          onClick={startInterview}
          className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
        >
          🎤 Start Interview
        </button>
      )}

      {isInterviewStarted && !isFinished && (
        <div className="bg-white p-6 mt-4 shadow-md rounded-xl w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <p className="text-gray-800 font-medium mb-3">{questions[currentIndex]}</p>

          {showStartRecording && (
            <button
              onClick={startRecording}
              className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 mb-4"
            >
              🎙️ Start Recording
            </button>
          )}

          {transcript && (
            <div>
              <p className="text-gray-600 font-medium mb-1">Your Answer:</p>
              <div className="bg-gray-100 p-4 rounded min-h-[60px]">
                {isRecording ? "🎤 Listening..." : transcript}
              </div>
            </div>
          )}

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
            >
              ⏭️ Next Question
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="mt-6 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full"
            >
              ✅ Submit My Answers & Get Feedback
            </button>
          )}
        </div>
      )}

      {isFinished && (
        <div className="bg-white p-6 mt-6 shadow-md rounded-xl w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Feedback</h2>

          {questions.map((q, idx) => (
            <div
              key={idx}
              className="mb-6 border-b border-gray-200 pb-4 last:border-b-0"
            >
              <p className="font-semibold text-gray-800 mb-1">
                <span className="text-green-600">Question:</span> {q}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Your Answer:</span>{" "}
                {allAnswers[idx] || "No answer recorded."}
              </p>
              <p className="text-green-700">
                <span className="font-medium">Better Answer:</span>{" "}
                {dummyBetterAnswers[idx]}
              </p>
            </div>
          ))}

          <div className="text-xl font-bold text-green-600 mt-6">
            Overall Score: <span className="text-green-600">8.7 / 10</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
