"use client"

import type React from "react"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Cloud, CloudRain, Search, Sun, Thermometer, Wind, Droplets } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { fetchWeatherData, fetchForecastData } from "@/services/weather-service"
import { WeatherChart } from "@/components/charts/weather-chart"

export function WeatherWidget() {
  const [city, setCity] = useState("New Delhi")
  const [searchQuery, setSearchQuery] = useState("")

  const { data: weatherData, isLoading: isWeatherLoading } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherData(city),
    enabled: !!city,
  })

  const { data: forecastData, isLoading: isForecastLoading } = useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchForecastData(city),
    enabled: !!city,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setCity(searchQuery)
    }
  }

  const getWeatherIcon = (condition: string) => {
    if (condition.includes("rain") || condition.includes("drizzle")) {
      return <CloudRain className="h-8 w-8 text-blue-500" />
    } else if (condition.includes("cloud")) {
      return <Cloud className="h-8 w-8 text-gray-500" />
    } else {
      return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Weather</CardTitle>
            <CardDescription>Current weather and forecast</CardDescription>
          </div>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 h-8"
            />
            <Button type="submit" size="sm" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="pt-4"
              >
                {isWeatherLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : weatherData ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-card rounded-lg shadow-sm">
                      <h3 className="text-xl font-bold">{city}</h3>
                      <div className="flex items-center mt-2">
                        {getWeatherIcon(weatherData.weather[0].description)}
                        <span className="text-3xl font-bold ml-2">{Math.round(weatherData.main.temp)}°C</span>
                      </div>
                      <p className="text-muted-foreground capitalize mt-1">{weatherData.weather[0].description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col items-center justify-center p-2 bg-card rounded-lg shadow-sm">
                        <Thermometer className="h-5 w-5 text-orange-500 mb-1" />
                        <span className="text-xs text-muted-foreground">Feels Like</span>
                        <span className="text-sm font-medium">{Math.round(weatherData.main.feels_like)}°C</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-card rounded-lg shadow-sm">
                        <Wind className="h-5 w-5 text-blue-500 mb-1" />
                        <span className="text-xs text-muted-foreground">Wind</span>
                        <span className="text-sm font-medium">{Math.round(weatherData.wind.speed)} m/s</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-card rounded-lg shadow-sm">
                        <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                        <span className="text-xs text-muted-foreground">Humidity</span>
                        <span className="text-sm font-medium">{weatherData.main.humidity}%</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-card rounded-lg shadow-sm">
                        <Thermometer className="h-5 w-5 text-red-500 mb-1" />
                        <span className="text-xs text-muted-foreground">Pressure</span>
                        <span className="text-sm font-medium">{weatherData.main.pressure} hPa</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p>No weather data available</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
          <TabsContent value="forecast">
            {isForecastLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : forecastData ? (
              <div className="pt-4">
                <WeatherChart data={forecastData} />
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {forecastData.slice(0, 4).map((day, index) => (
                    <div key={index} className="flex flex-col items-center p-2 bg-card rounded-lg shadow-sm">
                      <span className="text-xs text-muted-foreground">
                        {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </span>
                      {getWeatherIcon(day.weather[0].description)}
                      <span className="text-sm font-medium mt-1">
                        {Math.round(day.temp.max)}°/{Math.round(day.temp.min)}°
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p>No forecast data available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
