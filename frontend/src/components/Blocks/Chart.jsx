import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts"

// mock data ofc
const chartData = [
  { date: "Mon", clicks: 8 },
  { date: "Tue", clicks: 14 },
  { date: "Wed", clicks: 12 },
  { date: "Thu", clicks: 20 },
  { date: "Fri", clicks: 22 },
  { date: "Sat", clicks: 20 },
  { date: "Sun", clicks: 26 },
]

import { ChartContainer } from "@/components/ui/chart"

export default function AnalyticsChart() {
  return (
    <div className="flex lg:gap-10 flex-col">
      <div>
        <h3 className="text-center lg:text-2xl">Link Clicks (Last 7 Days)</h3>
      </div>

      <ChartContainer config={{}}>
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tick={{
              fill: "#d4d4d8", // zinc-300
              fontSize: 14,
            }}
            axisLine={{ stroke: "#d4d4d8" }}
            tickLine={{ stroke: "#d4d4d8" }}
          />

          <YAxis
            tick={{
              fill: "#d4d4d8",
              fontSize: 14,
            }}
            axisLine={{ stroke: "#d4d4d8" }}
            tickLine={{ stroke: "#d4d4d8" }}
          />

          <Tooltip
            formatter={(value) => [`${value} clicks`]}
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: "8px",
            }}
            labelStyle={{
              color: "#d4d4d8",
            }}
          />

          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#f59e0b" 
            strokeWidth={2}
            activeDot={{
              fill: "#92400e",
              r: 7,
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}