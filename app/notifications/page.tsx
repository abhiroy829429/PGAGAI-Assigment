import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Clock, Info, AlertTriangle } from "lucide-react"

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all" className="relative">
              All
              <Badge className="ml-2 bg-primary text-primary-foreground">12</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              Unread
              <Badge className="ml-2 bg-primary text-primary-foreground">5</Badge>
            </TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>View all your recent notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      icon: AlertTriangle,
                      color: "text-yellow-500",
                      bg: "bg-yellow-100 dark:bg-yellow-900/20",
                      title: "Weather Alert",
                      description: "Severe weather warning for your area",
                      time: "10 minutes ago",
                      unread: true,
                    },
                    {
                      icon: Info,
                      color: "text-blue-500",
                      bg: "bg-blue-100 dark:bg-blue-900/20",
                      title: "Stock Price Update",
                      description: "AAPL stock has increased by 2.5%",
                      time: "30 minutes ago",
                      unread: true,
                    },
                    {
                      icon: Bell,
                      color: "text-purple-500",
                      bg: "bg-purple-100 dark:bg-purple-900/20",
                      title: "New Feature Available",
                      description: "Check out the new analytics dashboard features",
                      time: "2 hours ago",
                      unread: true,
                    },
                    {
                      icon: Check,
                      color: "text-green-500",
                      bg: "bg-green-100 dark:bg-green-900/20",
                      title: "Task Completed",
                      description: "Your data export has been completed",
                      time: "3 hours ago",
                      unread: true,
                    },
                    {
                      icon: Clock,
                      color: "text-gray-500",
                      bg: "bg-gray-100 dark:bg-gray-800",
                      title: "Reminder",
                      description: "Weekly team meeting in 1 hour",
                      time: "4 hours ago",
                      unread: false,
                    },
                    {
                      icon: Info,
                      color: "text-blue-500",
                      bg: "bg-blue-100 dark:bg-blue-900/20",
                      title: "News Update",
                      description: "5 new articles in your feed",
                      time: "5 hours ago",
                      unread: false,
                    },
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className={`flex items-start p-4 rounded-lg ${notification.unread ? "bg-muted/50" : ""}`}
                    >
                      <div className={`flex-shrink-0 p-2 rounded-full ${notification.bg} ${notification.color} mr-4`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                      {notification.unread && (
                        <div className="ml-4 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread">
            <Card>
              <CardHeader>
                <CardTitle>Unread Notifications</CardTitle>
                <CardDescription>Notifications you haven't read yet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      icon: AlertTriangle,
                      color: "text-yellow-500",
                      bg: "bg-yellow-100 dark:bg-yellow-900/20",
                      title: "Weather Alert",
                      description: "Severe weather warning for your area",
                      time: "10 minutes ago",
                    },
                    {
                      icon: Info,
                      color: "text-blue-500",
                      bg: "bg-blue-100 dark:bg-blue-900/20",
                      title: "Stock Price Update",
                      description: "AAPL stock has increased by 2.5%",
                      time: "30 minutes ago",
                    },
                    {
                      icon: Bell,
                      color: "text-purple-500",
                      bg: "bg-purple-100 dark:bg-purple-900/20",
                      title: "New Feature Available",
                      description: "Check out the new analytics dashboard features",
                      time: "2 hours ago",
                    },
                    {
                      icon: Check,
                      color: "text-green-500",
                      bg: "bg-green-100 dark:bg-green-900/20",
                      title: "Task Completed",
                      description: "Your data export has been completed",
                      time: "3 hours ago",
                    },
                  ].map((notification, index) => (
                    <div key={index} className="flex items-start p-4 rounded-lg bg-muted/50">
                      <div className={`flex-shrink-0 p-2 rounded-full ${notification.bg} ${notification.color} mr-4`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>Important alerts and warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      icon: AlertTriangle,
                      color: "text-yellow-500",
                      bg: "bg-yellow-100 dark:bg-yellow-900/20",
                      title: "Weather Alert",
                      description: "Severe weather warning for your area",
                      time: "10 minutes ago",
                      unread: true,
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-red-500",
                      bg: "bg-red-100 dark:bg-red-900/20",
                      title: "System Alert",
                      description: "Scheduled maintenance in 24 hours",
                      time: "1 day ago",
                      unread: false,
                    },
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className={`flex items-start p-4 rounded-lg ${notification.unread ? "bg-muted/50" : ""}`}
                    >
                      <div className={`flex-shrink-0 p-2 rounded-full ${notification.bg} ${notification.color} mr-4`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                      {notification.unread && (
                        <div className="ml-4 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates">
            <Card>
              <CardHeader>
                <CardTitle>Updates</CardTitle>
                <CardDescription>System and feature updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      icon: Bell,
                      color: "text-purple-500",
                      bg: "bg-purple-100 dark:bg-purple-900/20",
                      title: "New Feature Available",
                      description: "Check out the new analytics dashboard features",
                      time: "2 hours ago",
                      unread: true,
                    },
                    {
                      icon: Info,
                      color: "text-blue-500",
                      bg: "bg-blue-100 dark:bg-blue-900/20",
                      title: "App Update",
                      description: "Version 2.0.1 has been released with bug fixes",
                      time: "2 days ago",
                      unread: false,
                    },
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className={`flex items-start p-4 rounded-lg ${notification.unread ? "bg-muted/50" : ""}`}
                    >
                      <div className={`flex-shrink-0 p-2 rounded-full ${notification.bg} ${notification.color} mr-4`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                      {notification.unread && (
                        <div className="ml-4 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
