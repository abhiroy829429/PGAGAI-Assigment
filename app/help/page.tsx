import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-3xl font-bold">Help & Support</h1>

        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search for help..." className="pl-10" />
          </div>
        </div>

        <Tabs defaultValue="faq" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions about the dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I customize my dashboard?</AccordionTrigger>
                    <AccordionContent>
                      You can customize your dashboard by rearranging widgets, changing themes, and configuring widget
                      settings. To rearrange widgets, simply drag and drop them to your preferred position. To change
                      themes, go to the settings page and select your preferred theme.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How often is the data updated?</AccordionTrigger>
                    <AccordionContent>
                      Data is updated at different intervals depending on the source. Weather data is updated every
                      hour, news is updated every 15 minutes, and financial data is updated in real-time during market
                      hours. You can manually refresh the data by clicking the refresh button on each widget.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I export data from the dashboard?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can export data from most widgets in various formats including CSV, Excel, and PDF. Look
                      for the export button in the top-right corner of each widget. You can also schedule automated
                      exports by setting up a report in the Analytics section.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I add new data sources?</AccordionTrigger>
                    <AccordionContent>
                      To add new data sources, go to the Settings page and navigate to the Integrations tab. From there,
                      you can connect to various data sources by providing the necessary API keys or authentication
                      credentials. We support a wide range of data sources including Google Analytics, Salesforce, and
                      custom APIs.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is my data secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we take data security very seriously. All data is encrypted both in transit and at rest. We
                      use industry-standard security practices and regularly undergo security audits. Your API keys and
                      credentials are stored securely and are never exposed to third parties.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides">
            <Card>
              <CardHeader>
                <CardTitle>User Guides</CardTitle>
                <CardDescription>Step-by-step guides to help you get the most out of the dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Getting Started Guide",
                      description: "Learn the basics of using the dashboard",
                      time: "5 min read",
                    },
                    {
                      title: "Customizing Your Dashboard",
                      description: "Learn how to personalize your experience",
                      time: "7 min read",
                    },
                    {
                      title: "Working with Weather Data",
                      description: "Get the most out of weather forecasts",
                      time: "4 min read",
                    },
                    {
                      title: "Financial Analysis Tools",
                      description: "Advanced techniques for financial data",
                      time: "10 min read",
                    },
                    {
                      title: "Creating Custom Reports",
                      description: "Build and share custom analytics reports",
                      time: "8 min read",
                    },
                    {
                      title: "API Integration Guide",
                      description: "Connect your own data sources",
                      time: "12 min read",
                    },
                  ].map((guide, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="p-4">
                        <h3 className="text-lg font-medium">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xs text-muted-foreground">{guide.time}</span>
                          <Button variant="ghost" size="sm">
                            Read Guide
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get help from our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Describe your issue in detail..."
                      className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Submit Request</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
