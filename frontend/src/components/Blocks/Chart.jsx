import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts"

import { ChartContainer } from "@/components/ui/chart"

const fallbackData = [
  { date: "Mon", clicks: 0 },
  { date: "Tue", clicks: 0 },
  { date: "Wed", clicks: 0 },
  { date: "Thu", clicks: 0 },
  { date: "Fri", clicks: 0 },
  { date: "Sat", clicks: 0 },
  { date: "Sun", clicks: 0 },
];

export default function AnalyticsChart({ data = []}) {
  const chartData = fallbackData.map((day) => {
    const found = data.find((d) => d.date === day.date);
    return {
      date: day.date,
      clicks: found ? found.clicks : 0,
    };
  });

  return (
    <div className="flex gap-2 lg:gap-4 flex-col">
      <div>
        <h3 className="text-center lg:text-2xl">Link Clicks (This Week)</h3>
      </div>

      <ChartContainer config={{}}>
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tick={{
              fill: "#d4d4d8",
              fontSize: 14,
            }}
            axisLine={{ stroke: "#d4d4d8" }}
            tickLine={{ stroke: "#d4d4d8" }}
          />

          <YAxis
            width={22}
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