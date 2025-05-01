"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Cloud, Newspaper, TrendingUp, Settings, HelpCircle, LogOut, X, Home, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Weather",
      icon: Cloud,
      href: "/weather",
      active: pathname === "/weather",
    },
    {
      label: "News",
      icon: Newspaper,
      href: "/news",
      active: pathname === "/news",
    },
    {
      label: "Finance",
      icon: TrendingUp,
      href: "/finance",
      active: pathname === "/finance",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/notifications",
      active: pathname === "/notifications",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
    {
      label: "Help",
      icon: HelpCircle,
      href: "/help",
      active: pathname === "/help",
    },
  ]

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => onOpenChange(false)}
      />
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Analytics</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="lg:hidden">
            <X className="w-5 h-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  route.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <route.icon className="w-5 h-5 mr-3" />
                {route.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="flex flex-col gap-2 p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">AB</span>
              </div>
              <div>
                <p className="text-sm font-medium">Abhimanyu Kumar</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
          <Button variant="outline" size="sm" className="mt-2">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
