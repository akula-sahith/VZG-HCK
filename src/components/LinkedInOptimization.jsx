import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  RefreshCw,
  Linkedin,
  Lightbulb,
  Award,
} from "lucide-react";
import { useParams } from "react-router-dom";

const LinkedInSuggestions = () => {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("headline");
  const [appliedSuggestions, setAppliedSuggestions] = useState({});
  const { username } = useParams();

  // Initialize with some dummy data instead of API calls
  useEffect(() => {
    setProfile({
      name: username || "User",
      headline: "Default headline",
      summary: "Default summary",
      skills: ["Skill 1", "Skill 2", "Skill 3"],
      experience: [],
    });

    setSuggestions({
      headline: [
        "Default headline suggestion 1",
        "Default headline suggestion 2",
      ],
      summary: ["Default summary suggestion 1", "Default summary suggestion 2"],
      skills: [
        ["Skill A", "Skill B", "Skill C"],
        ["Skill X", "Skill Y", "Skill Z"],
      ],
    });

    setLoading(false);
  }, [username]);

  const applySuggestion = (section, suggestion) => {
    setAppliedSuggestions({
      ...appliedSuggestions,
      [section]: suggestion,
    });
  };

  // Modified to include the actual API calls
  const refreshSuggestions = async () => {
    setLoading(true);
    try {
      // 1. Fetch current scraped LinkedIn profile data
      const profileRes = await fetch(
        `http://localhost:5000/api/linkedin/${username}`
      );
      const profileData = await profileRes.json();

      // 2. Fetch optimized suggestions for headline, summary, and skills
      const suggestionsRes = await fetch(
        `http://localhost:5000/api/linkedin-optimize/${username}`
      );
      const suggestionsData = await suggestionsRes.json();

      // 3. Set in state
      setProfile({
        name: username,
        headline: profileData.headline?.[0] || "",
        summary: profileData.summary?.[0] || "",
        skills: profileData.skills || [],
        experience: [], // You can update this later
      });

      setSuggestions(suggestionsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching LinkedIn profile or suggestions:", error);
      setLoading(false);
    }
  };

  // Custom Button Component
  const Button = ({ children, onClick, className, size }) => {
    const sizeClass = size === "sm" ? "text-sm py-1 px-3" : "py-2 px-4";
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-center rounded font-medium transition-colors ${sizeClass} ${className}`}
      >
        {children}
      </button>
    );
  };

  // Custom Card Component
  const Card = ({ children, className }) => {
    return (
      <div
        className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      >
        {children}
      </div>
    );
  };

  const CardHeader = ({ children, className }) => {
    return <div className={`p-4 ${className}`}>{children}</div>;
  };

  const CardContent = ({ children, className }) => {
    return <div className={`${className}`}>{children}</div>;
  };

  // Custom Tabs Component
  const Tabs = ({ children, className }) => {
    return <div className={`w-full ${className}`}>{children}</div>;
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-4xl p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="w-12 h-12 text-green-500 animate-spin" />
            <p className="text-gray-500 text-lg">
              Loading profile suggestions...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Overview */}
          <Card className="w-full md:w-1/3">
            <CardHeader className="border-b">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-3 mr-3">
                  <Linkedin className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold">LinkedIn Profile</h2>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-6">
                <h3 className="text-lg font-medium">{profile?.name}</h3>
                <p className="text-gray-500">{profile?.headline}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
                  Profile Completion
                </h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full w-3/4"></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  75% complete - Improve your profile with AI suggestions
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
                  Experience
                </h4>
                <div className="border-l-2 border-gray-200 pl-4 py-1">
                  {profile?.experience?.map((exp, index) => (
                    <div key={index} className="mb-3">
                      <h5 className="font-medium">{exp.title}</h5>
                      <p className="text-gray-500 text-sm">{exp.company}</p>
                      <p className="text-gray-400 text-xs">{exp.duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={refreshSuggestions}
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                <span>Get New Suggestions</span>
              </Button>
            </CardContent>
          </Card>

          {/* Suggestions Area */}
          <Card className="w-full md:w-2/3">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-3 mr-3">
                    <Lightbulb className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold">AI-Powered Suggestions</h2>
                </div>
                <div className="flex items-center bg-green-50 px-3 py-1 rounded text-sm text-green-700">
                  <Award className="w-4 h-4 mr-1" />
                  Premium Features
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs className="w-full">
                {/* Custom Tab Navigation */}
                <div className="w-full grid grid-cols-3 rounded-none border-b">
                  {["headline", "summary", "skills"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-3 text-center font-medium transition-colors ${
                        activeTab === tab
                          ? "border-b-2 border-green-500 text-green-600"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Headline Tab Content */}
                {activeTab === "headline" && (
                  <div className="p-6 space-y-6">
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                        Current Headline
                      </h3>
                      <p className="p-4 bg-gray-50 rounded border">
                        {profile?.headline}
                      </p>
                    </div>

                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                      AI-Enhanced Headlines
                    </h3>
                    <div className="space-y-4">
                      {suggestions?.headline.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-4 bg-green-50 border border-green-100 rounded flex justify-between items-center"
                        >
                          <p className="text-gray-800">{suggestion}</p>
                          <Button
                            size="sm"
                            className={`${
                              appliedSuggestions.headline === suggestion
                                ? "bg-green-600 text-white"
                                : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                            onClick={() =>
                              applySuggestion("headline", suggestion)
                            }
                          >
                            {appliedSuggestions.headline === suggestion ? (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                Applied
                              </>
                            ) : (
                              <>
                                <ArrowRight className="w-4 h-4 mr-1" />
                                Apply
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Summary Tab Content */}
                {activeTab === "summary" && (
                  <div className="p-6 space-y-6">
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                        Current Summary
                      </h3>
                      <p className="p-4 bg-gray-50 rounded border">
                        {profile?.summary}
                      </p>
                    </div>

                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                      AI-Enhanced Summaries
                    </h3>
                    <div className="space-y-4">
                      {suggestions?.summary.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-4 bg-green-50 border border-green-100 rounded"
                        >
                          <p className="text-gray-800 mb-4">{suggestion}</p>
                          <div className="flex justify-end">
                            <Button
                              size="sm"
                              className={`${
                                appliedSuggestions.summary === suggestion
                                  ? "bg-green-600 text-white"
                                  : "bg-green-500 hover:bg-green-600 text-white"
                              }`}
                              onClick={() =>
                                applySuggestion("summary", suggestion)
                              }
                            >
                              {appliedSuggestions.summary === suggestion ? (
                                <>
                                  <Check className="w-4 h-4 mr-1" />
                                  Applied
                                </>
                              ) : (
                                <>
                                  <ArrowRight className="w-4 h-4 mr-1" />
                                  Apply
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills Tab Content */}
                {activeTab === "skills" && (
                  <div className="p-6 space-y-6">
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                        Current Skills
                      </h3>
                      <div className="p-4 bg-gray-50 rounded border flex flex-wrap gap-2">
                        {profile?.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                      Suggested Skill Sets
                    </h3>
                    <div className="space-y-6">
                      {suggestions?.skills.map((skillSet, index) => (
                        <div
                          key={index}
                          className="p-4 bg-green-50 border border-green-100 rounded"
                        >
                          <div className="flex flex-wrap gap-2 mb-4">
                            {Array.isArray(suggestions?.skills) &&
                              suggestions.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-green-200 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                          <div className="flex justify-end">
                            <Button
                              size="sm"
                              className={`${
                                appliedSuggestions.skills === skillSet
                                  ? "bg-green-600 text-white"
                                  : "bg-green-500 hover:bg-green-600 text-white"
                              }`}
                              onClick={() =>
                                applySuggestion("skills", skillSet)
                              }
                            >
                              {appliedSuggestions.skills === skillSet ? (
                                <>
                                  <Check className="w-4 h-4 mr-1" />
                                  Applied
                                </>
                              ) : (
                                <>
                                  <ArrowRight className="w-4 h-4 mr-1" />
                                  Apply
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LinkedInSuggestions;
