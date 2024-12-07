import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useUsers } from '../context/UserContext';
import { FileUploader } from './FileUploader';
import { Avatar } from './Avatar';

export function AvatarSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useStore((state) => state.currentUser);
  const updateAvatar = useStore((state) => state.updateAvatar);
  const { updateUserAvatar } = useUsers();

  const handleFileSelect = (file: File) => {
    if (currentUser) {
      const url = URL.createObjectURL(file);
      // Update both the store and context
      updateAvatar(currentUser.id, url);
      updateUserAvatar(currentUser.id, url);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        <div className="relative group">
          <Avatar
            src={currentUser?.avatar}
            alt={currentUser?.name || ''}
            size="lg"
          />
          <button
            onClick={() => setIsOpen(true)}
            className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Profile Picture</h3>
          <p className="text-sm text-gray-500">Click the camera icon to change your avatar</p>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload New Avatar</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <FileUploader
              onFileSelect={handleFileSelect}
              accept="image/*"
              className="mb-4"
            />
            
            <p className="text-sm text-gray-500 mt-2">
              Select an image from your device to use as your profile picture
            </p>
          </div>
        </div>
      )}
    </div>
  );
}