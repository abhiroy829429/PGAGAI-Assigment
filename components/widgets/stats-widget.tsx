"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Users, DollarSign, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

export function StatsWidget() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "New Customers",
      value: "2,350",
      change: "+10.5%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active Sessions",
      value: "1,247",
      change: "+12.3%",
      icon: Activity,
      color: "text-purple-500",
    },
    {
      title: "Completed Orders",
      value: "12,234",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-orange-500",
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="space-y-4 pt-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center p-2 bg-card rounded-lg shadow-sm"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${stat.color.replace(
                    "text",
                    "bg",
                  )}/10 mr-3`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{stat.title}</p>
                  <div className="flex items-center">
                    <p className="text-xl font-bold">{stat.value}</p>
                    <span className="text-xs font-medium text-green-500 ml-2">{stat.change}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
          <TabsContent value="weekly" className="pt-4">
            <div className="text-center py-8">
              <p>Weekly statistics will be displayed here</p>
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="pt-4">
            <div className="text-center py-8">
              <p>Monthly statistics will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
