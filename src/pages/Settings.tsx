import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Shield, UserCog, Eye, HelpCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AvatarSelector } from '../components/AvatarSelector';

export function Settings() {
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.currentUser);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold ml-2">Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <AvatarSelector />
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
            <p className="text-gray-500 capitalize">{currentUser?.role}</p>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          <SettingsLink
            icon={<Bell className="w-5 h-5 text-blue-500" />}
            title="Notifications"
            description="Manage your notification preferences"
          />
          <SettingsLink
            icon={<Shield className="w-5 h-5 text-green-500" />}
            title="Privacy & Safety"
            description="Control your privacy settings and safety tools"
          />
          <SettingsLink
            icon={<UserCog className="w-5 h-5 text-purple-500" />}
            title="Account Settings"
            description="Update your account information"
          />
          <SettingsLink
            icon={<Eye className="w-5 h-5 text-yellow-500" />}
            title="Content Preferences"
            description="Customize your viewing experience"
          />
          <SettingsLink
            icon={<HelpCircle className="w-5 h-5 text-red-500" />}
            title="Help & Support"
            description="Get help and contact support"
          />
        </div>
      </div>
    </div>
  );
}

function SettingsLink({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button className="w-full p-4 hover:bg-gray-50 transition-colors flex items-start text-left">
      <span className="p-2 bg-gray-50 rounded-lg">{icon}</span>
      <div className="ml-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
}