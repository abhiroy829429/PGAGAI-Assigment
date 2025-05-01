"use client"

import { useMemo } from "react"
import { useTheme } from "next-themes"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface AnalyticsChartProps {
  type: "traffic" | "conversion" | "sources" | "engagement" | "funnel"
}

export function AnalyticsChart({ type }: AnalyticsChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Generate mock data based on chart type
  const getData = () => {
    switch (type) {
      case "traffic":
        return Array.from({ length: 12 }, (_, i) => ({
          month: new Date(2023, i, 1).toLocaleString("default", { month: "short" }),
          visitors: Math.floor(Math.random() * 10000) + 5000,
          pageViews: Math.floor(Math.random() * 30000) + 10000,
        }))
      case "conversion":
        return Array.from({ length: 12 }, (_, i) => ({
          month: new Date(2023, i, 1).toLocaleString("default", { month: "short" }),
          rate: (Math.random() * 5 + 1).toFixed(1),
          sales: Math.floor(Math.random() * 500) + 100,
        }))
      case "sources":
        return [
          { name: "Organic Search", value: 40 },
          { name: "Direct", value: 25 },
          { name: "Social Media", value: 15 },
          { name: "Email", value: 12 },
          { name: "Referral", value: 8 },
        ]
      case "engagement":
        return Array.from({ length: 12 }, (_, i) => ({
          month: new Date(2023, i, 1).toLocaleString("default", { month: "short" }),
          sessionDuration: (Math.random() * 5 + 1).toFixed(1),
          pageDepth: (Math.random() * 4 + 1).toFixed(1),
        }))
      case "funnel":
        return [
          { name: "Visitors", value: 10000 },
          { name: "Product Views", value: 7500 },
          { name: "Add to Cart", value: 5000 },
          { name: "Checkout", value: 2500 },
          { name: "Purchase", value: 1000 },
        ]
      default:
        return []
    }
  }

  const data = useMemo(() => getData(), [type])

  // Colors for charts
  const colors = {
    primary: isDark ? "#60a5fa" : "#3b82f6",
    secondary: isDark ? "#f97316" : "#f97316",
    tertiary: isDark ? "#10b981" : "#10b981",
    background: isDark ? "#1e293b" : "#f8fafc",
    text: isDark ? "#f8fafc" : "#1e293b",
    grid: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
  }

  // Pie chart colors
  const COLORS = ["#3b82f6", "#f97316", "#10b981", "#8b5cf6", "#ec4899"]

  // Render different chart types
  const renderChart = () => {
    switch (type) {
      case "traffic":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis dataKey="month" stroke={colors.text} />
              <YAxis stroke={colors.text} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.background,
                  borderColor: colors.grid,
                  color: colors.text,
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="visitors" stroke={colors.primary} activeDot={{ r: 8 }} strokeWidth={2} />
              <Line type="monotone" dataKey="pageViews" stroke={colors.secondary} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )
      case "conversion":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis dataKey="month" stroke={colors.text} />
              <YAxis yAxisId="left" stroke={colors.text} />
              <YAxis yAxisId="right" orientation="right" stroke={colors.text} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.background,
                  borderColor: colors.grid,
                  color: colors.text,
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="rate"
                yAxisId="left"
                stroke={colors.primary}
                fill={`${colors.primary}40`}
              />
              <Area
                type="monotone"
                dataKey="sales"
                yAxisId="right"
                stroke={colors.secondary}
                fill={`${colors.secondary}40`}
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      case "sources":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.background,
                  borderColor: colors.grid,
                  color: colors.text,
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      case "engagement":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis dataKey="month" stroke={colors.text} />
              <YAxis stroke={colors.text} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.background,
                  borderColor: colors.grid,
                  color: colors.text,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sessionDuration"
                stroke={colors.primary}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="pageDepth" stroke={colors.tertiary} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )
      case "funnel":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis type="number" stroke={colors.text} />
              <YAxis dataKey="name" type="category" stroke={colors.text} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.background,
                  borderColor: colors.grid,
                  color: colors.text,
                }}
              />
              <Bar dataKey="value" fill={colors.primary}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`${colors.primary}${100 - index * 15}`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return renderChart()
}
