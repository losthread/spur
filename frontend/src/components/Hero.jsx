import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import HeroStats from './Blocks/HeroStats'

export default function Hero({ isLoggedIn }) {
  const [url, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shortCode, setShortCode] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleShorten = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShortCode("");

    try {
      if (!isLoggedIn) {
        navigate('/login');
        return
      }

      const response = await fetch(`${API_URL}/shorten`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({url})
      });

      const data = await response.json();

      if (response.ok) {
        setShortCode(data.short_code);
      }
      else {
        setError(data.detail || "Failed to shorten URL");
      }
    }

    catch (err) {
      setError(`Error: ${err}`);
    }

    finally {
      setIsLoading(false);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/go/${shortCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (    
    <section id="top" className="flex flex-1 items-center lg:gap-9 px-6 pt-10 lg:px-20 lg:pt-30">
      <div className="flex flex-col flex-8 items-center lg:items-start gap-4 md:gap-5 lg:gap-6">
        <div className="flex gap-2 lg:gap-4 lg:text-xl text-amber-600/80 tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <h4>SHORTEN LINKS</h4>
          <span>•</span>
          <h4>ANALYSE USAGE</h4>
        </div>

        <div className="flex flex-col items-center lg:items-start gap-1 lg:gap-3 text-4xl md:text-6xl lg:text-6xl font-medium">
          <h1>Shorten URLs</h1>
          <span className="text-amber-600">Simple. Trackable.</span>
        </div>

        <form onSubmit={handleShorten} className="min-w-full">
          <div className="min-w-full flex mt-3 lg:mt-0 gap-3">
            <Input
              type="url"
              placeholder="https://example.com"
              className="px-4 md:py-6 lg:py-5 lg:px-6 overflow-x-scroll rounded-base lg:rounded-xl md:text-lg lg:text-lg"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              required
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="lg:rounded-xl md:text-lg lg:text-lg md:py-6 lg:py-5"
            >
              {isLoading ? "Shortening..." : "Shorten"}
            </Button>
          </div>
        </form>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {shortCode && (
          <div className="flex items-center gap-2 px-3 py-2 lg:gap-4 lg:py-1.5 lg:px-4 bg-amber-600/20 border border-amber-600/50 rounded-lg h-fit">
            <p className="text-xs md:text-base lg:text-default text-muted-foreground min-w-fit">Your short URL:</p>
            <div className="w-full flex items-center justify-between">
              <a 
                rel="noopener" 
                href={`${window.location.origin}/go/${shortCode}`} 
                target="_blank"
                className="pointer underline text-xs md:text-base lg:text-sm font-mono text-amber-600"
              >
                {`${window.location.origin}/go/${shortCode}`}
              </a>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className='hidden lg:block'
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-2 lg:mt-0">
          <p className="text-lg lg:text-xl text-center lg:text-left text-muted-foreground">
            We turn long URLs into short, branded links - then show you exactly who clicked and when. Stop guessing which links land.
          </p>
        </div>

        <div className="lg:gap-4">
          {!isLoggedIn ? (
            <div className="flex gap-3">
              <Link to="/register" className="px-3 py-1 md:py-2 lg:px-6 lg:py-2 md:text-lg lg:text-lg bg-amber-800/90 hover:bg-amber-900 transition-all duration-300 rounded-xl lg:rounded-md flex lg:gap-2 items-center">
                Sign up for free 
                <ArrowRight size={20}/>
              </Link>
              <Link to="/login" className="px-3 py-1 md:py-2 lg:px-6 md:text-lg lg:py-2 lg:text-lg bg-amber-800/90 hover:bg-amber-900 transition-all duration-300 rounded-xl lg:rounded-md">
                Log in
              </Link>
            </div>
          ) : (
            <Link to="/dashboard" className="px-3 py-1 md:py-2 lg:px-6 lg:py-2 md:text-lg lg:text-lg bg-amber-800/90 hover:bg-amber-900 transition-all duration-300 rounded-xl lg:rounded-md">
              Go to Dashboard
            </Link>
          )}
        </div>

        <div>
          <p className="text-muted-foreground/60 md:text-lg lg:text-xl tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            ABSOLUTELY FREE TO USE
          </p>
        </div>
      </div>

      <div className="hidden lg:flex-5 md:block lg:block">
        <HeroStats />
      </div>
    </section>
  )
}