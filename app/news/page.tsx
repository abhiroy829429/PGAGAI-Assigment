import { DashboardLayout } from "@/components/dashboard-layout"
import { NewsWidget } from "@/components/widgets/news-widget"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-3xl font-bold">News Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>News Categories</CardTitle>
                <CardDescription>Browse news by category</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="technology">
                  <TabsList className="grid grid-cols-5 mb-4">
                    <TabsTrigger value="technology">Technology</TabsTrigger>
                    <TabsTrigger value="business">Business</TabsTrigger>
                    <TabsTrigger value="health">Health</TabsTrigger>
                    <TabsTrigger value="sports">Sports</TabsTrigger>
                    <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
                  </TabsList>
                  <TabsContent value="technology">
                    <NewsWidget />
                  </TabsContent>
                  <TabsContent value="business">
                    <NewsWidget />
                  </TabsContent>
                  <TabsContent value="health">
                    <NewsWidget />
                  </TabsContent>
                  <TabsContent value="sports">
                    <NewsWidget />
                  </TabsContent>
                  <TabsContent value="entertainment">
                    <NewsWidget />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>Popular news topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Artificial Intelligence",
                    "Climate Change",
                    "Cryptocurrency",
                    "Space Exploration",
                    "Global Economy",
                  ].map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{topic}</p>
                        <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100) + 10} articles</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
