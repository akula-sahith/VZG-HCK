import { label } from "framer-motion/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const RegistrationForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userName:"",
    fullName: "",
    email: "",
    organization: "",
    role: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });
  
    try {
      const res = await axios.post("https://vzg-bck-1.onrender.com/api/register", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully", res.data);
      navigate("/auth"); // or navigate to /dashboard/${formData.email} if needed
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("Error submitting form.");
    }
  };

  return (
    <section className="min-h-screen bg-white-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Complete Your Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          encType="multipart/form-data"
        >
          {[
            { label: "Full Name", name: "fullName", type: "text" },
            {label:"User Name",name: "userName", type: "text"},
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "Organization", name: "organization", type: "text", placeholder: "Company or College"},
            { label: "Role/Title", name: "role", type: "text" , placeholder: "Student or developer etc"}, 
            { label: "Location", name: "location", type: "text" },
            { label: "LinkedIn Profile", name: "linkedin", type: "url", placeholder: "https://linkedin.com/in/your-profile" },
            { label: "GitHub Profile", name: "github", type: "url", placeholder: "https://github.com/your-username" },
          ].map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                required={field.name !== "company"}
                placeholder={field.placeholder || ""}
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 w-full h-12 rounded-md border-gray-300 shadow-sm px-4 text-base focus:ring-green-600 focus:border-green-600"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleChange}
              className="mt-1 block w-full h-12 text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:ring-green-600 focus:border-green-600 px-4"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 h-14 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition hover:cursor-pointer"
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
