import React, { useState, useRef, useEffect } from 'react';
import {auth,googleProvider} from './firebase'
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import axios from 'axios';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [highlightStyle, setHighlightStyle] = useState({});
  const [username, setUsername] = useState("");
  const signupButtonRef = useRef(null);
  const signinButtonRef = useRef(null);
  const navigate = useNavigate();
  
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User Info:", user);
      // Optional: Save to your DB, redirect, etc.
    } catch (error) {
      console.error("Google Auth Error:", error.message);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        try {
          const res = await axios.get(`http://localhost:5000/api/user/${email}`);
          const fetchedUsername = res.data;
          console.log("User Info:", fetchedUsername);
          alert("Login Successful");
          navigate(`/auth/dashboard/${fetchedUsername}`);
        } catch (error) {
          console.error("User not found.");
        }
      } catch (error) {
        console.error("Sign-in Error:", error.message);
      }
    }
  };
  

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/auth/register")
          // Optional: Save to your DB, redirect, etc.
        } catch (error) {
          console.error("Sign-up Error:", error.message);
        }
      } else {
        console.error("Passwords do not match.");
      }
    }
  }

  // Set initial highlight position
  useEffect(() => {
    if (signinButtonRef.current) {
      updateHighlightPosition(activeTab);
    }
  }, []);

  const updateHighlightPosition = (tabName) => {
    const targetRef = tabName === 'signin' ? signinButtonRef.current : signupButtonRef.current;
    
    if (targetRef) {
      setHighlightStyle({
        width: `${targetRef.offsetWidth}px`,
        transform: `translateX(${tabName === 'signin' ? targetRef.offsetLeft : signupButtonRef.current.offsetLeft}px)`,
      });
    }
  };

  const switchTab = (tabName) => {
    setActiveTab(tabName);
    updateHighlightPosition(tabName);
  };

  return (
    <div className="auth-isolated flex items-center justify-center min-h-screen bg-gray-50">
      <div className="auth-isolated w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-medium text-center text-gray-700">App's name</h1>
        
        {/* Tab navigation with sliding highlight */}
        <div className="relative mb-6 rounded-lg bg-gray-100">
          <div className="flex">
            <button 
              ref={signupButtonRef}
              className={`w-1/2 py-2 text-center font-medium focus:outline-none z-10 ${activeTab === 'signup' ? 'text-gray-800' : 'text-gray-500'} hover:cursor-pointer`}
              onClick={() => switchTab('signup')}
            >
              Sign up
            </button>
            <button 
              ref={signinButtonRef}
              className={`w-1/2 py-2 text-center font-medium focus:outline-none z-10 ${activeTab === 'signin' ? 'text-gray-800' : 'text-gray-500'} hover:cursor-pointer`}
              onClick={() => switchTab('signin')}

            >
              Sign In
            </button>
          </div>
          
          {/* Sliding highlight */}
          <div 
            className="absolute top-0 left-0 bg-white rounded-lg shadow-sm h-full transition-transform duration-300 ease-in-out"
            style={highlightStyle}
          ></div>
        </div>
        
        {/* Sign In Form */}
        {activeTab === 'signin' && (
          <>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="mb-2">
              <label htmlFor="password" className="block mb-2 text-sm text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex justify-end mb-6">
              <button className="text-sm text-gray-600 hover:text-gray-800">
                Forgot password?
              </button>
            </div>
            
            <button className="w-full py-3 mb-6 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none hover:cursor-pointer"
            onClick={handleSignIn}>
              Sign in
            </button>
          </>
        )}
        
        {/* Sign Up Form */}
        {activeTab === 'signup' && (
          <>
            <div className="mb-4">
              <label htmlFor="signup-email" className="block mb-2 text-sm text-gray-700">
                Email address
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="signup-password" className="block mb-2 text-sm text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block mb-2 text-sm text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            <button className="w-full py-3 mb-6 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none hover:cursor-pointer"
            onClick={handleSignUp}>
              Create Account
            </button>
          </>
        )}
        
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">Other sign in options</p>
        </div>
        
        <div className="flex justify-center">
          <button className="p-2 border border-gray-300 rounded-full focus:outline-none hover:cursor-pointer"
           onClick={handleGoogleLogin}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;