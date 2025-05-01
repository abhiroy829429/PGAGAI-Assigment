"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function WelcomeWidget() {
  const [greeting, setGreeting] = useState("Good day")
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) setGreeting("Good morning")
      else if (hour < 18) setGreeting("Good afternoon")
      else setGreeting("Good evening")
    }

    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
    }

    updateGreeting()
    updateTime()

    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/5 pb-8">
        <CardTitle className="text-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {greeting}, Abhimanyu Kumar
          </motion.div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            className="bg-card rounded-lg p-4 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-sm font-medium text-muted-foreground mb-1">Current Time</div>
            <div className="text-2xl font-bold">{currentTime}</div>
          </motion.div>
          <motion.div
            className="bg-card rounded-lg p-4 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-sm font-medium text-muted-foreground mb-1">Active Projects</div>
            <div className="text-2xl font-bold">7</div>
          </motion.div>
          <motion.div
            className="bg-card rounded-lg p-4 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-sm font-medium text-muted-foreground mb-1">Pending Tasks</div>
            <div className="text-2xl font-bold">12</div>
          </motion.div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" size="sm">
            View Dashboard Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
