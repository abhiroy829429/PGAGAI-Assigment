"use client"

import { useMemo } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, type TooltipProps } from "recharts"
import { useTheme } from "next-themes"
import { Card } from "@/components/ui/card"
import type { StockTimeSeriesData } from "@/types/finance"

interface StockChartProps {
  data: StockTimeSeriesData[]
}

export function StockChart({ data }: StockChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const chartData = useMemo(() => {
    return data.map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
      price: Number.parseFloat(item.close),
      volume: item.volume,
    }))
  }, [data])

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-2 shadow-md border">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            Price: <span className="font-medium">${payload[0].value?.toFixed(2)}</span>
          </p>
          <p className="text-sm">
            Volume: <span className="font-medium">{new Intl.NumberFormat().format(payload[1].value as number)}</span>
          </p>
        </Card>
      )
    }
    return null
  }

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="price" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPrice)" />
          <Area type="monotone" dataKey="volume" stroke="transparent" fill="transparent" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
