import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Flow from './components/Flow';
import Analytics from './components/Analytics';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Redirect from './components/Redirect';
import { useState } from 'react';
import Dashboard from './components/Dashboard';

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
      return !!localStorage.getItem('access_token');
    });

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-40 w-70 h-100 lg:top-10 lg:-left-32 lg:w-80 lg:h-96 bg-amber-900/14 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-60 w-70 h-200 lg:top-1/3 lg:left-9/10 lg:w-40 lg:h-84 bg-yellow-900/9 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-59 w-120 h-70 lg:top-8/10 lg:left-1/8 lg:w-80 lg:h-80 bg-amber-800/8 rounded-full blur-3xl"></div>
        <div className="absolute lg:bottom-1/4 lg:right-1/4 lg:w-86 lg:h-56 bg-orange-900/7 rounded-full blur-2xl"></div>
        <div className="absolute lg:top-1/100 lg:left-5/8 lg:w-72 lg:h-36 bg-amber-700/12 rounded-full blur-3xl"></div>
      </div>

      <BrowserRouter>
        <div className="flex flex-col lg:min-h-screen">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path='/' element={
              <section className='flex flex-col lg:gap-20'>
                <Hero isLoggedIn={isLoggedIn} />
                <Features />
                <Flow /> 
                <Analytics /> 
              </section>
            } />
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/go/:shortCode' element={<Redirect />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
          <Footer /> 
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}