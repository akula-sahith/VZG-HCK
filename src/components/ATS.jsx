import React, { useState, useEffect, useRef } from 'react';
import { FileText, Briefcase, Check, Download, Loader2, BarChart2, Star, Zap, Clock, ArrowRight, Upload, User, Eye, ChevronDown, X, PieChart, Award, ChevronLeft, Printer } from 'lucide-react';

const ATSAnalyzer = () => {
  // Reference to file input element
  const fileInputRef = useRef(null);
  const reportRef = useRef(null);
  
  // Mock user profile with existing resume
  const [userProfile, setUserProfile] = useState({
    name: "Sahith",
    resume: {
      fileName: "alex_johnson_resume.pdf",
      lastUpdated: "2025-03-15",
      content: ""
    }
  });
  
  // Pre-fill job description
  const defaultJobDescription = " "
  const [jobDescription, setJobDescription] = useState(defaultJobDescription);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('analyze');
  const [matchScore, setMatchScore] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [showResumePopup, setShowResumePopup] = useState(false);
  const [fileUploadStatus, setFileUploadStatus] = useState(''); // Status message for file uploads
  const [isUploading, setIsUploading] = useState(false); // Loading state for file uploads
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  
  // ATS scoring state - with predefined scores for the sample job description
  const [atsScore, setAtsScore] = useState({
    overall: null,
    skills: null,
    projects: null,
    experience: null
  });
  
  // ATS analysis report content
  const [atsReport, setAtsReport] = useState({
    title: "",
    overallScore: "",
    skillsMatching: {
      score: "",
      matched: [],
      suggestions: []
    },
    projectsMatching: {
      score: "",
      strengths: [],
      suggestions: []
    },
    experienceMatching: {
      score: "",
      goodPoints: [],
      suggestions: []
    },
    formatCompatibility: {
      score: "",
      positives: [],
      suggestions: []
    }
  });

  useEffect(() => {
    // Reset analysis when job description changes
    if (resumeAnalysis && jobDescription.trim() === '') {
      setResumeAnalysis(null);
      setMatchScore(null);
      setHasAnalyzed(false);
    }
  }, [jobDescription, resumeAnalysis]);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      alert('Please enter a job description');
      return;
    }

    setIsLoading(true);

    // Simulate API call with mock data
    setTimeout(() => {
      setIsLoading(false);
      setHasAnalyzed(true);
      
      // Set predefined ATS scores for the sample job description
      setAtsScore({
        overall: 82,
        skills: 80,
        projects: 75,
        experience: 70
      });
      
      // Set predefined report data
      setAtsReport({
        title: "Full Stack Developer - ATS Match Score: 82/100",
        overallScore: "82/100",
        skillsMatching: {
          score: "80%",
          matched: [
            "React.js, Node.js, MongoDB, JavaScript, Machine Learning – All solid core stack components.",
            "Soft skills and communication skills are well-presented (important for teamwork and collaboration).",
            "Firebase Auth is mentioned, which is a bonus."
          ],
          suggestions: [
            "Add: Express.js, REST APIs, Postman, Mongoose, Redux, Tailwind CSS, JWT, Git, CI/CD, Deployment (Render/Netlify/Vercel).",
            "Add: Version Control, Unit Testing, Docker (if known), API Integration, Error Handling."
          ]
        },
        projectsMatching: {
          score: "75%",
          strengths: [
            "Your hackathon project \"AI-Powered Career Guidance & Resume Assistance Platform\" is very relevant.",
            "Real-time problem-solving using React, ML, Resume Parsing aligns well with full-stack job expectations."
          ],
          suggestions: [
            "Quantify: \"Helped match resumes with jobs with 80% accuracy,\" or \"Improved job suggestion relevance by 30% using NLP models.\"",
            "Add at least one project that shows end-to-end development, e.g.: Login + Dashboard + Admin Panel + Database storage, APIs + Form submission + Data display",
            "Add deployment links or GitHub links if available."
          ]
        },
        experienceMatching: {
          score: "70%",
          goodPoints: [
            "Your Teachnook internship highlights React.js usage.",
            "Mentions frontend development, UI design — great for MERN."
          ],
          suggestions: [
            "Reframe like: → Developed and deployed frontend modules using React.js and integrated them with mock backend APIs. → Collaborated on API consumption and routing using React Router.",
            "Add any exposure to Node.js, Express, or MongoDB during the internship."
          ]
        },
        formatCompatibility: {
          score: "90%",
          positives: [
            "No distracting graphics or non-readable fonts.",
            "Clear section headings like Skills, Projects, Experience."
          ],
          suggestions: [
            "Just ensure consistent font size and bullet point alignment.",
            "ATS prefers plain formatting; you've done well here already."
          ]
        }
      });
      
      // Set basic resume analysis
      setResumeAnalysis({});
      setMatchScore({});
      
      // Go to ATS score tab
      setActiveTab('ats-score');
    }, 2000);
  };

  // File upload handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      setFileUploadStatus('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileUploadStatus('File size must be less than 5MB.');
      return;
    }
    
    // Upload file
    uploadFile(file);
  };
  
  const uploadFile = (file) => {
    setIsUploading(true);
    setFileUploadStatus('Uploading file...');
    
    // Simulate file upload with a timeout
    setTimeout(() => {
      setIsUploading(false);
      
      // Update user profile with the new resume
      setUserProfile(prev => ({
        ...prev,
        resume: {
          fileName: file.name,
          lastUpdated: new Date().toISOString().split('T')[0],
          content: "Sample content from uploaded resume would appear here."
        }
      }));
      
      setFileUploadStatus('Resume uploaded successfully!');
      
      // Clear status message after 3 seconds
      setTimeout(() => {
        setFileUploadStatus('');
      }, 3000);
    }, 1500);
  };

  const handleUploadResume = () => {
    // Trigger file input click
    fileInputRef.current.click();
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      // Check file type and size, then upload
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      
      if (!allowedTypes.includes(file.type)) {
        setFileUploadStatus('Please upload a PDF, DOC, DOCX, or TXT file.');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setFileUploadStatus('File size must be less than 5MB.');
        return;
      }
      
      uploadFile(file);
    }
  };
  
  const toggleResumePopup = () => {
    setShowResumePopup(!showResumePopup);
  };

  // Function to print/download report
  const printReport = () => {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>ATS Analysis Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 30px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #28a745;
              margin-bottom: 10px;
            }
            h1 {
              color: #28a745;
              border-bottom: 2px solid #28a745;
              padding-bottom: 10px;
            }
            h2 {
              color: #333;
              margin-top: 25px;
            }
            .score-summary {
              background-color: #f8f9fa;
              border: 1px solid #ddd;
              border-radius: 5px;
              padding: 15px;
              margin: 20px 0;
            }
            .score {
              font-size: 48px;
              font-weight: bold;
              color: #28a745;
              text-align: center;
            }
            .section {
              margin: 25px 0;
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #fff;
            }
            .section-title {
              font-weight: bold;
              font-size: 18px;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
            }
            .section-score {
              display: inline-block;
              margin-left: 10px;
              padding: 3px 10px;
              background-color: #28a745;
              color: white;
              border-radius: 20px;
            }
            ul {
              margin-top: 10px;
            }
            li {
              margin-bottom: 8px;
              list-style-type: none;
              padding-left: 20px;
              position: relative;
            }
            li:before {
              content: "•";
              position: absolute;
              left: 0;
              color: #28a745;
            }
            .suggestions {
              background-color: #f0f8ff;
              border-left: 4px solid #007bff;
              padding: 10px 15px;
              margin-top: 15px;
            }
            .strengths {
              background-color: #f0fff0;
              border-left: 4px solid #28a745;
              padding: 10px 15px;
              margin-top: 15px;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">ATS Analyzer</div>
            <p>Resume Analysis Report for ${userProfile.name}</p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <h1>ATS Analysis Report</h1>
          
          <div class="score-summary">
            <h2>Overall ATS Compatibility Score</h2>
            <div class="score">${atsScore.overall}%</div>
            <p style="text-align: center;">Based on analysis of your resume against the job description</p>
          </div>
          
          <div class="section">
            <div class="section-title">Skills Matching <span class="section-score">${atsScore.skills}%</span></div>
            <div class="strengths">
              <strong>Matched Skills:</strong>
              <ul>
                ${atsReport.skillsMatching.matched.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="suggestions">
              <strong>Suggestions:</strong>
              <ul>
                ${atsReport.skillsMatching.suggestions.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Projects Matching <span class="section-score">${atsScore.projects}%</span></div>
            <div class="strengths">
              <strong>Project Strengths:</strong>
              <ul>
                ${atsReport.projectsMatching.strengths.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="suggestions">
              <strong>Suggestions:</strong>
              <ul>
                ${atsReport.projectsMatching.suggestions.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Experience Matching <span class="section-score">${atsScore.experience}%</span></div>
            <div class="strengths">
              <strong>Good Points:</strong>
              <ul>
                ${atsReport.experienceMatching.goodPoints.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="suggestions">
              <strong>Suggestions:</strong>
              <ul>
                ${atsReport.experienceMatching.suggestions.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Format Compatibility <span class="section-score">${atsReport.formatCompatibility.score}</span></div>
            <div class="strengths">
              <strong>Positives:</strong>
              <ul>
                ${atsReport.formatCompatibility.positives.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="suggestions">
              <strong>Suggestions:</strong>
              <ul>
                ${atsReport.formatCompatibility.suggestions.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p>This report was automatically generated by ATS Analyzer. The analysis is based on keyword matching and ATS compatibility assessment.</p>
            <p>© 2025 ATS Analyzer</p>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Add a slight delay to ensure the content is rendered before printing
    setTimeout(() => {
      printWindow.print();
      // Close the window after printing (optional)
      // printWindow.close();
    }, 500);
  };

  // Animated circular progress component for ATS score
  const CircularProgress = ({ percentage, size = 120, strokeWidth = 10, color = "#28a745" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const dash = percentage ? (percentage * circumference) / 100 : 0;
    
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
          />
          {percentage !== null && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - dash}
              className="transition-all duration-1000 ease-out"
            />
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          {percentage !== null ? (
            <>
              <span className="text-2xl font-bold">{percentage}%</span>
              <span className="text-sm text-gray-500">ATS Score</span>
            </>
          ) : (
            <span className="text-sm text-gray-500">No data yet</span>
          )}
        </div>
      </div>
    );
  };

  // Mini progress component for section scores
  const MiniProgress = ({ label, percentage, color = "#28a745" }) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">
            {percentage !== null ? `${percentage}%` : 'No data'}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          {percentage !== null && (
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${percentage}%`, backgroundColor: color }}
            ></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        accept=".pdf,.doc,.docx,.txt"
      />
      
      {/* Resume Popup */}
      {showResumePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <button 
              onClick={toggleResumePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">Your Current Resume</h3>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">{userProfile.resume.fileName}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded bg-white p-4">
                <p className="text-gray-800">
                  {userProfile.resume.content || "No resume content available."}
                </p>
              </div>
            </div>
            
            {/* File upload area in popup */}
            <div 
              className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop your resume here, or</p>
                <button
                  onClick={handleUploadResume}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-colors"
                >
                  Browse Files
                </button>
                <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX, TXT (Max: 5MB)</p>
                
                {fileUploadStatus && (
                  <div className={`mt-3 text-sm ${fileUploadStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {fileUploadStatus}
                  </div>
                )}
             
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white rounded-xl shadow-md p-6 mb-8 relative">
        <h1 className="text-3xl font-bold text-center mb-2">Applicant Tracking System</h1>
        <p className="text-center text-gray-600">Analyze your resume against job descriptions to improve your chances of passing ATS screenings</p>
        
        {/* Simplified profile indicator in top right corner */}
        <div className="absolute top-6 right-6">
          <div className="flex items-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg transition-colors">
            <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center text-white">
              {userProfile.name.charAt(0)}
            </div>
            <span className="font-medium">{userProfile.name}</span>
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-3">ATS TOOLS</h4>
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('analyze')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'analyze' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>Resume Analysis</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('ats-score')}
                  disabled={!hasAnalyzed}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'ats-score' ? 'bg-green-50 text-green-700' : hasAnalyzed ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <PieChart className="h-5 w-5" />
                  <span>ATS Score</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('results')}
                  disabled={!hasAnalyzed}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'results' ? 'bg-green-50 text-green-700' : hasAnalyzed ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <BarChart2 className="h-5 w-5" />
                  <span>ATS Report</span>
                </button>
              </nav>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500">RECENT ATS ANALYSES</h4>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium">Data Analyst</div>
                  <div className="text-xs text-gray-500">April 8, 2025</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium">Machine Learning Engineer</div>
                  <div className="text-xs text-gray-500">April 2, 2025</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium">Product Manager</div>
                  <div className="text-xs text-gray-500">March 25, 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            {activeTab === 'analyze' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Upload Resume for ATS Analysis</h3>
                      <p className="text-sm text-gray-500">
                        Last updated: {userProfile.resume?.lastUpdated || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={toggleResumePopup}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg border border-green-200 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Your Current Resume</span>
                  </button>
                  
                  <button
                    onClick={handleUploadResume}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload Resume</span>
                  </button>
                </div>
                
                {/* Job Description Input */}
                <div className="space-y-4 mt-8">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-medium">Job Description</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Paste the job description to analyze how well your resume matches the requirements
                  </p>
                  <textarea
                    value={jobDescription}
                    onChange={handleJobDescriptionChange}
                    placeholder="Paste job description here..."
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  ></textarea>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || !jobDescription.trim()}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg shadow transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <BarChart2 className="mr-2 h-5 w-5" />
                        Analyze Resume
                      </>
                    )}
                  </button>
                </div>
                
                <button 
                  onClick={() => setShowTips(!showTips)}
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                >
                  {showTips ? 'Hide Tips' : 'Show ATS Tips'}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
                
                {showTips && (
                  <div className="bg-blue-50 rounded-lg p-4 animate-fadeIn">
                  <h4 className="font-medium text-blue-800 mb-3">ATS Compatibility Tips</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                      Use simple formatting without tables, headers/footers, or special characters
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                      Include keywords from the job description in your resume
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                      Use standard section headings like "Experience," "Education," "Skills"
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                      Save your resume as a .docx or .pdf file
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                      Quantify achievements with numbers when possible
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'ats-score' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-full">
                  <BarChart2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium">ATS Compatibility Score</h3>
              </div>
              
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                {/* Overall ATS Score */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1 flex flex-col items-center">
                  <h4 className="text-center text-gray-700 font-medium mb-4">Overall ATS Score</h4>
                  <CircularProgress percentage={atsScore.overall} size={180} strokeWidth={15} />
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      {atsScore.overall > 80 
                        ? "Great match! Your resume is well-optimized for this job."
                        : atsScore.overall > 60
                        ? "Good start. Some improvements can increase your chances."
                        : "Your resume needs significant optimization for this role."}
                    </p>
                  </div>
                </div>
                
                {/* Score Breakdown */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1">
                  <h4 className="text-gray-700 font-medium mb-4">Score Breakdown</h4>
                  <div className="space-y-5">
                    <MiniProgress 
                      label="Skills Match" 
                      percentage={atsScore.skills} 
                      color="#4CAF50"
                    />
                    <MiniProgress 
                      label="Projects Match" 
                      percentage={atsScore.projects} 
                      color="#2196F3"
                    />
                    <MiniProgress 
                      label="Experience Match" 
                      percentage={atsScore.experience} 
                      color="#FF9800"
                    />
                    <MiniProgress 
                      label="Format Compatibility" 
                      percentage={atsReport.formatCompatibility.score ? parseInt(atsReport.formatCompatibility.score) : null} 
                      color="#9C27B0"
                    />
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={() => setActiveTab('results')}
                      className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Full Report</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex space-x-3">
                  <div className="text-yellow-600">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Quick Improvement Tips</h4>
                    <p className="text-sm text-yellow-700">
                      Based on your score, we recommend focusing on adding more relevant skills and quantifying your project achievements to increase your ATS compatibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'results' && (
            <div className="space-y-6" ref={reportRef}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium">ATS Analysis Report</h3>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setActiveTab('ats-score')}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back to Score</span>
                  </button>
                  
                  <button
                    onClick={printReport}
                    className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Report</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h4 className="text-xl font-medium text-green-700">{atsReport.title}</h4>
                  <p className="text-gray-600 mt-1">
                    Resume analyzed for: {userProfile.name} • Generated on {new Date().toLocaleDateString()}
                  </p>
                </div>
                
                <div className="space-y-8">
                  {/* Skills Matching Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Star className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="text-lg font-medium">Skills Matching</h4>
                      <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                        {atsReport.skillsMatching.score}
                      </span>
                    </div>
                    
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <h5 className="font-medium text-green-800 mb-2">Matched Skills</h5>
                      <ul className="space-y-2">
                        {atsReport.skillsMatching.matched.map((item, index) => (
                          <li key={`skill-match-${index}`} className="flex items-start text-green-700">
                            <Check className="h-4 w-4 mr-2 mt-1 text-green-600 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <h5 className="font-medium text-blue-800 mb-2">Suggestions</h5>
                      <ul className="space-y-2">
                        {atsReport.skillsMatching.suggestions.map((item, index) => (
                          <li key={`skill-sugg-${index}`} className="flex items-start text-blue-700">
                            <Plus className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Projects Matching Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-medium">Projects Matching</h4>
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {atsReport.projectsMatching.score}
                      </span>
                    </div>
                    
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <h5 className="font-medium text-green-800 mb-2">Project Strengths</h5>
                      <ul className="space-y-2">
                        {atsReport.projectsMatching.strengths.map((item, index) => (
                          <li key={`proj-str-${index}`} className="flex items-start text-green-700">
                            <Check className="h-4 w-4 mr-2 mt-1 text-green-600 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <h5 className="font-medium text-blue-800 mb-2">Suggestions</h5>
                      <ul className="space-y-2">
                        {atsReport.projectsMatching.suggestions.map((item, index) => (
                          <li key={`proj-sugg-${index}`} className="flex items-start text-blue-700">
                            <Plus className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Experience Matching Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-full">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <h4 className="text-lg font-medium">Experience Matching</h4>
                      <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">
                        {atsReport.experienceMatching.score}
                      </span>
                    </div>
                    
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <h5 className="font-medium text-green-800 mb-2">Good Points</h5>
                      <ul className="space-y-2">
                        {atsReport.experienceMatching.goodPoints.map((item, index) => (
                          <li key={`exp-good-${index}`} className="flex items-start text-green-700">
                            <Check className="h-4 w-4 mr-2 mt-1 text-green-600 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <h5 className="font-medium text-blue-800 mb-2">Suggestions</h5>
                      <ul className="space-y-2">
                        {atsReport.experienceMatching.suggestions.map((item, index) => (
                          <li key={`exp-sugg-${index}`} className="flex items-start text-blue-700">
                            <Plus className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Format Compatibility Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <h4 className="text-lg font-medium">Format Compatibility</h4>
                      <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                        {atsReport.formatCompatibility.score}
                      </span>
                    </div>
                    
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <h5 className="font-medium text-green-800 mb-2">Positives</h5>
                      <ul className="space-y-2">
                        {atsReport.formatCompatibility.positives.map((item, index) => (
                          <li key={`format-pos-${index}`} className="flex items-start text-green-700">
                            <Check className="h-4 w-4 mr-2 mt-1 text-green-600 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <h5 className="font-medium text-blue-800 mb-2">Suggestions</h5>
                      <ul className="space-y-2">
                        {atsReport.formatCompatibility.suggestions.map((item, index) => (
                          <li key={`format-sugg-${index}`} className="flex items-start text-blue-700">
                            <Plus className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

// Add Plus icon definition since it was missing in the original imports but used in the code
const Plus = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
  <line x1="12" y1="5" x2="12" y2="19"></line>
  <line x1="5" y1="12" x2="19" y2="12"></line>
</svg>
);

export default ATSAnalyzer;