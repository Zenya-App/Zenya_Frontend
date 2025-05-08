import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock current exchange rates
const mockCurrentRates = {
  'USD-EUR': 0.92,
  'EUR-GBP': 0.87,
  'USD-GHS': 13.5,
  'EUR-USD': 1.08,
  'GBP-EUR': 1.15,
  'GHS-USD': 0.074,
  'USD-NGN': 1450.75,
  'GBP-USD': 1.28
};

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, from: 'USD', to: 'EUR', target: '0.90', direction: 'below', status: 'active' },
    { id: 2, from: 'EUR', to: 'GBP', target: '0.85', direction: 'above', status: 'active' },
    { id: 3, from: 'USD', to: 'GHS', target: '15.00', direction: 'above', status: 'triggered' }
  ]);
  
  const [newAlert, setNewAlert] = useState({
    from: 'USD',
    to: 'EUR',
    target: '',
    direction: 'below',
    notificationMethod: 'email'
  });
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currencies, setCurrencies] = useState(['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'GHS', 'NGN', 'ZAR', 'KES']);
  const [fetchingRate, setFetchingRate] = useState(false);
  const [currentRates, setCurrentRates] = useState(mockCurrentRates);
  
  // Effect to update the current rate when currency pair changes
  useEffect(() => {
    const pair = `${newAlert.from}-${newAlert.to}`;
    
    // Simulate API call to get current rate
    setFetchingRate(true);
    setTimeout(() => {
      const directRate = mockCurrentRates[pair];
      const inverseRate = mockCurrentRates[`${newAlert.to}-${newAlert.from}`];
      
      if (directRate) {
        setFetchingRate(false);
      } else if (inverseRate) {
        // Calculate the inverse rate if direct rate not available
        mockCurrentRates[pair] = parseFloat((1 / inverseRate).toFixed(4));
        setCurrentRates({...mockCurrentRates});
        setFetchingRate(false);
      } else {
        // If no rate exists, generate a realistic one
        mockCurrentRates[pair] = parseFloat((Math.random() * 2).toFixed(4));
        setCurrentRates({...mockCurrentRates});
        setFetchingRate(false);
      }
    }, 500);
  }, [newAlert.from, newAlert.to]);

  // Get current rate for a pair
  const getCurrentRate = (from, to) => {
    const pair = `${from}-${to}`;
    return currentRates[pair] || '—';
  };

  // Helper to suggest a realistic target based on current rate
  const suggestTarget = () => {
    const currentRate = getCurrentRate(newAlert.from, newAlert.to);
    if (currentRate === '—') return;
    
    // Suggest rate 5% better than current if "below", or 5% higher if "above"
    const factor = newAlert.direction === 'below' ? 0.95 : 1.05;
    const suggestedTarget = (currentRate * factor).toFixed(4);
    setNewAlert({...newAlert, target: suggestedTarget});
  };

  // Determine how close current rate is to target (as percentage)
  const getProximityToTarget = (alert) => {
    const currentRate = getCurrentRate(alert.from, alert.to);
    if (currentRate === '—') return null;
    
    const target = parseFloat(alert.target);
    const diff = Math.abs(currentRate - target);
    const percentage = (diff / target) * 100;
    
    return {
      percentage: percentage.toFixed(1),
      isClose: percentage < 5, // Consider "close" if within 5%
      isVeryClose: percentage < 1, // Consider "very close" if within 1%
      currentRate
    };
  };
  
  const handleCreateAlert = (e) => {
    e.preventDefault();
    const newId = alerts.length > 0 ? Math.max(...alerts.map(a => a.id)) + 1 : 1;
    
    setAlerts([...alerts, {
      id: newId,
      ...newAlert,
      status: 'active'
    }]);
    
    setNewAlert({
      from: 'USD',
      to: 'EUR',
      target: '',
      direction: 'below',
      notificationMethod: 'email'
    });
    
    setShowCreateForm(false);
  };
  
  const handleDeleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  
  const handleToggleAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: alert.status === 'active' ? 'paused' : 'active' } : alert
    ));
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rate Alerts</h1>
            <p className="text-gray-500 mt-1">Get notified when currency rates reach your target</p>
          </div>
          
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)} 
            className="bg-purple-600 text-white px-4 py-2 rounded-md shadow flex items-center hover:bg-purple-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Alert
          </button>
        </div>
        
        {/* Create Alert Form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Alert</h2>
            <form onSubmit={handleCreateAlert} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Currency</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newAlert.from}
                    onChange={e => setNewAlert({...newAlert, from: e.target.value})}
                  >
                    {currencies.map(currency => (
                      <option key={`from-${currency}`} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Currency</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newAlert.to}
                    onChange={e => setNewAlert({...newAlert, to: e.target.value})}
                  >
                    {currencies.map(currency => (
                      <option key={`to-${currency}`} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-800">Current Rate:</span>
                  {fetchingRate ? (
                    <span className="text-sm text-blue-600">Loading...</span>
                  ) : (
                    <span className="text-sm font-mono font-bold text-blue-800">
                      1 {newAlert.from} = {getCurrentRate(newAlert.from, newAlert.to)} {newAlert.to}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={suggestTarget}
                  className="text-xs text-blue-700 hover:text-blue-900 font-medium inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Suggest target based on current rate
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert me when rate is</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newAlert.direction}
                    onChange={e => setNewAlert({...newAlert, direction: e.target.value})}
                  >
                    <option value="above">Above target</option>
                    <option value="below">Below target</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Rate</label>
                  <input
                    type="number"
                    step="0.0001"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 0.85"
                    value={newAlert.target}
                    onChange={e => setNewAlert({...newAlert, target: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notification Method</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="notificationMethod"
                      value="email"
                      checked={newAlert.notificationMethod === 'email'}
                      onChange={e => setNewAlert({...newAlert, notificationMethod: e.target.value})}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    Email
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="notificationMethod"
                      value="sms"
                      checked={newAlert.notificationMethod === 'sms'}
                      onChange={e => setNewAlert({...newAlert, notificationMethod: e.target.value})}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    SMS
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="notificationMethod"
                      value="push"
                      checked={newAlert.notificationMethod === 'push'}
                      onChange={e => setNewAlert({...newAlert, notificationMethod: e.target.value})}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    Push Notification
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Create Alert
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Alerts List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Your Alerts</h2>
          </div>
          
          {alerts.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="mt-2">No alerts created yet. Create one to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency Pair</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Rate</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Rate</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alerts.map((alert) => {
                    const proximity = getProximityToTarget(alert);
                    
                    return (
                    <tr key={alert.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{alert.from} / {alert.to}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-mono">
                            {alert.target}
                            {alert.direction === 'above' ? (
                              <span className="ml-1 text-green-600">↑</span>
                            ) : (
                              <span className="ml-1 text-red-600">↓</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {proximity ? (
                          <div>
                            <div className="font-mono">{proximity.currentRate}</div>
                            {proximity.isVeryClose && (
                              <span className="text-xs text-red-600 font-medium">
                                Very close! ({proximity.percentage}% away)
                              </span>
                            )}
                            {proximity.isClose && !proximity.isVeryClose && (
                              <span className="text-xs text-orange-500 font-medium">
                                Getting close ({proximity.percentage}% away)
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {alert.status === 'active' ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            Active
                          </span>
                        ) : alert.status === 'paused' ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            Paused
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            Triggered
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleToggleAlert(alert.id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          {alert.status === 'active' ? 'Pause' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDeleteAlert(alert.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Tips Section */}
        <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-100">
          <h3 className="font-medium text-purple-900 mb-3">Tips for effective alerts</h3>
          <ul className="space-y-2 text-sm text-purple-800">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Set realistic targets based on recent rate history.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Create multiple alerts at different thresholds for important currency pairs.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Regularly review and update your alerts based on market conditions.</span>
            </li>
          </ul>
          
          <div className="mt-4">
            <Link to="/dashboard" className="text-purple-800 hover:text-purple-900 font-medium text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
