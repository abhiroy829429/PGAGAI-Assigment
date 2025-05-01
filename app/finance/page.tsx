import { DashboardLayout } from "@/components/dashboard-layout"
import { FinanceWidget } from "@/components/widgets/finance-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StockVisualization } from "@/components/3d/stock-visualization"
import { fetchStockTimeSeries } from "@/services/finance-service"

export default async function FinancePage() {
  // Pre-fetch some stock data for the 3D visualization
  let stockData = []
  try {
    stockData = await fetchStockTimeSeries("AAPL", "1m")
  } catch (error) {
    console.error("Error fetching stock data:", error)
    // Provide fallback data
    stockData = Array(5)
      .fill(null)
      .map((_, i) => ({
        date: new Date().toISOString(),
        open: "100.00",
        high: "101.00",
        low: "99.00",
        close: "100.50",
        volume: 1000000,
      }))
  }

  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-3xl font-bold">Finance Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FinanceWidget />
          <Card>
            <CardHeader>
              <CardTitle>Stock Visualization</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <StockVisualization data={stockData} symbol="AAPL" />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
