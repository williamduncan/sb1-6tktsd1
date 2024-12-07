import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, MessageCircle, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Avatar } from './Avatar';

export function Navigation() {
  const currentUser = useStore((state) => state.currentUser);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">FamilyConnect</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/friends"
              className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Users className="w-6 h-6" />
            </Link>
            <Link
              to="/messages"
              className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </Link>
            <Link
              to="/settings"
              className={`p-2 transition-colors ${
                location.pathname === '/settings'
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Settings className="w-6 h-6" />
            </Link>
            {currentUser && (
              <div className="flex items-center space-x-2">
                <Avatar
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  size="sm"
                />
                <span className="text-sm font-medium text-gray-700">
                  {currentUser.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}