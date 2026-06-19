import { Link } from "react-router-dom";

const navlinks = ['Features', 'How it works', 'Analytics'];
const auth = ['Login', 'Register'];

export default function Navbar() {
  return (
    <div className="sticky top-0 backdrop-blur-xl bg-black/40 flex items-center justify-between lg:px-20 lg:py-5 border z-10">
      <div className="flex items-center lg:gap-3">
        <Link to='/'><img src="" alt="Logo" /></Link>
        <a href="#top" className="lg:text-xl">Spur</a>
      </div>

      <nav className="flex lg:gap-8">
        {navlinks.map((link) => {
          return (
            <Link 
              className="text-muted-foreground lg:text-md hover:text-white transition-all duration-200" 
              key={link} 
              to={`#${link.toLowerCase().split(' ').join('-')}`}
            >
              {link}
            </Link>
          )
        })}
      </nav>

      <div className="flex lg:gap-3">
        {auth.map((link) => {
          return (
            <Link 
              className="lg:px-4 lg:py-1.5 lg:text-md bg-amber-800/90 hover:bg-amber-900 transition-all duration-300 rounded-md" 
              key={link} 
              to={`${link.toLowerCase()}`}
            >
              {link}
            </Link>
          )
        })}
      </div>
    </div>
  )
}