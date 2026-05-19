'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/frontend/lib/utils'
import { Button } from '@/frontend/components/ui/button'
import { Badge } from '@/frontend/components/ui/badge'
import { 
  User, 
  Briefcase, 
  Bookmark, 
  FileText,
  Bell,
  Settings,
  TrendingUp,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useAuthStore } from '@/frontend/store/auth-store'

interface DashboardSidebarProps {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export function DashboardSidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  const navigation = [
    {
      name: 'Overview',
      href: '/dashboard/candidate',
      icon: User,
      badge: null
    },
    {
      name: 'My Applications',
      href: '/dashboard/candidate/applications',
      icon: Briefcase,
      badge: '12'
    },
    {
      name: 'Saved Jobs',
      href: '/dashboard/candidate/saved-jobs',
      icon: Bookmark,
      badge: '8'
    },
    {
      name: 'Resume',
      href: '/dashboard/candidate/resume',
      icon: FileText,
      badge: null
    },
    {
      name: 'Job Alerts',
      href: '/dashboard/candidate/alerts',
      icon: Bell,
      badge: '3'
    },
    {
      name: 'Settings',
      href: '/dashboard/candidate/settings',
      icon: Settings,
      badge: null
    }
  ]

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">Candidate</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between w-full p-3 rounded-lg transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
