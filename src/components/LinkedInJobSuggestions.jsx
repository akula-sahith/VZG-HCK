import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Building, Star, Clock, ChevronRight, Filter, Search } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// API call to fetch job suggestions based on the username
const fetchJobSuggestions = async (username) => {
  try {
    const response = await axios.get(`https://vzg-bck-1.onrender.com/api/jobSuggestions/${username}`);
    return response.data.jobs;
  } catch (error) {
    console.error("Error fetching job suggestions:", error);
    return [];
  }
};

export default function LinkedInJobSuggestions() {
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { username } = useParams() 
  useEffect(() => {
    const loadJobs = async () => {
      const jobs = await fetchJobSuggestions(username);
      setJobSuggestions(jobs);
      setFilteredJobs(jobs);
      setLoading(false);
    };
    
    loadJobs();
  }, [username]);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredJobs(jobSuggestions);
    } else {
      const filtered = jobSuggestions.filter(job =>
        job.title.toLowerCase().includes(term.toLowerCase()) ||
        job.company.toLowerCase().includes(term.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredJobs(filtered);
    }
  };

  const getMatchColor = (match) => {
    if (match >= 90) return "text-green-700";
    if (match >= 80) return "text-green-600";
    return "text-green-500";
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-green-800">LinkedIn Job Suggestions</h1>
        <p className="text-gray-600">Personalized job recommendations based on your resume</p>
      </div>

      <div className="flex mb-6 items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5"
            placeholder="Search jobs by title, company, or skill"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button className="ml-3 inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-green-300">
          <Filter className="h-5 w-5 mr-2" />
          Filter
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} className="border border-gray-200 hover:border-green-300 p-4 rounded-lg transition-colors duration-200 bg-white hover:bg-green-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Building className="h-4 w-4 mr-1" />
                      <span className="mr-4">{job.company}</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className={`flex items-center ${getMatchColor(job.match)} font-bold`}>
                    <Star className="h-5 w-5 mr-1" />
                    {job.match}% Match
                  </div>
                </div>
                
                <div className="mt-3 text-gray-700">{job.description}</div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <span key={skill} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    Posted {job.posted}
                  </div>
                  <div>
                    <span className="text-green-600 font-medium mr-4">{job.salary}</span>
                    <button className="inline-flex items-center text-sm font-medium text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md focus:ring-4 focus:ring-green-300">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No job matches found. Try adjusting your search terms.
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-center border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-500">Showing jobs that match your profile based on skills and experience</p>
        <button className="mt-2 text-green-700 hover:text-green-800 font-medium text-sm focus:outline-none">
          See more recommendations →
        </button>
      </div>
    </div>
  );
}
