import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import InterviewPractice from './components/InterviewPractice'
import InterviewPage from './components/InterviewPage'
import LandingPage from './components/LandingPage'
import LoginSignUp from './components/LoginSignUp'
import RegistrationForm from './components/RegistrationForm'
import Dashboard from './components/dashboard'
import LinkedInOptimization from './components/LinkedInOptimization'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/practice" element={<LandingPage/>} />
          <Route path="/auth" element={<LoginSignUp/>}/>
          <Route path='/auth/register' element={<RegistrationForm/>}/>
          <Route path='/auth/dashboard/:username' element={<Dashboard/>}/>
          <Route path='/auth/dashboard/:username/linkedin' element={<LinkedInOptimization/>}/>
        </Routes>
      </BrowserRouter>

      {/* Optional: this renders the component always, even outside of routing */}
      {/* <InterviewPractice/> */}
    </>
  )
}

export default App
