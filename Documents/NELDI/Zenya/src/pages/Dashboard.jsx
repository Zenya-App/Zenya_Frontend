import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Mock data - would be replaced with actual API calls
const popularCurrencyPairs = [
  { from: 'USD', to: 'EUR', rate: 0.92 },
  { from: 'USD', to: 'GBP', rate: 0.78 },
  { from: 'USD', to: 'NGN', rate: 1450.75 },
  { from: 'USD', to: 'GHS', rate: 14.5 }
];

const recentTrends = [
  { currency: 'EUR', trend: 'up', percentage: '0.7%' },
  { currency: 'GBP', trend: 'down', percentage: '0.3%' },
  { currency: 'JPY', trend: 'up', percentage: '1.2%' },
  { currency: 'NGN', trend: 'down', percentage: '0.8%' }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState({ from: 'USD', to: 'EUR' });
  const [historicalData, setHistoricalData] = useState([]);
  const [timeFrame, setTimeFrame] = useState('7days');

  // Simulate loading historical data - Updated to respond to currency pair changes
  useEffect(() => {
    // In a real app, this would be an API call with the selected currency pair
    console.log(`Fetching data for ${selectedCurrencyPair.from} to ${selectedCurrencyPair.to}`);
    
    // Generate different mock data based on the selected pair
    let baseRate;
    let volatility;
    
    // Set baseline rate and volatility based on currency pair
    switch(`${selectedCurrencyPair.from}-${selectedCurrencyPair.to}`) {
      case 'USD-EUR':
        baseRate = 0.92;
        volatility = 0.01;
        break;
      case 'USD-GBP':
        baseRate = 0.78;
        volatility = 0.015;
        break;
      case 'USD-NGN':
        baseRate = 1450;
        volatility = 30;
        break;
      case 'USD-GHS':
        baseRate = 14.5;
        volatility = 0.3;
        break;
      default:
        baseRate = 1;
        volatility = 0.02;
    }
    
    // Generate realistic looking random data based on the currency pair
    const generateData = (days) => {
      const data = [];
      const now = new Date();
      
      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        
        // Create some realistic looking variation
        const randomFactor = (Math.random() - 0.5) * 2 * volatility;
        const rate = baseRate + randomFactor;
        
        data.push({
          date: date.toISOString().split('T')[0],
          rate: parseFloat(rate.toFixed(4))
        });
      }
      return data;
    };
    
    // Get appropriate number of days based on timeframe
    let days;
    switch(timeFrame) {
      case '7days': days = 7; break;
      case '30days': days = 30; break;
      case '90days': days = 90; break;
      case '1year': days = 365; break;
      default: days = 7;
    }
    
    // Set the historical data with our generated data
    setHistoricalData(generateData(days));
    
  }, [selectedCurrencyPair, timeFrame]); // Re-run when currency pair or timeframe changes

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Segment Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Currency Dashboard</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="bg-white rounded-lg shadow-sm flex p-1">
              <Link to="/dashboard" className="py-2 px-4 rounded-md bg-blue-600 text-white font-medium">
                Personal
              </Link>
              <Link to="/business" className="py-2 px-4 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors">
                Business
              </Link>
            </div>
            
            <div className="flex space-x-3">
              <button className="bg-white px-4 py-2 rounded-md shadow text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Customize
              </button>
              <button 
                onClick={() => navigate('/alerts')}
                className="bg-blue-600 px-4 py-2 rounded-md shadow text-white flex items-center hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                New Alert
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/exchange-rates" className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-green-400 bg-opacity-30 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Currency Rates</h2>
            </div>
            <p className="opacity-80">View current and historical exchange rates for all currencies.</p>
          </Link>
          
          <Link to="/currency-converter" className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-blue-400 bg-opacity-30 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Compare Exchange Services</h2>
            </div>
            <p className="opacity-80">Find the best rates and lowest fees across multiple providers.</p>
          </Link>

          <Link to="/alerts" className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transition-transform hover:scale-105 cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-purple-400 bg-opacity-30 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Rate Alerts</h2>
            </div>
            <p className="opacity-80">Create alerts for favorable exchange rates and get notified.</p>
          </Link>
          
          {/* Remittance card positioned last and styled more subtly as it's not part of the MVP */}
          <Link to="/remittance" className="relative bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl shadow-lg p-6 text-white transition-transform hover:scale-105 opacity-90">
            <div className="absolute top-2 right-2 bg-blue-500 text-xs text-white px-2 py-1 rounded-full">
              Coming Soon
            </div>
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-gray-400 bg-opacity-30 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Send Money</h2>
            </div>
            <p className="opacity-80">Send money between African countries with low fees and fast delivery.</p>
          </Link>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Exchange Rate Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Exchange Rate Trends</h2>
              <div className="flex space-x-2">
                <select 
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={`${selectedCurrencyPair.from}-${selectedCurrencyPair.to}`}
                  onChange={(e) => {
                    const [from, to] = e.target.value.split('-');
                    setSelectedCurrencyPair({ from, to });
                  }}
                >
                  {popularCurrencyPairs.map(pair => (
                    <option key={`${pair.from}-${pair.to}`} value={`${pair.from}-${pair.to}`}>
                      {pair.from} to {pair.to}
                    </option>
                  ))}
                </select>
                <select 
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                  <option value="1year">Last year</option>
                </select>
              </div>
            </div>
            
            {/* Chart placeholder - Enhanced with better visualization */}
            <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Chart header with current rate */}
                <div className="absolute top-0 left-0 p-2 text-sm">
                  <span className="font-medium text-gray-700">Current Rate: </span>
                  <span className="text-lg font-bold text-blue-600">
                    {historicalData.length > 0 ? historicalData[historicalData.length - 1].rate : ''}
                  </span>
                  <span className="text-gray-500 ml-1">{selectedCurrencyPair.from}/{selectedCurrencyPair.to}</span>
                </div>
                
                {/* Simple chart visualization - updated to better scale for different currency pairs */}
                <div className="absolute inset-0 flex items-end pt-10 pb-6">
                  {historicalData.map((data, index) => {
                    // Calculate min and max to properly scale the chart
                    const values = historicalData.map(d => d.rate);
                    const min = Math.min(...values) * 0.99; // Add small buffer
                    const max = Math.max(...values) * 1.01;
                    const range = max - min;
                    
                    // Calculate height based on value relative to min/max
                    const heightPercentage = range ? ((data.rate - min) / range) * 100 : 50;
                    
                    return (
                      <div 
                        key={data.date}
                        className="flex-1 mx-1 bg-blue-500 rounded-t-sm transition-all duration-300"
                        style={{ 
                          height: `${heightPercentage}%`,
                          opacity: 0.7 + (index / historicalData.length * 0.3)
                        }}
                      >
                        <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
                          {data.rate}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gray-300"></div>
                <div className="absolute inset-y-0 left-0 w-px bg-gray-300"></div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              {/* Display abbreviated dates based on data length */}
              {historicalData.length > 10 
                ? historicalData.filter((_, i) => i % Math.ceil(historicalData.length / 8) === 0).map(data => (
                    <div key={data.date}>{formatDateLabel(data.date, timeFrame)}</div>
                  ))
                : historicalData.map(data => (
                    <div key={data.date}>{formatDateLabel(data.date, timeFrame)}</div>
                  ))
              }
            </div>
          </div>

          {/* Popular Rates */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Rates</h2>
            <ul className="space-y-3">
              {popularCurrencyPairs.map(pair => (
                <li key={`${pair.from}-${pair.to}`} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900">{pair.from}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="font-medium text-gray-900">{pair.to}</span>
                      </div>
                    </div>
                    <span className="font-mono font-medium">{pair.rate.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-end mt-1">
                    <Link to={`/currency-converter?from=${pair.from}&to=${pair.to}`} className="text-xs text-blue-600 hover:text-blue-800">
                      Compare providers →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Market News */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Market News & Updates</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium">USD strengthens against major currencies</h3>
                <p className="text-sm text-gray-600 mt-1">The dollar strengthened against major currencies following the Fed's decision to maintain current interest rates.</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium">Euro recovers after initial dip</h3>
                <p className="text-sm text-gray-600 mt-1">The Euro recovered from its early morning dip following positive economic data from Germany and France.</p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-medium">African currencies show mixed performance</h3>
                <p className="text-sm text-gray-600 mt-1">African currencies showed mixed performance this week with the NGN facing pressure while the ZAR remained stable.</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-800">View all news →</button>
          </div>

          {/* Recent Trends */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Trends</h2>
            <ul className="space-y-3">
              {recentTrends.map(trend => (
                <li key={trend.currency} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{trend.currency}/USD</span>
                  <span className={`flex items-center ${trend.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.trend === 'up' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    <span className="ml-1">{trend.percentage}</span>
                  </span>
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
              View All Trends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format date labels based on timeframe
function formatDateLabel(dateStr, timeFrame) {
  const date = new Date(dateStr);
  
  // Format differently based on timeframe
  switch(timeFrame) {
    case '7days':
      return date.toLocaleDateString(undefined, { weekday: 'short' });
    case '30days':
      return `${date.getMonth() + 1}/${date.getDate()}`;
    case '90days':
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    case '1year':
      return date.toLocaleDateString(undefined, { month: 'short' });
    default:
      return `${date.getMonth() + 1}/${date.getDate()}`;
  }
}

export default Dashboard;
