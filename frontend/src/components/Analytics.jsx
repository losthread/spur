import Chart from './Blocks/Chart'

export default function Analytics() {
  return (
    <section id='analytics' className="flex flex-1 lg:gap-20 lg:px-20 lg:pt-20 lg:mb-30">
      <div className="flex-1">
        <Chart />
      </div>

      <div className="flex flex-1 flex-col lg:gap-5">
        <h4 className="lg:text-lg text-amber-600/80 tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>ANALYTICS</h4>
        <h2 className="lg:text-5xl">See the details of every click</h2>
        <h5 className="text-muted-foreground lg:text-xl">Open any link's stats page to find totals, locations, and timing laid out clearly.</h5>

        <ul className="space-y-3">
          <li className="flex items-start lg:gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 shrink-0"></span>
            <span className="text-muted-foreground">Total clicks per link, updated as they happen</span>
          </li>
          <li className="flex items-start lg:gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 shrink-0"></span>
            <span className="text-muted-foreground">Where in the world your traffic comes from</span>
          </li>
          <li className="flex items-start lg:gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 shrink-0"></span>
            <span className="text-muted-foreground">When your links get the most attention</span>
          </li>
        </ul>
      </div>
    </section>
  )
}