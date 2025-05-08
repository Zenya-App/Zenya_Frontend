import React, { useState } from 'react';

const PaymentPlatformCard = ({ platform, onSync, onViewTransactions }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Calculate time since last sync
  const getTimeSinceSync = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  // Generate gradient style based on platform color
  const getGradientStyle = (color) => {
    return {
      backgroundImage: `linear-gradient(to right, ${color}15, ${color}05)`,
      borderLeft: `3px solid ${color}`
    };
  };

  return (
    <div 
      className="rounded-lg overflow-hidden shadow-sm transition-all duration-200 bg-white"
      style={isHovering ? getGradientStyle(platform.color) : {}}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center mr-4" 
                style={{ backgroundColor: `${platform.color}15` }}>
              {platform.logoUrl ? (
                <img 
                  src={platform.logoUrl} 
                  alt={`${platform.name} logo`} 
                  className="h-8 w-8" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <div className="h-8 w-8 flex items-center justify-center text-2xl font-bold" 
                    style={{ color: platform.color }}>
                  {platform.logoText || platform.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{platform.name}</h4>
              <p className="text-xs text-gray-500">{platform.accountInfo}</p>
              <div className="flex items-center mt-1">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs font-medium text-green-700">Active</span>
                <span className="mx-1.5 text-gray-300">•</span>
                <span className="text-xs text-gray-500">
                  Last sync: {getTimeSinceSync(platform.lastSyncAt)}
                </span>
              </div>
            </div>
          </div>
          
          {platform.transactionCount && (
            <div className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
              {platform.transactionCount} transactions
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs text-gray-600">
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <div className="font-medium">{platform.currenciesSupported || '-'}</div>
              <div className="text-gray-400 mt-0.5">Currencies</div>
            </div>
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <div className="font-medium">{platform.syncFrequency || 'Daily'}</div>
              <div className="text-gray-400 mt-0.5">Sync Schedule</div>
            </div>
            <div className="p-2 bg-gray-50 rounded-md text-center">
              <div className="font-medium">{platform.importedTransactions}</div>
              <div className="text-gray-400 mt-0.5">Imported</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 flex justify-between border-t border-gray-100">
        <button 
          onClick={() => onSync(platform.id)}
          className="text-xs flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Sync Now
        </button>
        <button 
          onClick={() => onViewTransactions(platform.id)}
          className="text-xs flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          View Transactions
        </button>
        <button className="text-xs flex items-center text-gray-500 hover:text-gray-800 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Settings
        </button>
      </div>
    </div>
  );
};

export default PaymentPlatformCard;
