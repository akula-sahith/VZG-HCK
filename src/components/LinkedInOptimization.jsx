import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, RefreshCw, Linkedin } from 'lucide-react';

const LinkedInSuggestions = () => {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('headline');
  const [appliedSuggestions, setAppliedSuggestions] = useState({});

  // Simulate fetching data from MongoDB
  useEffect(() => {
    // This would be an actual API call in production
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        // Simulated API response
        const response = {
          profile: {
            name: "Sahith",
            headline: "Software Developer",
            summary: "Experienced developer with 3+ years of experience in React and Node.js",
            skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
            experience: [
              {
                title: "Software Developer",
                company: "Tech Solutions Inc.",
                duration: "2020 - Present"
              }
            ]
          },
          suggestions: {
            headline: [
              "Senior Frontend Developer specializing in React and modern JavaScript frameworks",
              "Full Stack Software Engineer with expertise in MERN stack development",
              "Software Developer passionate about creating scalable web applications"
            ],
            summary: [
              "Results-driven Software Developer with 3+ years of experience building responsive web applications using React, Node.js, and MongoDB. Passionate about clean code and user-centered design.",
              "Versatile Software Developer with a proven track record of delivering high-quality web solutions. Experienced in full-stack development with particular focus on frontend technologies.",
              "Detail-oriented Software Developer with expertise in JavaScript ecosystem. Dedicated to continuous learning and implementing best practices in software development."
            ],
            skills: [
              ["JavaScript", "React", "Node.js", "MongoDB", "Express", "TypeScript", "Redux", "Git"],
              ["JavaScript", "React", "Next.js", "Node.js", "MongoDB", "RESTful APIs", "GraphQL"]
            ]
          }
        };
        
        setProfile(response.profile);
        setSuggestions(response.suggestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const applysuggestion = (section, suggestion) => {
    setAppliedSuggestions({
      ...appliedSuggestions,
      [section]: suggestion
    });
  };

  const refreshSuggestions = () => {
    setLoading(true);
    // This would be an actual API call to get new suggestions
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="w-full p-4 text-center">
        <RefreshCw className="w-8 h-8 text-green-500 animate-spin mx-auto" />
        <p className="mt-2 text-gray-500">Loading profile suggestions...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b pb-4">
        <div className="flex items-center">
          <Linkedin className="w-5 h-5 mr-2 text-blue-600" />
          <h2 className="text-xl font-semibold">LinkedIn Profile Suggestions</h2>
        </div>
        <button 
          className="bg-blue-50 text-blue-600 px-3 py-1 rounded flex items-center text-sm"
          onClick={refreshSuggestions}
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b">
          <button 
            className={`px-4 py-2 ${activeTab === 'headline' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('headline')}
          >
            Headline
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'summary' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'skills' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        {activeTab === 'headline' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Current Headline</h3>
              <div className="p-3 bg-gray-50 border rounded">{profile?.headline}</div>
            </div>
            
            <h3 className="text-sm font-medium text-gray-500 mb-2">Suggested Headlines</h3>
            <div className="space-y-3">
              {suggestions?.headline.map((suggestion, index) => (
                <div key={index} className="p-3 bg-gray-50 border rounded flex justify-between items-center">
                  <p>{suggestion}</p>
                  <button 
                    className={`px-3 py-1 rounded text-white flex items-center ${appliedSuggestions.headline === suggestion ? 'bg-green-600' : 'bg-blue-600'}`}
                    onClick={() => applysuggestion('headline', suggestion)}
                  >
                    {appliedSuggestions.headline === suggestion ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Applied
                      </>
                    ) : 'Apply'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Current Summary</h3>
              <div className="p-3 bg-gray-50 border rounded">{profile?.summary}</div>
            </div>
            
            <h3 className="text-sm font-medium text-gray-500 mb-2">Suggested Summaries</h3>
            <div className="space-y-3">
              {suggestions?.summary.map((suggestion, index) => (
                <div key={index} className="p-3 bg-gray-50 border rounded">
                  <p className="mb-3">{suggestion}</p>
                  <div className="flex justify-end">
                    <button 
                      className={`px-3 py-1 rounded text-white flex items-center ${appliedSuggestions.summary === suggestion ? 'bg-green-600' : 'bg-blue-600'}`}
                      onClick={() => applysuggestion('summary', suggestion)}
                    >
                      {appliedSuggestions.summary === suggestion ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Applied
                        </>
                      ) : 'Apply'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Current Skills</h3>
              <div className="p-3 bg-gray-50 border rounded flex flex-wrap gap-2">
                {profile?.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{skill}</span>
                ))}
              </div>
            </div>
            
            <h3 className="text-sm font-medium text-gray-500 mb-2">Suggested Skill Sets</h3>
            <div className="space-y-4">
              {suggestions?.skills.map((skillSet, index) => (
                <div key={index} className="p-3 bg-gray-50 border rounded">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skillSet.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{skill}</span>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button 
                      className={`px-3 py-1 rounded text-white flex items-center ${appliedSuggestions.skills === skillSet ? 'bg-green-600' : 'bg-blue-600'}`}
                      onClick={() => applysuggestion('skills', skillSet)}
                    >
                      {appliedSuggestions.skills === skillSet ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Applied
                        </>
                      ) : 'Apply'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInSuggestions;