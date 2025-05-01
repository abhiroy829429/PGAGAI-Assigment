"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Search } from "lucide-react"

interface AnalyticsTableProps {
  type: "pages" | "geography" | "content" | "channels"
}

export function AnalyticsTable({ type }: AnalyticsTableProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data based on table type
  const getData = () => {
    switch (type) {
      case "pages":
        return [
          { name: "/home", views: 12543, uniqueVisitors: 8765, avgTime: "2m 34s", bounceRate: "32%" },
          { name: "/products", views: 8932, uniqueVisitors: 6543, avgTime: "3m 12s", bounceRate: "28%" },
          { name: "/blog", views: 6721, uniqueVisitors: 4321, avgTime: "4m 05s", bounceRate: "25%" },
          { name: "/about", views: 4532, uniqueVisitors: 3210, avgTime: "1m 47s", bounceRate: "45%" },
          { name: "/contact", views: 3421, uniqueVisitors: 2345, avgTime: "1m 23s", bounceRate: "38%" },
        ]
      case "geography":
        return [
          { country: "United States", visitors: 8765, sessions: 12543, avgTime: "3m 12s", bounceRate: "32%" },
          { country: "United Kingdom", visitors: 4321, sessions: 6721, avgTime: "2m 54s", bounceRate: "35%" },
          { country: "Germany", visitors: 3210, sessions: 4532, avgTime: "3m 45s", bounceRate: "28%" },
          { country: "Japan", visitors: 2345, sessions: 3421, avgTime: "2m 32s", bounceRate: "40%" },
          { country: "Canada", visitors: 1987, sessions: 2876, avgTime: "3m 05s", bounceRate: "30%" },
        ]
      case "content":
        return [
          { title: "Getting Started Guide", views: 8765, avgTime: "5m 23s", engagement: "High", shares: 432 },
          { title: "Product Features", views: 6543, avgTime: "4m 12s", engagement: "Medium", shares: 321 },
          { title: "Case Study: Success Story", views: 5432, avgTime: "6m 45s", engagement: "High", shares: 543 },
          { title: "Pricing Plans", views: 4321, avgTime: "2m 34s", engagement: "Low", shares: 123 },
          { title: "API Documentation", views: 3210, avgTime: "8m 12s", engagement: "High", shares: 234 },
        ]
      case "channels":
        return [
          { channel: "Organic Search", visitors: 8765, conversions: 432, rate: "4.9%", value: "$12,543" },
          { channel: "Direct", visitors: 6543, conversions: 321, rate: "4.9%", value: "$9,876" },
          { channel: "Social Media", visitors: 4321, conversions: 210, rate: "4.9%", value: "$6,543" },
          { channel: "Email", visitors: 3210, conversions: 187, rate: "5.8%", value: "$5,432" },
          { channel: "Referral", visitors: 2345, conversions: 143, rate: "6.1%", value: "$4,321" },
        ]
      default:
        return []
    }
  }

  const data = getData()

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    const searchableText = Object.values(item).join(" ").toLowerCase()
    return searchableText.includes(searchQuery.toLowerCase())
  })

  // Get column headers based on table type
  const getHeaders = () => {
    switch (type) {
      case "pages":
        return ["Page", "Views", "Unique Visitors", "Avg. Time", "Bounce Rate"]
      case "geography":
        return ["Country", "Visitors", "Sessions", "Avg. Time", "Bounce Rate"]
      case "content":
        return ["Content Title", "Views", "Avg. Time", "Engagement", "Shares"]
      case "channels":
        return ["Channel", "Visitors", "Conversions", "Conv. Rate", "Value"]
      default:
        return []
    }
  }

  const headers = getHeaders()

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          Export
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className={index === 0 ? "w-[30%]" : ""}>
                  <Button variant="ghost" className="p-0 h-auto font-medium">
                    {header}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <TableRow key={index}>
                  {Object.values(item).map((value, valueIndex) => (
                    <TableCell key={valueIndex} className={valueIndex === 0 ? "font-medium" : ""}>
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
