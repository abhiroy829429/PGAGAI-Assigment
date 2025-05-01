import { DashboardLayout } from "@/components/dashboard-layout"
import { WeatherWidget } from "@/components/widgets/weather-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherAnimation } from "@/components/3d/weather-animation"

export default function WeatherPage() {
  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-3xl font-bold">Weather Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WeatherWidget />
          <Card>
            <CardHeader>
              <CardTitle>Weather Visualization</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <WeatherAnimation condition="clear" />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
