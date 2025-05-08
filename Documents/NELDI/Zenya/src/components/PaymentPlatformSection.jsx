import React from 'react';
import PaymentPlatformCard from './PaymentPlatformCard';
import { paymentPlatforms } from '../services/paymentPlatforms';

const PaymentPlatformSection = ({ 
  connectedPlatforms, 
  onAddPlatform, 
  onSyncPlatform, 
  onViewTransactions 
}) => {
  
  // Find platform details from our service
  const enrichPlatformData = (platform) => {
    const platformDetails = paymentPlatforms.find(p => p.id === platform.id);
    return {
      ...platform,
      color: platformDetails?.color || '#6B7280',
      logoUrl: platformDetails?.logo,
      logoText: platform.name.charAt(0)
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-blue-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Payment Platforms</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                Connect your payment accounts to automatically sync transactions
              </p>
            </div>
          </div>
          
          <div>
            {connectedPlatforms.length > 0 && (
              <button 
                onClick={onAddPlatform}
                className="bg-white text-blue-600 border border-blue-200 hover:border-blue-300 px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Connect Another Account
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {connectedPlatforms.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Your Payment Platforms</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Link your payment accounts to automatically import transactions and track expenses across multiple currencies.
            </p>
            <button
              onClick={onAddPlatform}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 shadow-sm"
            >
              Connect Platform
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-4">
              <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5"></div>
                Connected
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-xs text-gray-500">
                Auto-syncing every 24 hours
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {connectedPlatforms.map(platform => (
                <PaymentPlatformCard 
                  key={platform.id} 
                  platform={enrichPlatformData(platform)} 
                  onSync={onSyncPlatform}
                  onViewTransactions={onViewTransactions}
                />
              ))}
            </div>
                  
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500 mb-3 sm:mb-0">
                Last automatic sync: <span className="font-medium">{new Date().toLocaleString()}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => onSyncPlatform('all')}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Sync All Platforms
                </button>
                <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Manage Sync Settings
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPlatformSection;
