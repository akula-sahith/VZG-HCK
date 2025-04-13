import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import LoginSignUp from './components/LoginSignUp';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard'; 
import LinkedInOptimization from './components/LinkedInOptimization';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ResumeOptimization from './components/ResumeOptimization';
import OneClickApply from './components/OneClickApply';
import InterviewQuestionsGenerator from './components/InterviewQuestionsGenerator';
import ResumeGenerator from './components/ResumeGenerator';
import CoverLetterGenerator from './components/CoverletterGeneration';
import InterviewPracticeApp from './components/InterviewPracticeApp';
import EmotionalSupportChatbot from './components/EmotionalSupportChatbot';
import LinkedInJobSuggestions from './components/LinkedInJobSuggestions';
import PersonalizedChatbot from './components/PersonalizedChatbot';
import EmotionalThreedChatbot from './components/EmotionalThreedChatbot';
import { ChatProvider } from './hooks/useChat';
import ATSAnalyzer from './components/ATS';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/practice" element={<LandingPage />} />
          <Route path="/auth" element={<LoginSignUp />} />
          <Route path="/auth/register" element={<RegistrationForm />} />
          <Route
            path="/auth/dashboard/:username"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/dashboard/:username/resumeOptimization"
            element={
              <ProtectedRoute>
                <ResumeOptimization/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/dashboard/:username/LinkedInOptimization"
            element={
              <ProtectedRoute>
                <LinkedInOptimization/>
              </ProtectedRoute>
            }
          />
           <Route
            path="/auth/dashboard/:username/OneClickApply"
            element={
              <ProtectedRoute>
                <OneClickApply/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/dashboard/:username/AiInterviewQuestions"
            element={
              <ProtectedRoute>
                <InterviewQuestionsGenerator/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/dashboard/:username/ResumeGenerator"
            element={
              <ProtectedRoute>
                <ResumeGenerator/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/dashboard/:username/CoverLetterGenerator"
            element={
              <ProtectedRoute>
                 <CoverLetterGenerator/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/dashboard/:username/AiInterviewPractice"
            element={
              <ProtectedRoute>
                 <InterviewPracticeApp/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/dashboard/:username/EmotionalSupportChatbot"
            element={
              <ProtectedRoute>
                <ChatProvider>
      <EmotionalSupportChatbot/>
    </ChatProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/dashboard/:username/LinkedInJobSuggestions"
            element={
              <ProtectedRoute>
                 <LinkedInJobSuggestions/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/dashboard/:username/personalchatbot"
            element={
              <ProtectedRoute>
                 <PersonalizedChatbot/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/dashboard/:username/ats"
            element={
              <ProtectedRoute>
                 <ATSAnalyzer/>
              </ProtectedRoute>
            }
          />
          {/* <Route path="/lid" element={<LinkedInOptimization />} />
          <Route path="/ro" element={<ResumeOptimization/>}/> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
