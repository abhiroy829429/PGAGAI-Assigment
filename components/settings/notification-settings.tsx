"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailUpdates">Product Updates</Label>
              <p className="text-sm text-muted-foreground">Receive emails about new features and improvements</p>
            </div>
            <Switch id="emailUpdates" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailSecurity">Security Alerts</Label>
              <p className="text-sm text-muted-foreground">Receive emails about security incidents and alerts</p>
            </div>
            <Switch id="emailSecurity" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailMarketing">Marketing</Label>
              <p className="text-sm text-muted-foreground">Receive emails about new products, features, and offers</p>
            </div>
            <Switch id="emailMarketing" />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Push Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="pushAll">Enable Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Allow us to send you push notifications</p>
            </div>
            <Switch id="pushAll" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="pushUpdates">Dashboard Updates</Label>
              <p className="text-sm text-muted-foreground">Get notified when your dashboard data updates</p>
            </div>
            <Switch id="pushUpdates" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="pushComments">Comments</Label>
              <p className="text-sm text-muted-foreground">Get notified when someone comments on your reports</p>
            </div>
            <Switch id="pushComments" />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Frequency</h3>
        <RadioGroup defaultValue="immediately">
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="immediately" id="immediately" />
            <div className="space-y-1">
              <Label htmlFor="immediately" className="font-normal">
                Immediately
              </Label>
              <p className="text-sm text-muted-foreground">Send notifications as they happen</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <div className="space-y-1">
              <Label htmlFor="daily" className="font-normal">
                Daily Digest
              </Label>
              <p className="text-sm text-muted-foreground">Send a daily summary of all notifications</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <div className="space-y-1">
              <Label htmlFor="weekly" className="font-normal">
                Weekly Digest
              </Label>
              <p className="text-sm text-muted-foreground">Send a weekly summary of all notifications</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
