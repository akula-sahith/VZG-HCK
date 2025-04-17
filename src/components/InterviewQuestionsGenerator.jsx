import React, { useState, useCallback, memo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Reusable memoized input component
const InputField = memo(({ label, placeholder, value, onChange, required = true }) => {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange]);

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label} {required && '*'}</label>
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
});

// Reusable memoized textarea component
const TextAreaField = memo(({ label, placeholder, value, onChange, required = true }) => {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange]);

  return (
    <div className="mb-6">
      <label className="block font-medium mb-1">{label} {required && '*'}</label>
      <textarea
        className="w-full p-2 border rounded min-h-24"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
});

// Component for rendering question sections
const QuestionSection = memo(({ title, description, questions }) => {
  const handleCopyAll = () => {
    const allText = questions.join('\n');
    navigator.clipboard.writeText(allText);
    alert("Copied all questions to clipboard!");
  };

  return (
    <div className="border rounded p-4 bg-white mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <button className="text-green-600 mb-4" onClick={handleCopyAll}>Copy All</button>
      {questions.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded">
          <p className="text-gray-400">Questions will appear here after generation</p>
        </div>
      ) : (
        questions.map((q, i) => (
          <div key={i} className="bg-gray-50 p-3 rounded mb-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
              Question {i + 1}
            </span>
            <p className="mt-2 text-gray-700">{q}</p>
          </div>
        ))
      )}
    </div>
  );
});

const InterviewQuestionsGenerator = () => {
  const { username } = useParams();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    jobRole: '',
    companyName: '',
    jobDescription: '',
  });
  const [techStack, setTechStack] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState({
    technical: [],
    resumebased: [],
    behavioral: [],
  });

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleGenerateQuestions = useCallback(async (e) => {
    e.preventDefault();
    const { jobRole, companyName, jobDescription } = formData;

    if (!jobRole || !companyName || !jobDescription) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await axios.post(`https://vzg-bck-1.onrender.com/api/${username}/generate`, {
        role: jobRole,
        company: companyName,
        jobDescription,
      });

      const data = res.data.questions;

      setGeneratedQuestions({
        technical: data.technical || [],
        resumebased: data.custom || [],
        behavioral: data.behavioral || [],
      });
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [formData, username]);

  const handleBack = () => setStep(1);

  return (
    <div className="bg-gray-50 p-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Interview Questions Generator</h1>
          <p className="text-gray-600">Generate tailored interview questions</p>
        </div>

        <div className="bg-white rounded shadow p-6">
          {step === 1 ? (
            <form onSubmit={handleGenerateQuestions}>
              <h2 className="text-xl font-semibold mb-4">Job Details</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField 
                  label="Job Role"
                  placeholder="e.g. Frontend Developer"
                  value={formData.jobRole}
                  onChange={(value) => updateField('jobRole', value)}
                />
                <InputField 
                  label="Company Name"
                  placeholder="e.g. Acme Inc."
                  value={formData.companyName}
                  onChange={(value) => updateField('companyName', value)}
                />
              </div>
              <InputField 
                label="Tech Stack"
                placeholder="e.g. React, Node.js, MongoDB"
                value={techStack}
                onChange={setTechStack}
                required={false}
              />
              <TextAreaField 
                label="Job Description"
                placeholder="Paste the job description..."
                value={formData.jobDescription}
                onChange={(value) => updateField('jobDescription', value)}
              />
              <div className="text-center mt-6">
                <button 
                  type="submit"
                  className={`px-6 py-2 rounded ${isGenerating ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white font-medium`}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Questions'}
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="bg-green-600 text-white p-4 -m-6 mb-6">
                <button className="text-white" onClick={handleBack}>← Back</button>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <QuestionSection 
                  title="Technical Questions"
                  description="To break the ice and understand the candidate's background"
                  questions={generatedQuestions.technical}
                />
                <QuestionSection 
                  title="Resume based Questions"
                  description="Specific to candidate's skills and experience"
                  questions={generatedQuestions.resumebased}
                />
                <QuestionSection 
                  title="Behavioral Questions"
                  description="To assess personality and culture fit"
                  questions={generatedQuestions.behavioral}
                />
              </div>
              <div className="flex justify-center mt-8 space-x-4">
                <button onClick={() => window.print()} className="px-4 py-2 border border-green-600 text-green-600 rounded">
                  Save as PDF
                </button>
                <button onClick={handleBack} className="px-4 py-2 bg-green-600 text-white rounded">
                  Generate New Questions
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">Powered by AI to help you interview better.</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestionsGenerator;
