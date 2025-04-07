import React from "react";
import { motion } from "framer-motion";
import interviewImage from "../assets/interview.png"; // Update path if needed
import { useNavigate } from "react-router-dom";
const InterviewPractice = () => {
  const navigate = useNavigate();
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section 1 */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16 bg-white">
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How to design your site footer like we did
          </h2>
          <p className="text-gray-600 mb-6">
            Learn the best practices of creating a user-friendly, modern footer layout.
            Discover design tips, tools, and examples that help enhance UX and conversion.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img src={interviewImage} alt="Footer Design" className="w-full max-w-md mx-auto" />
        </motion.div>
      </section>

      {/* Hero Section 2 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-white">
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img src={interviewImage} alt="Start Interview" className="w-full max-w-md mx-auto" />
        </motion.div>

        <motion.div
          className="md:w-1/2"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Practice Interview Questions Instantly
          </h2>
          <p className="text-gray-600 mb-6">
            Prepare for real-time interviews with AI-powered question sets, mock scenarios,
            and intelligent feedback to boost your confidence and performance.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg hover:cursor-pointer"
            onClick={()=>navigate("/practice")}
          >
            Start Practicing
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default InterviewPractice;
