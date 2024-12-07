import React, { useState } from 'react';
import { X, Link as LinkIcon, Upload, Globe } from 'lucide-react';
import { WebBrowserModal } from './WebBrowserModal';

interface MediaUploaderProps {
  type: 'photo' | 'video';
  onMediaSelect: (url: string) => void;
  onClose: () => void;
}

export function MediaUploader({ type, onMediaSelect, onClose }: MediaUploaderProps) {
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');
  const [showBrowser, setShowBrowser] = useState(false);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'photo' && !file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (type === 'video' && !file.type.startsWith('video/')) {
      setError('Please select a video file');
      return;
    }

    const url = URL.createObjectURL(file);
    onMediaSelect(url);
    onClose();
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim() || !validateUrl(urlInput)) {
      setError('Please enter a valid URL');
      return;
    }

    // Pre-load the image to verify it works
    if (type === 'photo') {
      const img = new Image();
      img.onload = () => {
        onMediaSelect(urlInput);
        onClose();
      };
      img.onerror = () => {
        setError('Unable to load image. Please check the URL or try a different one.');
      };
      img.src = urlInput;
    } else {
      // For videos, we'll validate when playing
      onMediaSelect(urlInput);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Add {type === 'photo' ? 'Photo' : 'Video'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload from device
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept={type === 'photo' ? 'image/*' : 'video/*'}
                onChange={handleFileUpload}
              />
            </label>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Add from URL
              </label>
              <button
                type="button"
                onClick={() => setShowBrowser(true)}
                className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
              >
                <Globe className="w-4 h-4" />
                <span>Browse Web</span>
              </button>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setError('');
                  }}
                  placeholder={`Enter ${type} URL`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
              >
                <LinkIcon className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Tip: Make sure the URL is from a site that allows image sharing
            </p>
          </div>
        </div>
      </div>

      {showBrowser && (
        <WebBrowserModal
          type={type}
          onSelect={(url) => {
            setUrlInput(url);
            setError('');
            setShowBrowser(false);
          }}
          onClose={() => setShowBrowser(false)}
        />
      )}
    </div>
  );
}