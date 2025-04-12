import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const CoverLetterGenerator = () => {
  const [activeSection, setActiveSection] = useState('jobDescription');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [hiringManager, setHiringManager] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Standard (350-400 words)');
  const [highlightSkills, setHighlightSkills] = useState(true);
  const [includeResearch, setIncludeResearch] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const { username } = useParams();
  
  const coverLetterRef = useRef(null);

  const handleGenerateClick = async () => {
    // Validate required fields
    if (!jobTitle.trim() || !companyName.trim() || !jobDescription.trim()) {
      setError('Please fill in the required fields: Job Title, Company Name, and Job Description');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const payload = {
        jobTitle,
        companyName,
        hiringManager,
        jobDescription,
        tone,
        length,
        highlightSkills,
        includeResearch
      };

      const response = await axios.post(
        `http://localhost:5000/api/${username}/generate-cover-letter`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setCoverLetter(response.data.coverLetter); // not just response.data
      setActiveSection('generation');
      setIsGenerating(false);
    } catch (err) {
      console.error('Error generating cover letter:', err);
      setError('Failed to generate cover letter. Please try again later.');
      setIsGenerating(false);
    }
  };

  const downloadAsPDF = () => {
    const element = document.getElementById('coverLetterContent');
    if (!element) return;
  
    const opt = {
      margin: 0.5,
      filename: `${jobTitle.replace(/\s+/g, '_')}_Cover_Letter.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
  
    html2pdf().set(opt).from(element).save().catch((err) => {
      console.error("Error generating PDF:", err);
    });
  };
  

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
  };

  const regenerateCoverLetter = async () => {
    await handleGenerateClick();
  };

  const editCoverLetter = () => {
    // Change to a hypothetical edit mode or return to job description
    setActiveSection('jobDescription');
  };

  // Function to format the cover letter text with proper line breaks for display
  const formatCoverLetter = (text) => {
    if (typeof text !== 'string') return <p>No cover letter generated.</p>;
  
    return text.split("\n\n").map((para, index) => (
      <p key={index} className="mb-4">{para.trim()}</p>
    ));
  };
  

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with Profile on Right */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Cover Letter Generator</h1>
            <p className="text-gray-600 mt-1">
              Create tailored cover letters that match job requirements and highlight your qualifications
            </p>
          </div>
          
          {/* User Profile - Top Right */}
          <div className="flex items-center">
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                  <span className="text-lg font-bold text-white">A</span>
                </div>
                <span className="text-gray-700 font-medium group-hover:text-green-600 transition-colors duration-200">{username}</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area - Flex Container */}
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Sidebar */}
          <div className="w-full md:w-1/4 bg-gray-50 p-5 border-r border-gray-200">
            <h2 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">GENERATOR TOOLS</h2>

            {/* Tools List */}
            <div className="space-y-2 mb-8">
              <button 
                onClick={() => setActiveSection('jobDescription')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200 ${
                  activeSection === 'jobDescription' 
                    ? 'bg-white shadow-sm border-l-4 border-green-500' 
                    : 'hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                  activeSection === 'jobDescription' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <span className={activeSection === 'jobDescription' ? 'font-medium' : ''}>Job Description</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('generation')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200 ${
                  activeSection === 'generation' 
                    ? 'bg-white shadow-sm border-l-4 border-green-500' 
                    : 'hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                  activeSection === 'generation' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <span className={activeSection === 'generation' ? 'font-medium' : ''}>Cover Letter</span>
              </button>
            </div>
            
            {/* Recent Cover Letters Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold text-gray-500 tracking-wider uppercase">RECENT COVER LETTERS</h2>
                <button className="text-green-600 hover:text-green-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                {/* Recent Item 1 */}
                <div className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800 group-hover:text-green-600 transition-colors">Frontend Developer</p>
                      <p className="text-sm text-gray-500">April 3, 2025</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Recent Item 2 */}
                <div className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800 group-hover:text-green-600 transition-colors">React Developer</p>
                      <p className="text-sm text-gray-500">March 27, 2025</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Recent Item 3 */}
                <div className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800 group-hover:text-green-600 transition-colors">Software Engineer</p>
                      <p className="text-sm text-gray-500">March 15, 2025</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Main Content */}
          <div className="w-full md:w-3/4 p-6">
            {/* Error message display */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {activeSection === 'jobDescription' && (
              <>
                {/* Job Description Section */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="text-green-600 mr-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    Paste the job description to tailor your cover letter for this position
                  </p>
                  
                  {/* Text Area */}
                  <div className="relative mt-2 mb-6">
                    <textarea 
                      className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white resize-none"
                      placeholder="Paste job description here..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    ></textarea>
                    <div className="absolute bottom-4 right-4 text-gray-400 text-xs">
                      {jobDescription.length} characters
                    </div>
                  </div>
                </div>

                {/* Two Column Layout for Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column - Job Details */}
                  <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Details</h2>
                    
                    {/* Job Title Input */}
                    <div className="mb-4">
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input 
                        type="text" 
                        id="jobTitle"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        placeholder="e.g. Software Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Company Name Input */}
                    <div className="mb-4">
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input 
                        type="text" 
                        id="companyName"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        placeholder="e.g. Tech Innovations Inc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Hiring Manager Input */}
                    <div className="mb-1">
                      <label htmlFor="hiringManager" className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager (if known)</label>
                      <input 
                        type="text" 
                        id="hiringManager"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        placeholder="e.g. Sarah Smith"
                        value={hiringManager}
                        onChange={(e) => setHiringManager(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Leave blank if unknown for a general greeting</p>
                  </div>

                  {/* Right Column - Cover Letter Settings */}
                  <div>
                    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Cover Letter Settings</h2>
                      
                      {/* Tone Dropdown */}
                      <div className="mb-4">
                        <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                        <div className="relative">
                          <select 
                            id="tone"
                            className="appearance-none w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white cursor-pointer pr-10"
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                          >
                            <option>Professional</option>
                            <option>Conversational</option>
                            <option>Enthusiastic</option>
                            <option>Formal</option>
                            <option>Creative</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Length Dropdown */}
                      <div className="mb-5">
                        <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                        <div className="relative">
                          <select 
                            id="length"
                            className="appearance-none w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white cursor-pointer pr-10"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                          >
                            <option>Brief (250-300 words)</option>
                            <option>Standard (350-400 words)</option>
                            <option>Detailed (450-500 words)</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Toggle Switches */}
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <label className="flex items-center cursor-pointer">
                            <div className="relative">
                              <input 
                                type="checkbox" 
                                className="sr-only" 
                                checked={highlightSkills}
                                onChange={() => setHighlightSkills(!highlightSkills)}
                              />
                              <div className={`block w-12 h-6 rounded-full transition-colors duration-200 ${highlightSkills ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${highlightSkills ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                            <span className="ml-3 text-gray-700 text-sm">Highlight Key Skills</span>
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <label className="flex items-center cursor-pointer">
                            <div className="relative">
                              <input 
                                type="checkbox" 
                                className="sr-only" 
                                checked={includeResearch}
                                onChange={() => setIncludeResearch(!includeResearch)}
                              />
                              <div className={`block w-12 h-6 rounded-full transition-colors duration-200 ${includeResearch ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${includeResearch ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                            <span className="ml-3 text-gray-700 text-sm">Include Company Research</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Generate Button */}
                    <button 
                      onClick={handleGenerateClick}
                      disabled={isGenerating}
                      className={`w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-sm hover:from-green-600 hover:to-green-700 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isGenerating ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          Generate Cover Letter
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Show Cover Letter Tips */}
                <div className="mt-6 text-center">
                  <button className="inline-flex items-center text-green-600 hover:text-green-700 text-sm transition-colors duration-200 group">
                    <span>Show Cover Letter Tips</span>
                    <svg className="w-4 h-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </>
            )}

            {activeSection === 'generation' && (
              <div className="h-full flex flex-col">
                {coverLetter ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold text-gray-800">Generated Cover Letter</h2>
                      <div className="flex space-x-3">
                        <button 
                          onClick={downloadAsPDF}
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                          </svg>
                          Download PDF
                        </button>
                        <button 
  onClick={handleCopyToClipboard}
  className="inline-flex items-center px-4 py-2 border border-green-600 text-green-600 font-medium rounded-md hover:bg-green-50 transition-colors"
>
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"></path>
  </svg>
  {copySuccess ? 'Copied!' : 'Copy Text'}
</button>
                      </div>
                    </div>
                    
                    {/* Cover Letter Display */}
                    <div className="flex-grow bg-white border border-gray-200 rounded-lg p-6 mt-4 relative overflow-y-auto" ref={coverLetterRef}>
                      <div id="coverLetterContent" className="whitespace-pre-line text-gray-800">
                        {formatCoverLetter(coverLetter)}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={editCoverLetter}
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit Details
                      </button>
                      
                      <button
                        onClick={regenerateCoverLetter}
                        className="inline-flex items-center px-4 py-2 bg-white border border-green-600 text-green-600 font-medium rounded-md hover:bg-green-50 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Regenerate
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p className="text-lg">No cover letter generated yet</p>
                    <p className="text-sm mt-2">Fill in the job details and click "Generate Cover Letter"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;