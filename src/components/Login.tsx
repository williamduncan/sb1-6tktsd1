import React from 'react';
import { useStore } from '../store/useStore';
import { User } from '../types';

export function Login() {
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const handleLogin = (role: User['role'], userId: string) => {
    const mockUser: User = {
      id: userId,
      name: userId === '1' ? 'Angus' : userId === '2' ? 'Courtney' : userId === '3' ? 'Millie' : userId === '4' ? 'Maude' : 'GrandPa',
      avatar: `https://images.unsplash.com/photo-${
        userId === '1' ? '1500529975644-c3d0c1ef7ccf' : 
        userId === '2' ? '1438761681033-6461ffad8d80' : 
        userId === '3' ? '1544005313-94ddf0286df2' :
        userId === '4' ? '1517070208541-6ddc4d3efbcb' :
        '1472099645785-5658abf4ff4e'}?w=150`,
      role: role
    };
    setCurrentUser(mockUser);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900">Welcome to FamilyConnect</h1>
        <p className="text-gray-600 text-center mb-6">Choose how you want to log in:</p>
        
        <div className="space-y-4">
          <button
            onClick={() => handleLogin('child', '1')}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue as Angus (Child)
          </button>
          
          <button
            onClick={() => handleLogin('child', '4')}
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Continue as Maude (Child)
          </button>
          
          <button
            onClick={() => handleLogin('parent', '2')}
            className="w-full py-3 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Continue as Courtney (Parent)
          </button>
          
          <button
            onClick={() => handleLogin('family', '3')}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue as Millie (Grandma)
          </button>

          <button
            onClick={() => handleLogin('family', '5')}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue as GrandPa
          </button>
        </div>
      </div>
    </div>
  );
}