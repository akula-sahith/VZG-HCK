import React from 'react';

const ResumeDownload = ({ data, onBack }) => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg print:p-0 print:shadow-none">
      {/* Print-specific styling */}
      <style>
        {`
          @media print {
            body {
              background: white;
            }
            .no-print {
              display: none;
            }
            .print-section {
              page-break-inside: avoid;
            }
          }
        `}
      </style>

      {/* Header with buttons */}
      <div className="no-print flex justify-between mb-8">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          ← Back to Editor
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Download PDF
        </button>
      </div>

      {/* Resume Content */}
      <div className="space-y-8 print:space-y-6">
        {/* Personal Information */}
        <div className="print-section">
          <h1 className="text-3xl font-bold text-gray-800">
            {data.firstName} {data.lastName}
          </h1>
          <div className="flex flex-wrap gap-x-4 text-gray-600 mt-2">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.website && (
              <a href={data.website} className="text-blue-600 hover:underline">
                {data.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
          {(data.address || data.city || data.state || data.zipCode) && (
            <div className="text-gray-600">
              {[data.address, data.city, data.state, data.zipCode].filter(Boolean).join(', ')}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {data.professionalSummary && (
          <div className="print-section">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-1 mb-2 text-gray-700">
              Summary
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{data.professionalSummary}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills.filter(skill => skill.trim()).length > 0 && (
          <div className="print-section">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-1 mb-2 text-gray-700">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.filter(skill => skill.trim()).map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience.filter(exp => exp.company.trim()).length > 0 && (
          <div className="print-section">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-1 mb-2 text-gray-700">
              Work Experience
            </h2>
            {data.workExperience
              .filter(exp => exp.company.trim())
              .map((exp, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                      <p className="text-gray-700">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                      {exp.location && <p className="text-gray-600">{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.description}</p>
                  )}
                  {exp.achievements.filter(a => a.trim()).length > 0 && (
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      {exp.achievements
                        .filter(a => a.trim())
                        .map((achievement, aIndex) => (
                          <li key={aIndex} className="text-gray-700">
                            {achievement}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Education */}
        {data.education.filter(edu => edu.institution.trim()).length > 0 && (
          <div className="print-section">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-1 mb-2 text-gray-700">
              Education
            </h2>
            {data.education
              .filter(edu => edu.institution.trim())
              .map((edu, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-gray-700">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      {edu.graduationDate && (
                        <p className="text-gray-600">Graduated: {edu.graduationDate}</p>
                      )}
                      {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                  {edu.achievements.filter(a => a.trim()).length > 0 && (
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      {edu.achievements
                        .filter(a => a.trim())
                        .map((achievement, aIndex) => (
                          <li key={aIndex} className="text-gray-700">
                            {achievement}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.filter(proj => proj.title.trim()).length > 0 && (
          <div className="print-section">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-1 mb-2 text-gray-700">
              Projects
            </h2>
            {data.projects
              .filter(proj => proj.title.trim())
              .map((proj, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{proj.title}</h3>
                      {proj.technologies && (
                        <p className="text-gray-600 text-sm">
                          Technologies: {proj.technologies}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {proj.startDate && proj.endDate && (
                        <p className="text-gray-600">
                          {proj.startDate} - {proj.endDate}
                        </p>
                      )}
                    </div>
                  </div>
                  {proj.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">{proj.description}</p>
                  )}
                  {proj.link && (
                    <a
                      href={proj.link}
                      className="text-blue-600 hover:underline text-sm inline-block mt-1"
                    >
                      View Project
                    </a>
                  )}
                  {proj.achievements.filter(a => a.trim()).length > 0 && (
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      {proj.achievements
                        .filter(a => a.trim())
                        .map((achievement, aIndex) => (
                          <li key={aIndex} className="text-gray-700">
                            {achievement}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Certifications */}
        {data.certifications.filter(cert => cert.name.trim()).length > 0 && (
          <div className="print-section">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-1 mb-2 text-gray-700">
              Certifications
            </h2>
            <ul className="space-y-4">
              {data.certifications
                .filter(cert => cert.name.trim())
                .map((cert, index) => (
                  <li key={index}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">{cert.name}</h3>
                        <p className="text-gray-600 text-sm">{cert.issuingOrganization}</p>
                      </div>
                      <div className="text-right">
                        {cert.issueDate && (
                          <p className="text-gray-600 text-sm">
                            Issued: {cert.issueDate}
                            {cert.expiryDate && ` - Expires: ${cert.expiryDate}`}
                          </p>
                        )}
                      </div>
                    </div>
                    {cert.credentialID && (
                      <p className="text-gray-500 text-sm mt-1">
                        Credential ID: {cert.credentialID}
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {data.languages.filter(lang => lang.language.trim()).length > 0 && (
          <div className="print-section">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-1 mb-2 text-gray-700">
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {data.languages
                .filter(lang => lang.language.trim())
                .map((lang, index) => (
                  <div key={index}>
                    <span className="font-medium text-gray-800">{lang.language}</span>
                    <span className="text-gray-600 text-sm ml-1">({lang.proficiency})</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        {data.additionalInfo && (
          <div className="print-section">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-1 mb-2 text-gray-700">
              Additional Information
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{data.additionalInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeDownload;