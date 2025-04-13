import React, { useState } from 'react';
import ResumeDownload from './ResumeDownload';

const ResumeGenerator = () => {
  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',

    // Professional Summary
    professionalSummary: '',

    // Skills
    skills: [''],

    // Work Experience
    workExperience: [
      {
        company: '',
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: ['']
      }
    ],

    // Education
    education: [
      {
        institution: '',
        degree: '',
        field: '',
        location: '',
        graduationDate: '',
        gpa: '',
        achievements: ['']
      }
    ],

    // Projects
    projects: [
      {
        title: '',
        description: '',
        technologies: '',
        link: '',
        startDate: '',
        endDate: '',
        achievements: ['']
      }
    ],

    // Certifications
    certifications: [
      {
        name: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: '',
        credentialID: ''
      }
    ],

    // Languages
    languages: [
      {
        language: '',
        proficiency: 'Beginner' // Beginner, Intermediate, Advanced, Native
      }
    ],

    // Additional Information
    additionalInfo: ''
  });

  // Preview state
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  // Handle text input changes
  const handleChange = (e, section, index, field) => {
    const { name, value } = e.target;

    if (section) {
      if (field) {
        // Handle nested fields in sections (like workExperience.company)
        const newData = [...formData[section]];
        newData[index][field] = value;
        setFormData({ ...formData, [section]: newData });
      } else {
        // Handle array fields
        const newData = [...formData[section]];
        newData[index] = value;
        setFormData({ ...formData, [section]: newData });
      }
    } else {
      // Handle top-level fields
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e, section, index, field) => {
    const { checked } = e.target;
    const newData = [...formData[section]];
    newData[index][field] = checked;
    setFormData({ ...formData, [section]: newData });
  };

  // Add new item to an array section
  const addItem = (section, template) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], template]
    });
  };

  // Remove item from an array section
  const removeItem = (section, index) => {
    if (formData[section].length > 1) {
      const newData = [...formData[section]];
      newData.splice(index, 1);
      setFormData({ ...formData, [section]: newData });
    }
  };

  // Add achievement to a section item
  const addAchievement = (section, index) => {
    const newData = [...formData[section]];
    newData[index].achievements.push('');
    setFormData({ ...formData, [section]: newData });
  };

  // Remove achievement from a section item
  const removeAchievement = (section, index, achievementIndex) => {
    if (formData[section][index].achievements.length > 1) {
      const newData = [...formData[section]];
      newData[index].achievements.splice(achievementIndex, 1);
      setFormData({ ...formData, [section]: newData });
    }
  };

  // Handle achievement text change
  const handleAchievementChange = (e, section, index, achievementIndex) => {
    const { value } = e.target;
    const newData = [...formData[section]];
    newData[index].achievements[achievementIndex] = value;
    setFormData({ ...formData, [section]: newData });
  };

  // Add skill
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, '']
    });
  };

  // Remove skill
  const removeSkill = (index) => {
    if (formData.skills.length > 1) {
      const newSkills = [...formData.skills];
      newSkills.splice(index, 1);
      setFormData({ ...formData, skills: newSkills });
    }
  };

  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    setResumeData(formData);
    setShowPreview(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {showPreview ? (
        <ResumeDownload data={resumeData} onBack={() => setShowPreview(false)} />
      ) : (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#28a745]">
              Resume Builder
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-[#28a745]/80">
              Create a professional resume in minutes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number*</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="(123) 456-7890"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="12345"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">Portfolio/Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Professional Summary
              </h2>
              <div>
                <label htmlFor="professionalSummary" className="block text-sm font-medium text-gray-700">Summary*</label>
                <textarea
                  id="professionalSummary"
                  name="professionalSummary"
                  value={formData.professionalSummary}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Write a concise summary of your professional background and key strengths..."
                />
                <p className="mt-1 text-sm text-gray-500">Brief overview of your qualifications and career goals</p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Skills
                </h2>
                <button
                  type="button"
                  onClick={addSkill}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Skill
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleChange(e, 'skills', index)}
                      className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Project Management, JavaScript, Photoshop"
                    />
                    {formData.skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Work Experience
                </h2>
                <button
                  type="button"
                  onClick={() => addItem('workExperience', {
                    company: '',
                    title: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    description: '',
                    achievements: ['']
                  })}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Job
                </button>
              </div>

              {formData.workExperience.map((job, jobIndex) => (
                <div key={jobIndex} className="mb-6 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Job {jobIndex + 1}</h3>
                    {formData.workExperience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem('workExperience', jobIndex)}
                        className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company/Organization*</label>
                      <input
                        type="text"
                        value={job.company}
                        onChange={(e) => handleChange(e, 'workExperience', jobIndex, 'company')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Job Title*</label>
                      <input
                        type="text"
                        value={job.title}
                        onChange={(e) => handleChange(e, 'workExperience', jobIndex, 'title')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Your position"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        value={job.location}
                        onChange={(e) => handleChange(e, 'workExperience', jobIndex, 'location')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="City, State or Remote"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date*</label>
                      <input
                        type="month"
                        value={job.startDate}
                        onChange={(e) => handleChange(e, 'workExperience', jobIndex, 'startDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="month"
                        value={job.endDate}
                        onChange={(e) => handleChange(e, 'workExperience', jobIndex, 'endDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        disabled={job.current}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`current-job-${jobIndex}`}
                        checked={job.current}
                        onChange={(e) => handleCheckboxChange(e, 'workExperience', jobIndex, 'current')}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`current-job-${jobIndex}`} className="ml-2 block text-sm text-gray-700">
                        I currently work here
                      </label>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Job Description*</label>
                    <textarea
                      value={job.description}
                      onChange={(e) => handleChange(e, 'workExperience', jobIndex, 'description')}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Describe your responsibilities and duties..."
                    />
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
                      <button
                        type="button"
                        onClick={() => addAchievement('workExperience', jobIndex)}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Achievement
                      </button>
                    </div>

                    {job.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-center space-x-2 mt-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => handleAchievementChange(e, 'workExperience', jobIndex, achievementIndex)}
                          className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                          placeholder="e.g., Increased sales by 20% within first quarter"
                        />
                        {job.achievements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAchievement('workExperience', jobIndex, achievementIndex)}
                            className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  Education
                </h2>
                <button
                  type="button"
                  onClick={() => addItem('education', {
                    institution: '',
                    degree: '',
                    field: '',
                    location: '',
                    graduationDate: '',
                    gpa: '',
                    achievements: ['']
                  })}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Education
                </button>
              </div>

              {formData.education.map((edu, eduIndex) => (
                <div key={eduIndex} className="mb-6 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Education {eduIndex + 1}</h3>
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem('education', eduIndex)}
                        className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Institution/School*</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleChange(e, 'education', eduIndex, 'institution')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="University/College/School name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleChange(e, 'education', eduIndex, 'degree')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Bachelor of Science, High School Diploma"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => handleChange(e, 'education', eduIndex, 'field')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Computer Science, Business"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => handleChange(e, 'education', eduIndex, 'location')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Graduation Date</label>
                      <input
                        type="month"
                        value={edu.graduationDate}
                        onChange={(e) => handleChange(e, 'education', eduIndex, 'graduationDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">GPA</label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => handleChange(e, 'education', eduIndex, 'gpa')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., 3.8/4.0"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Achievements/Activities</label>
                      <button
                        type="button"
                        onClick={() => addAchievement('education', eduIndex)}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Achievement
                      </button>
                    </div>

                    {edu.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-center space-x-2 mt-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => handleAchievementChange(e, 'education', eduIndex, achievementIndex)}
                          className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                          placeholder="e.g., Dean's List, Student Government, Honor Society"
                        />
                        {edu.achievements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAchievement('education', eduIndex, achievementIndex)}
                            className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  Projects
                </h2>
                <button
                  type="button"
                  onClick={() => addItem('projects', {
                    title: '',
                    description: '',
                    technologies: '',
                    link: '',
                    startDate: '',
                    endDate: '',
                    achievements: ['']
                  })}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Project
                </button>
              </div>

              {formData.projects.map((project, projectIndex) => (
                <div key={projectIndex} className="mb-6 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Project {projectIndex + 1}</h3>
                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem('projects', projectIndex)}
                        className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Title*</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleChange(e, 'projects', projectIndex, 'title')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Project name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Technologies Used</label>
                      <input
                        type="text"
                        value={project.technologies}
                        onChange={(e) => handleChange(e, 'projects', projectIndex, 'technologies')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., React, Node.js, Python"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Link</label>
                      <input
                        type="url"
                        value={project.link}
                        onChange={(e) => handleChange(e, 'projects', projectIndex, 'link')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="https://github.com/yourusername/project"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Project Description*</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => handleChange(e, 'projects', projectIndex, 'description')}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Describe the project goals, your role, and outcomes.."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="month"
                        value={project.startDate}
                        onChange={(e) => handleChange(e, 'projects', projectIndex, 'startDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="month"
                        value={project.endDate}
                        onChange={(e) => handleChange(e, 'projects', projectIndex, 'endDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Key Achievements/Features</label>
                      <button
                        type="button"
                        onClick={() => addAchievement('projects', projectIndex)}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Achievement
                      </button>
                    </div>

                    {project.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-center space-x-2 mt-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => handleAchievementChange(e, 'projects', projectIndex, achievementIndex)}
                          className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                          placeholder="e.g., Implemented user authentication, Reduced load time by 40%"
                        />
                        {project.achievements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAchievement('projects', projectIndex, achievementIndex)}
                            className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Certifications
                </h2>
                <button
                  type="button"
                  onClick={() => addItem('certifications', {
                    name: '',
                    issuingOrganization: '',
                    issueDate: '',
                    expiryDate: '',
                    credentialID: ''
                  })}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Certification
                </button>
              </div>

              {formData.certifications.map((cert, certIndex) => (
                <div key={certIndex} className="mb-6 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Certification {certIndex + 1}</h3>
                    {formData.certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem('certifications', certIndex)}
                        className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Certification Name</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => handleChange(e, 'certifications', certIndex, 'name')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., AWS Certified Solutions Architect"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
                      <input
                        type="text"
                        value={cert.issuingOrganization}
                        onChange={(e) => handleChange(e, 'certifications', certIndex, 'issuingOrganization')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Amazon Web Services"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                      <input
                        type="month"
                        value={cert.issueDate}
                        onChange={(e) => handleChange(e, 'certifications', certIndex, 'issueDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input
                        type="month"
                        value={cert.expiryDate}
                        onChange={(e) => handleChange(e, 'certifications', certIndex, 'expiryDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Credential ID</label>
                      <input
                        type="text"
                        value={cert.credentialID}
                        onChange={(e) => handleChange(e, 'certifications', certIndex, 'credentialID')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., ABC123XYZ"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Languages
                </h2>
                <button
                  type="button"
                  onClick={() => addItem('languages', {
                    language: '',
                    proficiency: 'Beginner'
                  })}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Language
                </button>
              </div>

              {formData.languages.map((lang, langIndex) => (
                <div key={langIndex} className="mb-4 flex flex-wrap items-center space-x-4">
                  <div className="flex-grow min-w-0 md:w-1/3">
                    <label className="block text-sm font-medium text-gray-700">Language</label>
                    <input
                      type="text"
                      value={lang.language}
                      onChange={(e) => handleChange(e, 'languages', langIndex, 'language')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., English, Spanish, French"
                    />
                  </div>
                  <div className="flex-grow min-w-0 md:w-1/3">
                    <label className="block text-sm font-medium text-gray-700">Proficiency Level</label>
                    <select
                      value={lang.proficiency}
                      onChange={(e) => handleChange(e, 'languages', langIndex, 'proficiency')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Native">Native</option>
                    </select>
                  </div>
                  {formData.languages.length > 1 && (
                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={() => removeItem('languages', langIndex)}
                        className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Additional Information
              </h2>
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Other details you'd like to include</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Include any other relevant information such as volunteer work, awards, publications, etc."
                />
              </div>
            </div>

            {/* Form Controls */}
            <div className="flex justify-between">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset the form? All data will be lost.')) {
                    window.location.reload();
                  }
                }}
              >
                Reset Form
              </button>
              <div className="space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => {
                    setResumeData(formData);
                    setShowPreview(true);
                  }}
                >
                  Preview Resume
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Generate Resume
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResumeGenerator;