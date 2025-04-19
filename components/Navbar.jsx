"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Download, Menu, Search, Bell } from "lucide-react"
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
      if (window.scrollY > 50) {
        setScrolling(true)
      } else {
        setScrolling(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`p-3 border shadow-sm flex justify-between items-center sticky top-0 bg-background z-50 transition-all duration-300 ${scrolling ? 'bg-opacity-90' : ''}`}>
      {/* Breadcrumb Navigation */}
      <div className="hidden md:flex items-center text-sm text-muted-foreground">
        <span>Home</span> &gt; <span>Features</span> &gt; <span>Pricing</span>
      </div>

      {/* Logo */}
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
              {/* Search Bar in Mobile Menu */}
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="ghost" className="justify-start">
                Home
              </Button>
              <Button variant="ghost" className="justify-start">
                Features
              </Button>
              <Button variant="ghost" className="justify-start">
                Pricing
              </Button>
              <ModeToggle />
              {/* Quick Access Shortcuts */}
              <Button variant="ghost" className="justify-start">
                Dashboard
              </Button>
              <Button variant="ghost" className="justify-start">
                Profile
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <Image
          src="./../public/logo.svg"
          alt="Logofy.ai"
          width={150}
          height={60}
          className="transition-all hover:scale-105"
        />
      </div>

      {/* Center Search on Desktop with real-time search suggestions */}
      <div className="hidden md:flex items-center w-1/3">
        <div className="relative w-full">
          <Input
            placeholder="Search logos, ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          {/* Real-time search dropdown */}
          {searchQuery && (
            <div className="absolute top-12 left-0 w-full bg-white shadow-md rounded-md">
              {/* Example dropdown with suggestions */}
              <div className="p-2 text-sm">Result 1</div>
              <div className="p-2 text-sm">Result 2</div>
              <div className="p-2 text-sm">Result 3</div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Notification */}
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

        {/* Mode Toggle */}
        <ModeToggle />

        {/* User Avatar & Profile Preview */}
        <div className="relative">
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Download Button */}
        <Button className="flex gap-2 hover:scale-105 transition-all">
          <Download className="h-5 w-5" />
          Download
        </Button>
      </div>
    </header>
  )
}

export default Navbar
