import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Flow from './components/Flow';
import Analytics from './components/Analytics';

export default function App() {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 -left-32 w-80 h-96 bg-amber-900/14 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-9/10 w-40 h-84 bg-yellow-900/9 rounded-full blur-2xl"></div>
        <div className="absolute top-8/10 left-1/8 w-80 h-80 bg-amber-800/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-86 h-56 bg-orange-900/7 rounded-full blur-2xl"></div>
        <div className="absolute top-1/100 left-5/8 w-72 h-36 bg-amber-700/12 rounded-full blur-3xl"></div>
      </div>

      <BrowserRouter>
        <div className="flex flex-col lg:min-h-screen">
          <Navbar />
          <Routes>
            <Route path='/' element={
              <section className='flex flex-col lg:gap-20'>
                <Hero />
                <Features />
                <Flow /> 
                <Analytics /> 
              </section>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}