import Chart from './Blocks/Chart'

const chartData = [
  { date: "Mon", clicks: 0 },
  { date: "Tue", clicks: 4 },
  { date: "Wed", clicks: 8 },
  { date: "Thu", clicks: 3 },
  { date: "Fri", clicks: 12 },
  { date: "Sat", clicks: 8 },
  { date: "Sun", clicks: 14 },
]

export default function Analytics() {
  return (
    <section id="analytics" className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 px-6 pt-10 mb-15 lg:px-20 lg:pt-20 lg:mb-30">
      <div>
        <Chart data={chartData} />
      </div>

      <div className="flex flex-1 flex-col lg:gap-5">
        <h4 className="md:text-lg lg:text-lg text-amber-600/80 tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>ANALYTICS</h4>
        <h2 className="text-xl md:text-2xl mb-2 lg:text-5xl">See the details of every click</h2>
        <h5 className="text-muted-foreground md:text-xl lg:text-xl">Open any link's stats page to find totals, locations, and timing laid out clearly.</h5>

        <ul className="flex flex-col mt-4 lg:mt-0 gap-1.5 lg:gap-3">
          <li className="flex items-center gap-2 lg:gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
            <span className="text-sm md:text-lg lg:text-lg text-muted-foreground">Total clicks per link, updated as they happen</span>
          </li>
          <li className="flex items-center gap-2 lg:gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
            <span className="text-sm md:text-lg lg:text-lg text-muted-foreground">Where in the world your traffic comes from</span>
          </li>
          <li className="flex items-center gap-2 lg:gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
            <span className="text-sm md:text-lg lg:text-lg text-muted-foreground">When your links get the most attention</span>
          </li>
        </ul>
      </div>
    </section>
  )
}