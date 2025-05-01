import { DashboardLayout } from "@/components/dashboard-layout"
import { WeatherWidget } from "@/components/widgets/weather-widget"
import { NewsWidget } from "@/components/widgets/news-widget"
import { FinanceWidget } from "@/components/widgets/finance-widget"
import { WelcomeWidget } from "@/components/widgets/welcome-widget"
import { StatsWidget } from "@/components/widgets/stats-widget"

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="lg:col-span-3">
          <WelcomeWidget />
        </div>
        <div className="lg:col-span-2">
          <WeatherWidget />
        </div>
        <div className="lg:col-span-1">
          <StatsWidget />
        </div>
        <div className="lg:col-span-2">
          <FinanceWidget />
        </div>
        <div className="lg:col-span-1 md:col-span-2">
          <NewsWidget />
        </div>
      </div>
    </DashboardLayout>
  )
}
