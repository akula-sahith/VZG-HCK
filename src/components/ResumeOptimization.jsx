import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Briefcase,
  Check,
  Download,
  Loader2,
  BarChart2,
  Star,
  Zap,
  Clock,
  ArrowRight,
  Upload,
  User,
  Eye,
  ChevronDown,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const ResumeOptimization = () => {
  // Reference to file input element
  const fileInputRef = useRef(null);
  const { username } = useParams();
  const navigate = useNavigate();
  // Mock user profile with existing resume
  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    resume: {
      fileName: "alex_johnson_resume.pdf",
      fullPath: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/getdetails/${username}`
        );
        console.log("User Info:", res.data);

        // Update state with fetched resume and username
        setUserProfile({
          name: res.data.userName,
          resume: {
            fileName: res.data.resumePath.split("/").pop(), // Just filename
            fullPath: `http://localhost:5000/${res.data.resumePath}`, // Full viewable path
          },
        });
      } catch (error) {
        console.error("User not found:", error);
        alert("User not found");
        navigate("/"); // Optional: navigate to home or login
      }
    };

    if (username) fetchUserData();
  }, [username, navigate]);

  const handleViewResume = () => {
    if (userProfile.resume?.fullPath) {
      window.open(userProfile.resume.fullPath, "_blank");
    } else {
      alert("No resume found");
    }
  };

  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [optimizedResume, setOptimizedResume] = useState(null);
  const [activeTab, setActiveTab] = useState("optimize");
  const [matchScore, setMatchScore] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [showResumePopup, setShowResumePopup] = useState(false);
  const [fileUploadStatus, setFileUploadStatus] = useState(""); // Status message for file uploads
  const [isUploading, setIsUploading] = useState(false); // Loading state for file uploads

  useEffect(() => {
    // Reset optimization when job description changes
    if (optimizedResume && jobDescription.trim() === "") {
      setOptimizedResume(null);
      setMatchScore(null);
    }
  }, [jobDescription]);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/${username}/optimize`,
        {
          jobDescription: jobDescription,
        }
      );

      console.log("Optimization result:", res.data);
      setIsLoading(false);
      setOptimizedResume(res.data); // Store everything
      setMatchScore(res.data.matchScores); // Scores separately
      setActiveTab("stats");
    } catch (error) {
      console.error("Resume optimization failed:", error);
      setIsLoading(false);
      alert("Failed to optimize resume. Try again.");
    }
  };

  // File upload handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowedTypes.includes(file.type)) {
      setFileUploadStatus("Please upload a PDF, DOC, DOCX, or TXT file.");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileUploadStatus("File size must be less than 5MB.");
      return;
    }

    // Upload file
    uploadFile(file);
  };

  const uploadFile = (file) => {
    setIsUploading(true);
    setFileUploadStatus("Uploading file...");

    // Simulate file upload with a timeout
    setTimeout(() => {
      setIsUploading(false);

      // Update user profile with the new resume
      setUserProfile((prev) => ({
        ...prev,
        resume: {
          fileName: file.name,
          lastUpdated: new Date().toISOString().split("T")[0],
          content: "Sample content from uploaded resume would appear here.",
        },
      }));

      setFileUploadStatus("Resume uploaded successfully!");

      // Clear status message after 3 seconds
      setTimeout(() => {
        setFileUploadStatus("");
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
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (!allowedTypes.includes(file.type)) {
        setFileUploadStatus("Please upload a PDF, DOC, DOCX, or TXT file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setFileUploadStatus("File size must be less than 5MB.");
        return;
      }

      uploadFile(file);
    }
  };

  const handleViewOptimizedResume = () => {
    setActiveTab("results");
  };

  const toggleResumePopup = () => {
    setShowResumePopup(!showResumePopup);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".pdf,.doc,.docx,.txt"
      />

      <header className="bg-white rounded-xl shadow-md p-6 mb-8 relative">
        <h1 className="text-3xl font-bold text-center mb-2">
          Resume Optimizer
        </h1>
        <p className="text-center text-gray-600">
          Tailor your resume to match job requirements and increase your chances
          of getting hired
        </p>

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
              <h4 className="text-sm font-medium text-gray-500 mb-3">
                RESUME TOOLS
              </h4>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("optimize")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "optimize"
                      ? "bg-green-50 text-green-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>Current Resume</span>
                </button>

                <button
                  onClick={() => setActiveTab("results")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "results"
                      ? "bg-green-50 text-green-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Zap className="h-5 w-5" />
                  <span>Optimized Resume</span>
                </button>

                <button
                  onClick={() => setActiveTab("stats")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "stats"
                      ? "bg-green-50 text-green-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <BarChart2 className="h-5 w-5" />
                  <span>Analysis</span>
                </button>
              </nav>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500">
                  RECENT OPTIMIZATIONS
                </h4>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium">Frontend Developer</div>
                  <div className="text-xs text-gray-500">April 3, 2025</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium">React Developer</div>
                  <div className="text-xs text-gray-500">March 27, 2025</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium">Software Engineer</div>
                  <div className="text-xs text-gray-500">March 15, 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            {activeTab === "optimize" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        Your Current Resume
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleViewResume}
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
                    <span>Update Resume</span>
                  </button>
                </div>

                {/* Drag and drop area */}

                {/* Job Description Input */}
                <div className="space-y-4 mt-8">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-medium">Job Description</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Paste the job description to tailor your resume for the
                    position
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
                        Optimizing Resume...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Optimize Resume
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={() => setShowTips(!showTips)}
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                >
                  {showTips ? "Hide Tips" : "Show Resume Tips"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>

                {showTips && (
                  <div className="bg-blue-50 rounded-lg p-4 animate-fadeIn">
                    <h4 className="font-medium text-blue-800 mb-3">
                      Resume Optimization Tips
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-1 text-green-500" />
                        Match keywords from the job description
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-1 text-green-500" />
                        Quantify your achievements with numbers
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-1 text-green-500" />
                        Highlight relevant skills and experience
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-1 text-green-500" />
                        Remove irrelevant information
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "results" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium">Optimized Resume</h3>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setActiveTab("stats")}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-colors"
                    >
                      <BarChart2 className="h-4 w-4" />
                      <span>View Analysis</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">
                      Your Optimized Resume
                    </h4>
                    <p className="text-gray-600">
                      This version of your resume has been tailored to match the
                      job description requirements
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="text-gray-800">
                      {optimizedResume ? (
                        <p>Optimized resume content would appear here</p>
                      ) : (
                        <p className="text-center text-gray-500">
                          Please optimize your resume to see results
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-800">
                      Key Optimizations
                    </h4>
                  </div>
                  <p className="text-sm text-green-700">
                    Your resume has been optimized based on the job description.
                    Check the Analysis tab for detailed information.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-full">
                    <BarChart2 className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium">Resume Analysis</h3>
                </div>

                {/* Comparison Analysis */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
                  <h4 className="text-lg font-medium mb-4">
                    Skills Gap Analysis
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

    {/* Resume Skills */}
    <div>
      <h5 className="text-md font-semibold text-gray-700 mb-2">✅ Your Resume Skills</h5>
      <div className="flex flex-wrap gap-2 mt-2">
        {optimizedResume?.resumeSkills?.length > 0 ? (
          optimizedResume.resumeSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-800 font-medium rounded-full text-sm shadow-sm"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-sm text-gray-400 italic">No skills found in resume.</span>
        )}
      </div>
    </div>

    {/* JD Skills */}
    <div>
      <h5 className="text-md font-semibold text-gray-700 mb-2">📋 Job Description Skills</h5>
      <div className="flex flex-wrap gap-2 mt-2">
        {optimizedResume?.jdSkills?.length > 0 ? (
          optimizedResume.jdSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 font-medium rounded-full text-sm shadow-sm"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-sm text-gray-400 italic">No skills found in job description.</span>
        )}
      </div>
    </div>
  </div>

  {/* Missing Skills */}
  <div>
    <h5 className="text-md font-semibold text-gray-700 mb-3">❗ Missing Skills (Add These)</h5>
    <div className="flex flex-wrap gap-2 mt-2">
      {optimizedResume?.missingSkills?.length > 0 ? (
        optimizedResume.missingSkills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-red-100 text-red-700 font-medium rounded-full text-sm shadow-sm"
          >
            {skill}
          </span>
        ))
      ) : (
        <span className="text-sm text-green-600 font-medium">Awesome! Your resume covers all required skills.</span>
      )}
    </div>
  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h5 className="text-sm font-medium mb-2 text-gray-700">
                        Skills Match
                      </h5>
                      <div className="text-xl font-bold mb-1 text-gray-800">
                        {matchScore?.skillsMatch ?? "--"}%
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gray-400"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h5 className="text-sm font-medium mb-2 text-gray-700">
                        Experience Match
                      </h5>
                      <div className="text-xl font-bold mb-1 text-gray-800">
                        {matchScore?.experienceMatch ?? "--"}%
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gray-400"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h5 className="text-sm font-medium mb-2 text-gray-700">
                        Keyword Match
                      </h5>
                      <div className="text-xl font-bold mb-1 text-gray-800">
                        {matchScore?.keywordMatch ?? "--"}%
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gray-400"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* View Optimized Resume Button */}
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleViewOptimizedResume}
                      className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-colors"
                    >
                      <Zap className="h-5 w-5" />
                      <span>View Optimized Resume</span>
                    </button>
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

// Add this to your CSS or in a style tag
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
`;
export default ResumeOptimization;
