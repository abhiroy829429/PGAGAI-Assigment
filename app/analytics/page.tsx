import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsChart } from "@/components/charts/analytics-chart"
import { AnalyticsMetrics } from "@/components/analytics/analytics-metrics"
import { AnalyticsTable } from "@/components/analytics/analytics-table"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <AnalyticsMetrics />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                  <CardDescription>Website traffic over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <AnalyticsChart type="traffic" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rate</CardTitle>
                  <CardDescription>Conversion metrics over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <AnalyticsChart type="conversion" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsTable type="pages" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors come from</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <AnalyticsChart type="sources" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Visitors by country</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsTable type="geography" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Session duration and page views</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <AnalyticsChart type="engagement" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Engagement</CardTitle>
                <CardDescription>Most engaging content</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsTable type="content" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>User journey through conversion steps</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <AnalyticsChart type="funnel" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion by Channel</CardTitle>
                <CardDescription>Which channels drive conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsTable type="channels" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
