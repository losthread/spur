import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import HeroStats from './Blocks/HeroStats'

export default function Hero({ isLoggedIn }) {
  const [url, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shortCode, setShortCode] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShortCode("");

    try
    {
      const response = await fetch("http://localhost:8000/shorten", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({url})
      });

      const data = await response.json();

      if (response.ok)
      {
        setShortCode(data.short_code);
      }
      else
      {
        setError(data.detail || "Failed to shorten URL");
      }
    }

    catch (err)
    {
      setError(`Error: ${err}`);
    }

    finally
    {
      setIsLoading(false);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`localhost:5173/go${shortCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (    
    <section id="top" className="flex flex-1 items-center lg:gap-9 lg:px-20 lg:pt-30">
      <div className="flex flex-col flex-8 lg:gap-6">
        <div className="flex lg:gap-4 lg:text-xl text-amber-600/80 tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <h4>SHORTEN LINKS</h4>
          <span>•</span>
          <h4>ANALYSE USAGE</h4>
        </div>

        <div className="flex flex-col lg:gap-3 lg:text-6xl font-medium">
          <h1>Shorten URLs</h1>
          <span className="text-amber-600">Simple. Trackable.</span>
        </div>

        <form onSubmit={handleShorten}>
          <div className="w-full flex lg:gap-3">
            <Input
              type="url"
              placeholder="https://example.com"
              className="lg:py-5 lg:px-6 overflow-x-scroll rounded-xl lg:text-lg"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              required
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-xl lg:text-lg lg:py-5"
              onClick={handleCopy}
            >
              {isLoading ? "Shortening..." : "Shorten URL"}
            </Button>
          </div>
        </form>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {shortCode && (
          <div className="flex items-center lg:gap-4 lg:py-1.5 lg:px-4 bg-amber-600/20 border border-amber-600/50 rounded-lg h-fit">
            <p className="lg:text-default text-muted-foreground min-w-fit">Your short URL:</p>
            <div className="w-full flex items-center justify-between">
              <a 
                rel="noopener" 
                href={`http://localhost:5173/go/${shortCode}`} 
                target="blank"
                className="underline lg:text-sm font-mono text-amber-600"
              >
                http://localhost:5173/go/{shortCode}
              </a>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        )}

        <div>
          <p className="lg:text-xl text-muted-foreground">
            We turn long URLs into short, branded links - then show you exactly who clicked and when. Stop guessing which links land.
          </p>
        </div>

        <div className="flex lg:gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="lg:px-6 lg:py-2 lg:text-lg bg-amber-800/90 hover:bg-amber-900 transition-all duration-300 rounded-md flex lg:gap-2 items-center">
                Sign up for free 
                <ArrowRight size={20}/>
              </Link>
              <Link to="/login" className="lg:px-6 lg:py-2 lg:text-lg bg-amber-800/90 hover:bg-amber-900 transition-all duration-300 rounded-md">
                Log in
              </Link>
            </>
          ) : (
            <Link to="/dashboard" className="lg:px-6 lg:py-2 lg:text-lg bg-amber-800/90 hover:bg-amber-900 transition-all duration-300 rounded-md">
              Go to Dashboard
            </Link>
          )}
        </div>

        <div>
          <p className="text-muted-foreground/60 lg:text-xl tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            ABSOLUTELY FREE TO USE
          </p>
        </div>
      </div>

      <div className="flex-5">
        <HeroStats />
      </div>
    </section>
  )
}