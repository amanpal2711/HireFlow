'use client';

import { FileText, Star, Settings, HelpCircle, Shield } from 'lucide-react';

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  userEmail: string;
}

export default function UserDropdown({ isOpen, onClose, onSignOut, userEmail }: UserDropdownProps) {
  if (!isOpen) return null;

  const menuItems = [
    { icon: FileText, label: 'Profile', href: '/candidate/profile' },
    { icon: Star, label: 'My reviews', href: '/candidate/reviews' },
    { icon: Settings, label: 'Settings', href: '/candidate/settings' },
    { icon: HelpCircle, label: 'Help', href: '/candidate/help' },
    { icon: Shield, label: 'Privacy Centre', href: '/candidate/privacy' },
  ];

  return (
    <div className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
      <div className="p-4 border-b border-gray-200">
        <p className="font-semibold text-gray-900">{userEmail}</p>
      </div>

      <div className="py-2">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            <item.icon className="w-4 h-4 text-gray-500" />
            {item.label}
          </a>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="text-xs text-gray-500 mb-3">
          © 2026 HireFlow · Terms · Accessibility
        </div>
        <button
          onClick={() => {
            onSignOut();
            onClose();
          }}
          className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium text-center"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
