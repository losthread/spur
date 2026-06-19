import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 -left-32 w-80 h-96 bg-amber-900/14 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-9/10 w-40 h-84 bg-yellow-900/15 rounded-full blur-2xl"></div>
        <div className="absolute top-8/10 left-1/8 w-80 h-80 bg-amber-800/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-86 h-56 bg-orange-900/15 rounded-full blur-2xl"></div>
        <div className="absolute top-1/100 left-5/8 w-72 h-36 bg-amber-700/12 rounded-full blur-3xl"></div>
      </div>

      <BrowserRouter>
        <div className="flex flex-col lg:max-h-screen">
          <Navbar />
          <Routes>
            <Route path='/' element={<Hero />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}