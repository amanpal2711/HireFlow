'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/frontend/components/ui/button'
import { Input } from '@/frontend/components/ui/input'
import { Badge } from '@/frontend/components/ui/badge'
import { 
  Search, 
  Menu, 
  X, 
  User, 
  Briefcase, 
  Building, 
  DollarSign, 
  BookOpen,
  Sun,
  Moon,
  Plus
} from 'lucide-react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { cn } from '@/frontend/lib/utils'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const navigation = [
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Companies', href: '/companies', icon: Building },
    { name: 'Salaries', href: '/salaries', icon: DollarSign },
    { name: 'Blog', href: '/blog', icon: BookOpen },
  ]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">HF</span>
            </div>
            <span className="font-bold text-xl">HireFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for jobs, companies..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hidden"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <div className="flex items-center space-x-2">
              <SignInButton mode="modal">
                <button className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors">
                  Login
                </button>
              </SignInButton>
              <Link href="/register">
                <button className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors">
                  Post a Job
                </button>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <UserButton />
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for jobs, companies..."
                  className="pl-10"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile Auth */}
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                    <button className="w-full flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors">
                      Login
                    </button>
                  </SignInButton>
                  <Link href="/register">
                    <button className="w-full flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors">
                      Post a Job
                    </button>
                  </Link>
                </div>
              <div className="flex items-center space-x-2">
                <UserButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
