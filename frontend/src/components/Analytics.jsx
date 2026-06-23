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
    <section id='analytics' className="flex flex-1 lg:gap-20 lg:px-20 lg:pt-20 lg:mb-30">
      <div className="flex-1">
        <Chart data={chartData} />
      </div>

      <div className="flex flex-1 flex-col lg:gap-5">
        <h4 className="lg:text-lg text-amber-600/80 tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>ANALYTICS</h4>
        <h2 className="lg:text-5xl">See the details of every click</h2>
        <h5 className="text-muted-foreground lg:text-xl">Open any link's stats page to find totals, locations, and timing laid out clearly.</h5>

        <ul className="flex flex-col lg:gap-3">
          <li className="flex items-start lg:gap-3">
            <span className="lg:w-2 lg:h-2 rounded-full bg-amber-600 lg:mt-2 shrink-0"></span>
            <span className="text-muted-foreground">Total clicks per link, updated as they happen</span>
          </li>
          <li className="flex items-start lg:gap-3">
            <span className="lg:w-2 lg:h-2 rounded-full bg-amber-600 lg:mt-2 shrink-0"></span>
            <span className="text-muted-foreground">Where in the world your traffic comes from</span>
          </li>
          <li className="flex items-start lg:gap-3">
            <span className="lg:w-2 lg:h-2 rounded-full bg-amber-600 lg:mt-2 shrink-0"></span>
            <span className="text-muted-foreground">When your links get the most attention</span>
          </li>
        </ul>
      </div>
    </section>
  )
}