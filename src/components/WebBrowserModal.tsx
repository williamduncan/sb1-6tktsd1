import React, { useState } from 'react';
import { X, Search, ExternalLink } from 'lucide-react';

interface WebBrowserModalProps {
  type: 'photo' | 'video';
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function WebBrowserModal({ type, onSelect, onClose }: WebBrowserModalProps) {
  const [url, setUrl] = useState('https://unsplash.com/');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    // In a real app, we would handle navigation here
    setIsLoading(false);
  };

  const handleExternalOpen = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col mx-4">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              Browse for {type === 'photo' ? 'Photos' : 'Videos'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter URL or search terms"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleExternalOpen}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center space-x-2"
              title="Open in new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-gray-50 p-4 overflow-auto">
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Suggested websites for {type === 'photo' ? 'photos' : 'videos'}:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {type === 'photo' ? (
                <>
                  <SuggestedSite
                    name="Unsplash"
                    url="https://unsplash.com"
                    description="Beautiful free images & pictures"
                    onSelect={() => window.open('https://unsplash.com', '_blank')}
                  />
                  <SuggestedSite
                    name="Pexels"
                    url="https://www.pexels.com"
                    description="Free stock photos & videos"
                    onSelect={() => window.open('https://www.pexels.com', '_blank')}
                  />
                  <SuggestedSite
                    name="Pixabay"
                    url="https://pixabay.com"
                    description="Stunning free images & royalty free stock"
                    onSelect={() => window.open('https://pixabay.com', '_blank')}
                  />
                  <SuggestedSite
                    name="Flickr"
                    url="https://www.flickr.com"
                    description="Home to tens of billions of photos"
                    onSelect={() => window.open('https://www.flickr.com', '_blank')}
                  />
                </>
              ) : (
                <>
                  <SuggestedSite
                    name="Pexels Videos"
                    url="https://www.pexels.com/videos"
                    description="Free stock videos"
                    onSelect={() => window.open('https://www.pexels.com/videos', '_blank')}
                  />
                  <SuggestedSite
                    name="Pixabay Videos"
                    url="https://pixabay.com/videos"
                    description="Free stock videos & footage"
                    onSelect={() => window.open('https://pixabay.com/videos', '_blank')}
                  />
                  <SuggestedSite
                    name="Videvo"
                    url="https://www.videvo.net"
                    description="Free stock footage & motion graphics"
                    onSelect={() => window.open('https://www.videvo.net', '_blank')}
                  />
                  <SuggestedSite
                    name="Mixkit"
                    url="https://mixkit.co/free-stock-video"
                    description="Free videos for your projects"
                    onSelect={() => window.open('https://mixkit.co/free-stock-video', '_blank')}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Once you find your {type}, copy its URL and paste it back in the upload dialog.
          </p>
        </div>
      </div>
    </div>
  );
}

function SuggestedSite({ 
  name, 
  url, 
  description, 
  onSelect 
}: { 
  name: string;
  url: string;
  description: string;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <h4 className="font-medium text-gray-900 mb-1">{name}</h4>
      <p className="text-sm text-gray-500 mb-2">{description}</p>
      <span className="text-xs text-indigo-600">{url}</span>
    </button>
  );
}