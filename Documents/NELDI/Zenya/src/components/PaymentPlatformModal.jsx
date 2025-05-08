import React, { useState, useCallback } from 'react';
import { paymentPlatforms, initiateOAuth, exchangeCodeForToken, importTransactions } from '../services/paymentPlatforms';

// Connection states to track the OAuth flow
const CONNECTION_STATES = {
  SELECT: 'select',
  CONNECTING: 'connecting',
  AUTHORIZING: 'authorizing',
  IMPORTING: 'importing',
  SUCCESS: 'success',
  ERROR: 'error'
};

const PaymentPlatformModal = ({ isOpen, onClose, onSuccess }) => {
  // Platform selection and connection state
  const [selectedPlatform, setSelectedPlatform] = useState(paymentPlatforms[0]?.id || '');
  const [connectionState, setConnectionState] = useState(CONNECTION_STATES.SELECT);
  const [error, setError] = useState(null);
  const [importResults, setImportResults] = useState(null);
  
  // Handle the OAuth flow
  const handleConnectPlatform = useCallback(async () => {
    if (!selectedPlatform) return;
    
    try {
      setConnectionState(CONNECTION_STATES.CONNECTING);
      setError(null);
      
      // In a real app, this would handle the complete OAuth flow
      // 1. Generate the OAuth URL with proper scopes
      const platform = paymentPlatforms.find(p => p.id === selectedPlatform);
      
      // Determine the redirect URI - in production, this would be a route in your app
      // that handles the OAuth callback
      const redirectUri = `${window.location.origin}/oauth/callback`;
      
      // 2. Initiate the OAuth flow by redirecting the user to the authorization page
      const authUrl = initiateOAuth(selectedPlatform, redirectUri);
      
      // In a real app, we'd redirect the user:
      // window.location.href = authUrl;
      
      // For this demo, we'll simulate the OAuth flow
      setConnectionState(CONNECTION_STATES.AUTHORIZING);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate user authentication
      
      // Simulate receiving the authorization code from the OAuth callback
      const mockCode = `mock_auth_code_${Date.now()}`;
      const mockState = sessionStorage.getItem('oauth_state');
      
      // Exchange the code for an access token
      const credentials = await exchangeCodeForToken(mockCode, mockState, redirectUri);
      
      // Start importing transactions
      setConnectionState(CONNECTION_STATES.IMPORTING);
      const results = await importTransactions(credentials, {
        startDate: new Date(Date.now() - 90*24*60*60*1000) // Last 90 days
      });
      
      setImportResults(results);
      setConnectionState(CONNECTION_STATES.SUCCESS);
      
      // After successful connection, notify parent component
      if (onSuccess) {
        onSuccess({
          platformId: selectedPlatform,
          platformName: platform.name,
          importResults: results
        });
      }
      
    } catch (err) {
      console.error('Connection failed:', err);
      setError(err.message || 'Failed to connect to payment platform');
      setConnectionState(CONNECTION_STATES.ERROR);
    }
  }, [selectedPlatform, onSuccess]);
  
  // Reset state when modal is closed
  const handleClose = () => {
    if (connectionState !== CONNECTION_STATES.CONNECTING && 
        connectionState !== CONNECTION_STATES.AUTHORIZING) {
      setConnectionState(CONNECTION_STATES.SELECT);
      setError(null);
      setImportResults(null);
      onClose();
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] my-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {connectionState === CONNECTION_STATES.SUCCESS ? 'Connection Successful' : 
             connectionState === CONNECTION_STATES.ERROR ? 'Connection Failed' : 
             'Connect Payment Platform'}
          </h2>
          
          {/* Only show close button if not in the middle of connecting */}
          {connectionState !== CONNECTION_STATES.CONNECTING && 
           connectionState !== CONNECTION_STATES.AUTHORIZING && (
            <button 
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 150px)' }}>
          {/* Platform selection state */}
          {connectionState === CONNECTION_STATES.SELECT && (
            <>
              <p className="text-gray-600 mb-4">
                Connect a payment platform to automatically import your transactions and track expenses in multiple currencies.
              </p>
              
              <div className="space-y-3">
                {paymentPlatforms.map(platform => (
                  <div 
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedPlatform === platform.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="h-10 w-10 mr-3 flex items-center justify-center rounded-md" 
                         style={{ backgroundColor: platform.color + '15' }}>
                      <img 
                        src={platform.logo} 
                        alt={`${platform.name} logo`} 
                        className="h-6 w-6"
                        onError={(e) => {
                          // Fallback to the first letter if image fails
                          e.target.outerHTML = `<div class="h-6 w-6 flex items-center justify-center font-bold text-lg" style="color:${platform.color}">${platform.name[0]}</div>`;
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium">{platform.name}</span>
                        {selectedPlatform === platform.id && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{platform.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Connecting state - show progress */}
          {connectionState === CONNECTION_STATES.CONNECTING && (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Connecting to {paymentPlatforms.find(p => p.id === selectedPlatform)?.name}</h3>
              <p className="text-gray-500">You'll be redirected to authorize access...</p>
            </div>
          )}
          
          {/* Authorizing state */}
          {connectionState === CONNECTION_STATES.AUTHORIZING && (
            <div className="text-center py-6">
              <div className="animate-pulse flex flex-col items-center mb-4">
                <div className="rounded-md bg-blue-100 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Authorizing Access</h3>
              <p className="text-gray-500">Verifying your credentials with {paymentPlatforms.find(p => p.id === selectedPlatform)?.name}...</p>
            </div>
          )}
          
          {/* Importing state */}
          {connectionState === CONNECTION_STATES.IMPORTING && (
            <div className="text-center py-6">
              <div className="animate-pulse flex flex-col items-center mb-4">
                <div className="rounded-md bg-green-100 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Importing Transactions</h3>
              <p className="text-gray-500">Fetching your transaction history...</p>
              <div className="mt-4 max-w-md mx-auto">
                <div className="bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Success state */}
          {connectionState === CONNECTION_STATES.SUCCESS && (
            <div className="py-6">
              <div className="flex flex-col items-center mb-6">
                <div className="rounded-full bg-green-100 p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Connected Successfully!
                </h3>
                <p className="text-gray-600 text-center">
                  Your {paymentPlatforms.find(p => p.id === selectedPlatform)?.name} account has been connected.
                </p>
              </div>
              
              {/* Show import results */}
              {importResults && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-800 mb-3">Import Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{importResults.imported}</div>
                      <div className="text-xs text-gray-500">Imported</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{importResults.duplicates}</div>
                      <div className="text-xs text-gray-500">Duplicates</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{importResults.errors}</div>
                      <div className="text-xs text-gray-500">Errors</div>
                    </div>
                  </div>
                  
                  {importResults.errorMessages?.length > 0 && (
                    <div className="mt-3 text-sm">
                      <div className="font-medium text-gray-700">Error details:</div>
                      <ul className="list-disc pl-5 text-red-600">
                        {importResults.errorMessages.map((msg, i) => (
                          <li key={i}>{msg}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Your transactions are now being synced automatically. New transactions will appear in your expenses list.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Error state */}
          {connectionState === CONNECTION_STATES.ERROR && (
            <div className="py-6">
              <div className="flex flex-col items-center mb-6">
                <div className="rounded-full bg-red-100 p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Connection Failed</h3>
                <p className="text-gray-600 text-center">
                  We couldn't connect to {paymentPlatforms.find(p => p.id === selectedPlatform)?.name}.
                </p>
                {error && (
                  <div className="mt-2 text-sm text-red-600 text-center">
                    {error}
                  </div>
                )}
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      There may be an issue with your account or the connection. Please try again or contact support if the problem persists.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer with action buttons */}
        <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-gray-100 sticky bottom-0 bg-white">
          {connectionState === CONNECTION_STATES.SELECT && (
            <>
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConnectPlatform}
                disabled={!selectedPlatform}
                className={`px-4 py-2 rounded-md text-white ${
                  selectedPlatform 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-400 cursor-not-allowed'
                }`}
              >
                Connect Platform
              </button>
            </>
          )}
          
          {connectionState === CONNECTION_STATES.ERROR && (
            <>
              <button
                onClick={() => setConnectionState(CONNECTION_STATES.SELECT)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleConnectPlatform}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Try Again
              </button>
            </>
          )}
          
          {connectionState === CONNECTION_STATES.SUCCESS && (
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Done
            </button>
          )}
          
          {(connectionState === CONNECTION_STATES.CONNECTING || 
            connectionState === CONNECTION_STATES.AUTHORIZING || 
            connectionState === CONNECTION_STATES.IMPORTING) && (
            <button
              disabled
              className="px-4 py-2 bg-blue-400 text-white rounded-md cursor-not-allowed"
            >
              Please wait...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPlatformModal;
