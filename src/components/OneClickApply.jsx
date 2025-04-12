import { useState } from "react";
import { Send, Check, AlertCircle, Loader, Briefcase, BookOpen, Lock } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function OneClickApply() {
  const { username } = useParams()
  const [formData, setFormData] = useState({
    linkedinEmail: "",
    linkedinPassword: "",
    jobUrl: ""
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // const validateUrl = (url) => {
  //   const linkedInJobRegex = /^https:\/\/(www\.)?linkedin\.com\/jobs\/view\/.+/i;
  //   return linkedInJobRegex.test(url);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError("");
    
    // Validate form
    if (!formData.linkedinEmail.trim()) {
      setError("Please enter your LinkedIn email");
      return;
    }
    
    if (!formData.linkedinPassword.trim()) {
      setError("Please enter your LinkedIn password");
      return;
    }
    
    if (!formData.jobUrl.trim()) {
      setError("Please enter a LinkedIn job URL");
      return;
    }
    
    // if (!validateUrl(formData.jobUrl)) {
    //   setError("Please enter a valid LinkedIn job URL (e.g., https://www.linkedin.com/jobs/view/...)");
    //   return;
    // }
    
    // Show loading state
    setStatus("loading");
    
    try {
      // Send data to backend API using axios
      await axios.post(`http://127.0.0.1:8000//apply_job/${username}`, formData);
      
      // Set success state
      setStatus("success");
      
      // Reset after 3 seconds
      // setTimeout(() => {
      //   setStatus("idle");
      //   setFormData({
      //     email: "",
      //     password: "",
      //     jobUrl: ""
      //   });
      // }, 3000);
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.message || "Failed to apply to the job. Please try again.");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-green-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900"></h1>
            </div>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Profile</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Apply Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">One-Click Apply</h2>
                <p className="text-gray-600 mb-6">Streamline your job application process with our LinkedIn quick apply tool</p>
                
                <form onSubmit={handleSubmit}>
                  {/* LinkedIn Email Field */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn Email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="linkedinEmail"
                        type="email"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          error && !formData.email ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                        } focus:border-transparent focus:outline-none focus:ring-2 transition-all duration-200`}
                        placeholder="your-email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={status === "loading" || status === "success"}
                      />
                    </div>
                  </div>
                  
                  {/* LinkedIn Password Field */}
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="linkedinPassword"
                        type="password"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          error && !formData.password ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                        } focus:border-transparent focus:outline-none focus:ring-2 transition-all duration-200`}
                        placeholder="Your LinkedIn password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={status === "loading" || status === "success"}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 flex items-center">
                      <Lock size={12} className="mr-1" />
                      Your credentials are secure and only used for application purposes
                    </p>
                  </div>
                  
                  {/* Job URL Field */}
                  <div className="mb-6">
                    <label htmlFor="jobUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn Job URL
                    </label>
                    <div className="relative">
                      <input
                        id="jobUrl"
                        name="jobUrl"
                        type="url"
                        className={`w-full px-4 py-3 rounded-lg border ${
                           "border-gray-300 focus:ring-green-500"
                        } focus:border-transparent focus:outline-none focus:ring-2 transition-all duration-200`}
                        placeholder="https://www.linkedin.com/jobs/view/..."
                        value={formData.jobUrl}
                        onChange={handleChange}
                        disabled={status === "loading" || status === "success"}
                        aria-describedby={error ? "url-error" : undefined}
                      />
                    </div>
                    {error && (
                      <div className="flex items-center mt-2 text-red-600" id="url-error">
                        <AlertCircle size={16} className="mr-1" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className={`w-full flex justify-center items-center py-4 px-4 rounded-lg font-medium text-base transition-all duration-200 ${
                      status === "success"
                        ? "bg-green-100 text-green-700 cursor-default"
                        : status === "error"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                    disabled={status === "loading" || status === "success"}
                  >
                    {status === "idle" && (
                      <>
                        <Send size={18} className="mr-2" />
                        Apply Now
                      </>
                    )}
                    {status === "loading" && (
                      <>
                        <Loader size={18} className="mr-2 animate-spin" />
                        Applying...
                      </>
                    )}
                    {status === "success" && (
                      <>
                        <Check size={18} className="mr-2" />
                        Successfully Applied!
                      </>
                    )}
                    {status === "error" && (
                      <>
                        <AlertCircle size={18} className="mr-2" />
                        Try Again
                      </>
                    )}
                  </button>
                </form>
                
                {status === "success" && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg animate-fadeIn">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check size={24} className="text-green-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Application Successful</h3>
                        <div className="mt-1 text-sm text-green-700">
                          Your application has been submitted. You can check the status in your LinkedIn dashboard.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-sm text-gray-500 text-center">
                  This tool helps you quickly apply to jobs posted on LinkedIn. Your profile and resume will be used for the application.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Tips */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <h3 className="ml-2 text-lg font-semibold text-gray-800">Application Tips</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check size={16} className="mt-1 text-green-500" />
                    </div>
                    <p className="ml-2 text-sm text-gray-600">Make sure your LinkedIn profile is up-to-date</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check size={16} className="mt-1 text-green-500" />
                    </div>
                    <p className="ml-2 text-sm text-gray-600">Customize your resume before applying</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check size={16} className="mt-1 text-green-500" />
                    </div>
                    <p className="ml-2 text-sm text-gray-600">Follow up within a week if no response</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check size={16} className="mt-1 text-green-500" />
                    </div>
                    <p className="ml-2 text-sm text-gray-600">Research the company before interviews</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Frontend Developer at Acme Inc
                      </p>
                      <p className="text-xs text-gray-500">
                        Applied 2 days ago
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        New
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        UX Designer at TechCorp
                      </p>
                      <p className="text-xs text-gray-500">
                        Applied 5 days ago
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Interview
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
     <footer className="bg-white mt-12 border-t border-gray-200">
     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
       <div className="flex flex-col md:flex-row justify-between items-center">
         <p className="text-sm text-gray-500">© 2025 QuickApply. All rights reserved.</p>
         <div className="flex space-x-6 mt-4 md:mt-0">
           <a href="#" className="text-gray-400 hover:text-gray-500">
             <span className="sr-only">Privacy</span>
             <span className="text-sm">Privacy Policy</span>
           </a>
           <a href="#" className="text-gray-400 hover:text-gray-500">
             <span className="sr-only">Terms</span>
             <span className="text-sm">Terms of Service</span>
           </a>
           <a href="#" className="text-gray-400 hover:text-gray-500">
             <span className="sr-only">Contact</span>
             <span className="text-sm">Contact Us</span>
           </a>
         </div>
       </div>
     </div>
   </footer>
   </>
  );
}