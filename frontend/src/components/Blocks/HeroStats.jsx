import { useEffect, useState } from 'react'
import { Users, Link, TrendingUp } from 'lucide-react'
import { Ripple } from '../ui/ripple';
import { NumberTicker } from '../ui/number-ticker';

function Counter({ target, label, icon: Icon, delay, position }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`absolute p-6 rounded-lg border border-amber-600/20 bg-black/20 backdrop-blur-sm transition-all duration-500 w-fit ${position} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="flex justify-center items-center lg:gap-3 mb-3">
        {Icon && <Icon className="w-5 h-5 text-amber-600" />}
        <p className="text-muted-foreground text-sm uppercase tracking-wider">{label}</p>
      </div>
      <p className="lg:text-3xl text-center font-bold text-white">
        <NumberTicker value={target} />
        <span className="text-amber-600">+</span>
      </p>
    </div>
  )
}

export default function HeroStats() {
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden">
      <Ripple className='bg-amber-600/5' />

      <div className="relative w-full h-96">
        <Counter 
          target={5000} 
          label="Users Joined" 
          icon={Users} 
          delay={0}
          position="top-4 left-4"
        />

        <Counter 
          target={25000} 
          label="Links Shortened" 
          icon={Link} 
          delay={500}
          position="top-20 right-4"
        />

        <Counter 
          target={150000} 
          label="Total Clicks" 
          icon={TrendingUp} 
          delay={1000}
          position="bottom-0 left-1/2 -translate-x-1/2"
        />
      </div>
    </div>
  )
}