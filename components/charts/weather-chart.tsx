"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, type TooltipProps } from "recharts"
import { useTheme } from "next-themes"
import { Card } from "@/components/ui/card"
import type { ForecastData } from "@/types/weather"

interface WeatherChartProps {
  data: ForecastData[]
}

export function WeatherChart({ data }: WeatherChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const chartData = useMemo(() => {
    return data.map((item) => ({
      date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      temp: Math.round(item.temp.day),
      min: Math.round(item.temp.min),
      max: Math.round(item.temp.max),
    }))
  }, [data])

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-2 shadow-md border">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            Max: <span className="font-medium">{payload[0].value}°C</span>
          </p>
          <p className="text-sm">
            Min: <span className="font-medium">{payload[1].value}°C</span>
          </p>
          <p className="text-sm">
            Avg: <span className="font-medium">{payload[2].value}°C</span>
          </p>
        </Card>
      )
    }
    return null
  }

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
            domain={["dataMin - 5", "dataMax + 5"]}
            tickFormatter={(value) => `${value}°`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="max" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="min" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="temp" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
