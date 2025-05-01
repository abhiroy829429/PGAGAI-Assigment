"use client"

import type React from "react"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Search } from "lucide-react"
import { fetchStockData, fetchStockTimeSeries } from "@/services/finance-service"
import { StockChart } from "@/components/charts/stock-chart"

export function FinanceWidget() {
  const [symbol, setSymbol] = useState("AAPL")
  const [searchQuery, setSearchQuery] = useState("")
  const [timeRange, setTimeRange] = useState("1d")

  const { data: stockData, isLoading: isStockLoading } = useQuery({
    queryKey: ["stock", symbol],
    queryFn: () => fetchStockData(symbol),
    enabled: !!symbol,
  })

  const { data: timeSeriesData, isLoading: isTimeSeriesLoading } = useQuery({
    queryKey: ["stockTimeSeries", symbol, timeRange],
    queryFn: () => fetchStockTimeSeries(symbol, timeRange),
    enabled: !!symbol,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSymbol(searchQuery.toUpperCase())
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Finance</CardTitle>
            <CardDescription>Stock market data</CardDescription>
          </div>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              placeholder="Search symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 h-8"
            />
            <Button type="submit" size="sm" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardHeader>
      <CardContent>
        {isStockLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : stockData ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{symbol}</h3>
                <p className="text-sm text-muted-foreground">{stockData.companyName}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${stockData.price}</div>
                <div
                  className={`flex items-center text-sm ${stockData.change >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {stockData.change >= 0 ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {stockData.change} ({stockData.changePercent}%)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-card p-2 rounded-lg shadow-sm">
                <div className="text-xs text-muted-foreground">Open</div>
                <div className="text-sm font-medium">${stockData.open}</div>
              </div>
              <div className="bg-card p-2 rounded-lg shadow-sm">
                <div className="text-xs text-muted-foreground">High</div>
                <div className="text-sm font-medium">${stockData.high}</div>
              </div>
              <div className="bg-card p-2 rounded-lg shadow-sm">
                <div className="text-xs text-muted-foreground">Low</div>
                <div className="text-sm font-medium">${stockData.low}</div>
              </div>
              <div className="bg-card p-2 rounded-lg shadow-sm">
                <div className="text-xs text-muted-foreground">Volume</div>
                <div className="text-sm font-medium">{new Intl.NumberFormat().format(stockData.volume)}</div>
              </div>
            </div>

            <Tabs defaultValue="chart" className="mt-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <div className="flex space-x-1">
                  {["1d", "1w", "1m", "1y"].map((range) => (
                    <Button
                      key={range}
                      size="sm"
                      variant={timeRange === range ? "default" : "outline"}
                      className="h-7 px-2 text-xs"
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
              <TabsContent value="chart" className="pt-4">
                {isTimeSeriesLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : timeSeriesData ? (
                  <StockChart data={timeSeriesData} />
                ) : (
                  <div className="text-center py-8">
                    <p>No chart data available</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="details">
                <div className="grid grid-cols-2 gap-2 pt-4">
                  <div className="bg-card p-2 rounded-lg shadow-sm">
                    <div className="text-xs text-muted-foreground">Market Cap</div>
                    <div className="text-sm font-medium">${new Intl.NumberFormat().format(stockData.marketCap)}</div>
                  </div>
                  <div className="bg-card p-2 rounded-lg shadow-sm">
                    <div className="text-xs text-muted-foreground">P/E Ratio</div>
                    <div className="text-sm font-medium">{stockData.peRatio}</div>
                  </div>
                  <div className="bg-card p-2 rounded-lg shadow-sm">
                    <div className="text-xs text-muted-foreground">52W High</div>
                    <div className="text-sm font-medium">${stockData.week52High}</div>
                  </div>
                  <div className="bg-card p-2 rounded-lg shadow-sm">
                    <div className="text-xs text-muted-foreground">52W Low</div>
                    <div className="text-sm font-medium">${stockData.week52Low}</div>
                  </div>
                  <div className="bg-card p-2 rounded-lg shadow-sm">
                    <div className="text-xs text-muted-foreground">Dividend Yield</div>
                    <div className="text-sm font-medium">{stockData.dividendYield}%</div>
                  </div>
                  <div className="bg-card p-2 rounded-lg shadow-sm">
                    <div className="text-xs text-muted-foreground">Avg Volume</div>
                    <div className="text-sm font-medium">{new Intl.NumberFormat().format(stockData.avgVolume)}</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No stock data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
