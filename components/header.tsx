"use client"

import { useState } from "react"
import { Bell, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("")

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center lg:hidden">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      <div className="flex justify-center items-center flex-1 px-4 lg:px-6">
  <form className="flex items-center w-full max-w-sm space-x-2">
    <Input
      type="search"
      placeholder="Search..."
      className="h-9 focus-visible:ring-primary"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
    <Button type="submit" variant="ghost" size="icon" className="h-9 w-9">
      <Search className="w-4 h-4" />
      <span className="sr-only">Search</span>
    </Button>
  </form>
</div>

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-2 py-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-2 px-2 py-1">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New data available</p>
                    <p className="text-xs text-muted-foreground">Updated financial data for Q{i} is now available</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{i}h ago</p>
                </div>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
