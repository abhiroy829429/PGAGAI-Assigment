"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true)
    } else {
      setSidebarOpen(false)
    }
  }, [isDesktop])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
            sidebarOpen && isDesktop ? "ml-64" : "ml-0",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
