'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { 
  Bookmark, 
  MessageSquare, 
  Bell, 
  User
} from 'lucide-react';
import NotificationDropdown from './notification-dropdown';
import UserDropdown from './user-dropdown';

export default function CandidateNavbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-[#e4e2e0] h-14 z-50">
      <div className="px-6 h-full flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold text-[#2557a7]">HireFlow</div>
          <div className="flex items-center gap-6">
            <a href="/candidate" className="text-sm text-[#595959] border-b-2 border-[#2557a7]">
              Home
            </a>
            <a href="/candidate/reviews" className="text-sm text-[#595959] hover:text-[#1a1a1a]">
              Company reviews
            </a>
            <a href="/candidate/salary-guide" className="text-sm text-[#595959] hover:text-[#1a1a1a]">
              Salary guide
            </a>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a 
            href="/candidate/saved-jobs" 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Saved jobs"
          >
            <Bookmark className="w-5 h-5 text-[#595959]" />
          </a>
          
          <a 
            href="/candidate/messages" 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Messages"
          >
            <MessageSquare className="w-5 h-5 text-[#595959]" />
          </a>

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-[#595959]" />
              {/* Notification badge will be shown by NotificationDropdown component */}
            </button>
            <NotificationDropdown 
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
            />
          </div>

          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Account"
            >
              <User className="w-5 h-5 text-[#595959]" />
            </button>
            <UserDropdown 
              isOpen={showUserDropdown}
              onClose={() => setShowUserDropdown(false)}
              onSignOut={signOut}
              userEmail={user?.primaryEmailAddress?.emailAddress || ''}
            />
          </div>

          <div className="h-6 w-px bg-[#e4e2e0]" />

          <a href="/employers" className="text-sm text-[#595959] hover:text-[#1a1a1a]">
            Employers / Post Job
          </a>
        </div>
      </div>
    </nav>
  );
}
