import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const navlinks = ['Features', 'How it works', 'Analytics'];

export default function Navbar({isLoggedIn, setIsLoggedIn}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    navigate('/')
    window.location.reload();
  };

  return (
    <div className="sticky top-0 backdrop-blur-xl bg-black/40 flex items-center justify-between px-4 py-3 lg:px-20 lg:py-5 border z-200">
      <div className="flex items-center gap-3">
        <Link to='/' className="w-10"><img src='/spur.png' alt="Logo" /></Link>
        <Link to='/' className="lg:text-xl">Spur</Link>
      </div>

      <nav className="hidden lg:flex lg:gap-8">
        <Link to='/' className="text-muted-foreground lg:text-md hover:text-white transition-all duration-200">Home</Link>
        {navlinks.map((link) => {
          return (
            <a
              className="text-muted-foreground lg:text-md hover:text-white transition-all duration-200" 
              key={link} 
              href={`#${link.toLowerCase().split(' ').join('-')}`}
            >
              {link}
            </a>
          )
        })}
      </nav>

      <div className="flex gap-3">
        {isLoggedIn ? (
          <button 
            onClick={handleLogout}
            className="px-3 py-1 lg:px-4 lg:py-1.5 lg:text-md border border-amber-800 text-amber-800 hover:bg-amber-800/10 transition-all duration-300 rounded-lg lg:rounded-md"
          >
            Logout
          </button>
        ) : (
          <>
            <Link 
              className="px-3 py-1 lg:px-4 lg:py-1.5 lg:text-md bg-amber-800/90 hover:bg-amber-900 transition-all duration-300 rounded-lg lg:rounded-md" 
              to="login"
            >
              Login
            </Link>
            <Link 
              className="px-3 py-1 lg:px-4 lg:py-1.5 lg:text-md bg-amber-800/90 hover:bg-amber-900 transition-all duration-300 rounded-lg lg:rounded-md" 
              to="register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  )
}