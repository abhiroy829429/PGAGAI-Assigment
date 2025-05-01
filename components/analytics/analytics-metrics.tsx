"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Users, Globe, Clock, MousePointerClick } from "lucide-react"
import { motion } from "framer-motion"

export function AnalyticsMetrics() {
  const metrics = [
    {
      title: "Total Visitors",
      value: "24,567",
      change: "+12.5%",
      isPositive: true,
      icon: Users,
    },
    {
      title: "Page Views",
      value: "98,235",
      change: "+18.2%",
      isPositive: true,
      icon: Globe,
    },
    {
      title: "Avg. Session",
      value: "3m 42s",
      change: "-2.4%",
      isPositive: false,
      icon: Clock,
    },
    {
      title: "Conversion Rate",
      value: "3.8%",
      change: "+0.6%",
      isPositive: true,
      icon: MousePointerClick,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                </div>
                <div
                  className={`p-2 rounded-full ${metric.isPositive ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"}`}
                >
                  <metric.icon
                    className={`h-5 w-5 ${metric.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  />
                </div>
              </div>
              <div
                className={`flex items-center mt-3 text-sm ${metric.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {metric.isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                <span>{metric.change} from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
