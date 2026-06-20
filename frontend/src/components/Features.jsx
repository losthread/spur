import { Link, BarChart, Globe } from "lucide-react"
import { Card } from "./ui/card"
import { useEffect } from "react"

const features = [
  {
    icon: Link,
    title: "One-Step Short Links",
    description: "Paste any long URL and get a clean, short link instantly. Share it anywhere."
  },
  {
    icon: BarChart,
    title: "Track Every Click",
    description: "See real-time analytics on clicks, geography, and device data for each link."
  },
  {
    icon: Globe,
    title: "Share Globally",
    description: "Short links work everywhere — social media, emails, messaging, QR codes."
  }
]

export default function Features() {
  useEffect(() => {
    const cards = document.querySelectorAll('.group')
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        card.style.setProperty('--mouse-x', `${x}%`)
        card.style.setProperty('--mouse-y', `${y}%`)
      })
    })
  }, [])

  return (
    <section id="features" className="flex flex-col lg:gap-10 lg:px-20 lg:pt-20">
      <div className="flex flex-col lg:gap-5">
        <h4 className="lg:text-lg text-amber-600/80 tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>WHAT YOU GET</h4>
        <h2 className="lg:text-5xl">A short link is just the start</h2>
        <h5 className="text-muted-foreground lg:text-xl">We pair fast link creation with the numbers that tell you what happened next</h5>
      </div>

      <div className="grid lg:grid-cols-3 lg:gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card 
              key={feature.title} 
              className="lg:p-6 border rounded-sm group relative overflow-hidden cursor-pointer transition-all duration-300 hover:border-amber-600/50"
            >
              {/* Gradient follow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at var(--mouse-x, 10%) var(--mouse-y, 10%), rgba(217, 119, 6, 0.1) 0%, transparent 80%)'
                }}
              />
              
              <div className="relative z-10 flex items-center lg:gap-5">
                <Icon className="lg:w-7 lg:h-7 text-amber-600" />
                <h3 className="font-semibold lg:text-lg">{feature.title}</h3>
              </div>
              <p className="lg:text-base lg:-mt-2 text-slate-400 relative z-10">{feature.description}</p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}