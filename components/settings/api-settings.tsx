"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ApiSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_API_KEY || "");


  const handleRegenerateKey = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a new random API key
    const newKey =
      "sk_test_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setApiKey(newKey)
    setIsLoading(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">API Keys</h3>
        <Alert>
          <AlertTitle>Keep your API keys secure!</AlertTitle>
          <AlertDescription>
            Your API keys carry many privileges. Do not share them in publicly accessible areas such as GitHub,
            client-side code, etc.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input id="apiKey" type={showApiKey ? "text" : "password"} value={apiKey} readOnly className="pr-10" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showApiKey ? "Hide" : "Show"} API key</span>
              </Button>
            </div>
            <Button type="button" variant="outline" size="icon" onClick={() => copyToClipboard(apiKey)}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy API key</span>
            </Button>
            <Button type="button" variant="outline" onClick={handleRegenerateKey} disabled={isLoading}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            This key is used to authenticate API requests from your client.
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">API Usage</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Endpoint</TableHead>
              <TableHead>Requests (30 days)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">/api/weather</TableCell>
              <TableCell>1,245</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Active
                </Badge>
              </TableCell>
              <TableCell>2 hours ago</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">/api/news</TableCell>
              <TableCell>867</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Active
                </Badge>
              </TableCell>
              <TableCell>5 hours ago</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">/api/finance</TableCell>
              <TableCell>2,156</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Active
                </Badge>
              </TableCell>
              <TableCell>1 hour ago</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Webhooks</h3>
        <div className="space-y-2">
          <Label htmlFor="webhookUrl">Webhook URL</Label>
          <div className="flex space-x-2">
            <Input
              id="webhookUrl"
              placeholder="https://your-app.com/api/webhook"
              defaultValue="https://example.com/api/webhook"
              className="flex-1"
            />
            <Button type="button">Save</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            We'll send POST requests to this URL when events occur in your account.
          </p>
        </div>
      </div>
    </div>
  )
}
