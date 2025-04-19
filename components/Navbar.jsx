"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download, Menu, Search, Bell, Home, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./ModeToggle"

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationCount, setNotificationCount] = useState(3)
  const [theme, setTheme] = useState("light")
  const [scrolling, setScrolling] = useState(false)

  // Theme switcher effect
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`p-3 border shadow-sm flex justify-between items-center sticky top-0 bg-background z-50 transition-all duration-300 ${scrolling ? 'bg-opacity-90' : ''}`}>
      
      {/* Breadcrumb (can be changed or removed) */}
      <div className="hidden md:flex items-center text-sm text-muted-foreground">
        <span>Home</span> &gt; <span>Features</span> &gt; <span>Pricing</span>
      </div>

      {/* Logo and Menu */}
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-4">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button asChild variant="ghost" className="justify-start gap-2">
                <Link href="/">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start gap-2">
                <Link href="/dashboard">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </Button>
              <ModeToggle />
            </div>
          </SheetContent>
        </Sheet>

        <Image
          src="/logofy.ai.png"
          alt="Logofy.ai"
          width={30}
          height={60}
          className="transition-all hover:scale-105"
        />
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center w-1/3">
        <div className="relative w-full">
          <Input
            placeholder="Search logos, ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          {searchQuery && (
            <div className="absolute top-12 left-0 w-full bg-white shadow-md rounded-md">
              <div className="p-2 text-sm">Result 1</div>
              <div className="p-2 text-sm">Result 2</div>
              <div className="p-2 text-sm">Result 3</div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 rounded-full bg-red-500 text-xs text-white px-2 py-1">
                {notificationCount}
              </span>
            )}
          </Button>
        </div>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
        <Button className="flex gap-2 hover:scale-105 transition-all">
          <Download className="h-5 w-5" />
          Download
        </Button>
      </div>
    </header>
  )
}

export default Navbar
