import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Chart from './Blocks/Chart'

export default function Hero() {
  return (
    <section className="flex flex-1 items-center lg:gap-9 lg:px-20 lg:pt-30">
      <div className="flex flex-col flex-7 lg:gap-7">
        <div className="flex lg:gap-4 lg:text-xl text-amber-600/80 tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <h4>Shorten Links</h4>
          <span>•</span>
          <h4>Analyse Usage</h4>
        </div>

        <div className="flex flex-col lg:gap-3 lg:text-6xl font-medium">
          <h1>Shorten URLs</h1>
          <span className="text-amber-600">Simple. Trackable.</span>
        </div>

        <div className="relative w-full max-w-full">
          <Input
            type="url"
            placeholder="https://example.com"
            className="pl-6 h-12 rounded-xl lg:text-lg"
          />

          <Button
            className="absolute right-0 top-0 h-full rounded-xl rounded-l-none lg:text-lg"
          >
            Shorten URL
          </Button>
        </div>

        <div>
          <p className="lg:text-xl text-muted-foreground">
            We turn long URLs into short, branded links - then show you exactly who clicked and when. Stop guessing which links land.
          </p>
        </div>

        <div className="flex lg:gap-4">
          <Link to="/register" className="lg:px-6 lg:py-2 lg:text-lg bg-amber-800/90 hover:bg-amber-900 transition-all duration-300 rounded-md flex lg:gap-2 items-center">
            Sign up for free 
            <ArrowRight size={20}/>
          </Link>
          <Link to="/login" className="lg:px-6 lg:py-2 lg:text-lg bg-amber-800/90 hover:bg-amber-900 transition-all duration-300 rounded-md">
            Log in
          </Link>
        </div>

        <div>
          <p className="text-muted-foreground/60 lg:text-xl tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Absolutely Free To Use
          </p>
        </div>
      </div>

      <div className="flex-8 overflow-x-scroll">
        <Chart />
      </div>
    </section>
  )
}