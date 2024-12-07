import React, { useState } from 'react';
import { Users, Heart, BookOpen, Shield, UserPlus } from 'lucide-react';
import { InviteModal } from './InviteModal';
import { useUsers } from '../context/UserContext';
import { Avatar } from './Avatar';

export function Sidebar() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { users } = useUsers();
  
  const familyMembers = [
    { id: '2', name: 'Courtney', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { id: '1', name: 'Angus', avatar: 'https://images.unsplash.com/photo-1500529975644-c3d0c1ef7ccf?w=150' },
    { id: '4', name: 'Maude', avatar: 'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=150' },
    { id: '3', name: 'Millie', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
    { id: '5', name: 'GrandPa', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
  ];

  return (
    <aside className="w-64 space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Family</h2>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"
            title="Invite family member"
          >
            <UserPlus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          {familyMembers.map((member) => (
            <div key={member.id} className="flex items-center space-x-3">
              <Avatar
                src={member.avatar}
                alt={member.name}
                size="md"
              />
              <span className="text-sm font-medium text-gray-700">
                {member.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
        <nav className="space-y-2">
          <a
            href="#friends"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
          >
            <Users className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-700">Friends</span>
          </a>
          <a
            href="#favorites"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
          >
            <Heart className="w-5 h-5 text-pink-600" />
            <span className="text-sm text-gray-700">Favorites</span>
          </a>
          <a
            href="#albums"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
          >
            <BookOpen className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-700">Photo Albums</span>
          </a>
          <a
            href="#safety"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
          >
            <Shield className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-gray-700">Safety Center</span>
          </a>
        </nav>
      </div>

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </aside>
  );
}