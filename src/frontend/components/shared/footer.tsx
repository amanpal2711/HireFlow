'use client'

import Link from 'next/link'
import { Input } from '@/frontend/components/ui/input'
import { Button } from '@/frontend/components/ui/button'
import { 
  Briefcase, 
  Building, 
  DollarSign, 
  HelpCircle, 
  Shield, 
  FileText,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Users,
  Code
} from 'lucide-react'

export function Footer() {
  const footerLinks = {
    ForJobSeekers: [
      { name: 'Browse Jobs', href: '/jobs' },
      { name: 'Browse Companies', href: '/companies' },
      { name: 'Salary Insights', href: '/salaries' },
      { name: 'Career Advice', href: '/blog' },
      { name: 'Resume Builder', href: '/resume' },
    ],
    ForEmployers: [
      { name: 'Post a Job', href: '/post-job' },
      { name: 'Browse Candidates', href: '/candidates' },
      { name: 'Pricing Plans', href: '/pricing' },
      { name: 'Employer Resources', href: '/resources' },
      { name: 'API Access', href: '/api' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    Support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ]
  }

  const socialLinks = [
    { icon: Globe, href: '#', label: 'Website' },
    { icon: MessageCircle, href: '#', label: 'Twitter' },
    { icon: Users, href: '#', label: 'LinkedIn' },
    { icon: Code, href: '#', label: 'GitHub' },
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">HF</span>
              </div>
              <span className="font-bold text-xl">HireFlow</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Your trusted partner in finding the perfect job or the ideal candidate. 
              Connecting talent with opportunity across India.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-semibold">Stay Updated</h4>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="flex-1"
                />
                <Button>Subscribe</Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold">{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">support@hireflow.in</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Office</p>
              <p className="text-sm text-muted-foreground">Bengaluru, Karnataka</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 HireFlow. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
