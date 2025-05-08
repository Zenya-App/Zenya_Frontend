import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Add the missing currencyLabels definition
const currencyLabels = {
  USD: { country: "United States", code: "us" },
  EUR: { country: "European Union", code: "eu" },
  GBP: { country: "United Kingdom", code: "gb" },
  JPY: { country: "Japan", code: "jp" },
  AUD: { country: "Australia", code: "au" },
  CAD: { country: "Canada", code: "ca" },
  CHF: { country: "Switzerland", code: "ch" },
  CNY: { country: "China", code: "cn" },
  NGN: { country: "Nigeria", code: "ng" },
  GHS: { country: "Ghana", code: "gh" },
  KES: { country: "Kenya", code: "ke" },
  ZAR: { country: "South Africa", code: "za" }
};

const popularCurrencyPairs = [
  { from: 'USD', to: 'EUR', rate: 0.9 },
  { from: 'USD', to: 'GBP', rate: 0.6 },
  { from: 'USD', to: 'NGN', rate: 1609.27 },
  { from: 'USD', to: 'GHS', rate: 14.1 }
];

const HomePage = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('NGN');
  const [livePairs, setLivePairs] = useState([]);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target)) {
        setFromDropdownOpen(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target)) {
        setToDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate mock live currency data
  useEffect(() => {
    const pairs = popularCurrencyPairs.map(pair => ({
      ...pair,
      change: (Math.random() * 2 - 1).toFixed(2),
      trend: Math.random() > 0.5 ? 'up' : 'down'
    }));
    setLivePairs(pairs);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              The All-in-One Solution for Cross-Border Finance
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Making cross-border financial transactions transparent, efficient, and easy to manage 
                through real-time data, cost comparisons, and automation.
              </p>
              
              <div className="space-y-6 mb-6">
                <div className="flex items-start">
                  <div className="bg-blue-500 bg-opacity-30 rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">For Individuals (B2C)</h3>
                    <p className="text-blue-100 text-sm">Remittance Comparator: Compare international money transfer services in real-time</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-500 bg-opacity-30 rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">For Businesses (B2B)</h3>
                    <p className="text-blue-100 text-sm">MultiFX Manager: Track, manage, and analyze your multi-currency expenses in real-time</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
              <Link 
              to="/signup" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
            >
              Compare Providers
            </Link>
            <Link ></Link>
                <Link to="/exchange-rates" className="bg-blue-500 bg-opacity-40 text-white font-bold py-3 px-6 rounded-lg border border-white border-opacity-30 hover:bg-opacity-60 transition-colors">
                  View Exchange Rates
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-10">
              {/* Currency Converter Widget */}
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
                <h2 className="text-gray-800 font-bold text-xl mb-4 flex items-center">
                  <span className="bg-blue-600 text-white p-1 rounded mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                    </svg>
                  </span>
                  Quick Conversion Estimator
                </h2>
                
                <p className="text-sm text-gray-500 mb-4">Note: We help you compare services, but don't transfer money directly.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter amount"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">{fromCurrency}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                      {/* Custom dropdown for 'from' currency */}
                      <div className="relative" ref={fromDropdownRef}>
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          onClick={() => setFromDropdownOpen(!fromDropdownOpen)}
                        >
                          <div className="flex items-center">
                            <img 
                              src={`https://flagcdn.com/w20/${currencyLabels[fromCurrency].code}.png`} 
                              alt={currencyLabels[fromCurrency].country} 
                              className="h-4 w-6 mr-2 object-cover"
                            />
                            {fromCurrency} - {currencyLabels[fromCurrency].country}
                          </div>
                          <svg className="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>

                        {/* Dropdown menu */}
                        {fromDropdownOpen && (
                          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {Object.keys(currencyLabels).map((code) => (
                              <button
                                key={code}
                                className={`${
                                  code === fromCurrency ? 'bg-gray-100' : ''
                                } w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 text-gray-900 font-medium`}
                                onClick={() => {
                                  setFromCurrency(code);
                                  setFromDropdownOpen(false);
                                }}
                              >
                                <img 
                                  src={`https://flagcdn.com/w20/${currencyLabels[code].code}.png`} 
                                  alt={currencyLabels[code].country} 
                                  className="h-4 w-6 mr-2 object-cover"
                                />
                                <span className="text-gray-900">{code} - {currencyLabels[code].country}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button className="p-2 bg-gray-100 rounded-full mt-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </button>
                    
                    <div className="flex-1 relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                      {/* Custom dropdown for 'to' currency */}
                      <div className="relative" ref={toDropdownRef}>
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          onClick={() => setToDropdownOpen(!toDropdownOpen)}
                        >
                          <div className="flex items-center">
                            <img 
                              src={`https://flagcdn.com/w20/${currencyLabels[toCurrency].code}.png`} 
                              alt={currencyLabels[toCurrency].country} 
                              className="h-4 w-6 mr-2 object-cover"
                            />
                            {toCurrency} - {currencyLabels[toCurrency].country}
                          </div>
                          <svg className="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>

                        {/* Dropdown menu */}
                        {toDropdownOpen && (
                          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {Object.keys(currencyLabels).map((code) => (
                              <button
                                key={code}
                                className={`${
                                  code === toCurrency ? 'bg-gray-100' : ''
                                } w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 text-gray-900 font-medium`}
                                onClick={() => {
                                  setToCurrency(code);
                                  setToDropdownOpen(false);
                                }}
                              >
                                <img 
                                  src={`https://flagcdn.com/w20/${currencyLabels[code].code}.png`} 
                                  alt={currencyLabels[code].country} 
                                  className="h-4 w-6 mr-2 object-cover"
                                />
                                <span className="text-gray-900">{code} - {currencyLabels[code].country}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Estimated amount</p>
                    {amount ? (
                      <p className="text-2xl font-bold text-gray-800">
                        {(amount * getExchangeRate(fromCurrency, toCurrency)).toFixed(2)} {toCurrency}
                      </p>
                    ) : (
                      <p className="text-2xl font-bold text-gray-400">0.00 {toCurrency}</p>
                    )}
                  </div>
                  
                  <Link 
                    to="/login" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-md flex justify-center items-center"
                  >
                    Find Best Provider
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Zenya</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We help you find the smartest way to send money internationally
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center shadow-sm">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Rates</h3>
              <p className="text-gray-600">
                Compare rates across multiple providers to ensure you get the best possible exchange rate every time.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-6 text-center shadow-sm">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Lowest Fees</h3>
              <p className="text-gray-600">
                We highlight hidden fees so you can easily identify and avoid high transfer costs.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 text-center shadow-sm">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Transfers</h3>
              <p className="text-gray-600">
                Find services that offer the quickest delivery times for your specific transfer needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Live Exchange Rates */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Live Exchange Rates</h2>
            <Link to="/login" className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
              View All Rates
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {livePairs.map(pair => (
              <div key={`${pair.from}-${pair.to}`} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-lg font-medium">{pair.from}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg font-medium">{pair.to}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{pair.rate}</span>
                    <span className={`inline-flex items-center text-sm ${pair.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {pair.trend === 'up' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {pair.change}%
                    </span>
                  </div>
                  <Link 
                    to={`/signup?from=${pair.from}&to=${pair.to}`} 
                    className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    Compare providers
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Providers Overview */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Providers We Compare</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We analyze rates, fees and transfer times across these trusted providers
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center">
            {['Wise', 'Western Union', 'MoneyGram', 'Remitly', 'WorldRemit', 'SendWave', 'Xoom', 'PaySend', 'Revolut', 'Skrill'].map(provider => (
              <div key={provider} className="text-center">
                <div className="bg-gray-100 rounded-xl w-20 h-20 flex items-center justify-center mx-auto mb-2 text-2xl font-bold">
                  {provider.charAt(0)}
                </div>
                <p className="font-medium text-sm text-gray-800">{provider}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Compare All Providers
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Coverage Map */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Coverage, African Focus</h2>
              <p className="text-lg text-gray-700 mb-6">
                We cover money transfers to and from over 50 countries worldwide, with specialized expertise in African corridors where finding reliable and affordable transfer options can be challenging.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Ghana', 'Nigeria', 'Kenya', 'South Africa', 'Uganda', 'Tanzania'].map(country => (
                  <div key={country} className="bg-white rounded-lg p-2 text-center shadow-sm">
                    <span className="text-sm font-medium text-gray-800">{country}</span>
                  </div>
                ))}
                <div className="bg-blue-600 rounded-lg p-2 text-center shadow-sm">
                  <span className="text-sm font-medium text-white">+ 44 more</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white p-4 rounded-xl shadow-md">
                {/* World map visualization would go here - for simplicity just showing a placeholder */}
                <div className="bg-blue-50 h-64 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-medium">World Coverage Map</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to save money?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start comparing providers now to find the best deal for your specific transfer needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
            >
              Compare Providers
            </Link>
            <Link 
              to="/login" 
              className="bg-blue-500 bg-opacity-40 text-white hover:bg-opacity-60 font-bold py-3 px-8 rounded-lg transition-colors border border-white border-opacity-30"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Zenya</h3>
              <p className="text-sm">
                Helping you find the smartest way to send money globally
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/platforms" className="hover:text-white">Compare Providers</Link></li>
                <li><Link to="/exchange-rates" className="hover:text-white">Currency Rates</Link></li>
                <li><Link to="/alerts" className="hover:text-white">Rate Alerts</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Guides</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Zenya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper function to get exchange rate
const getExchangeRate = (from, to) => {
  // These would ideally come from your actual rates data
  const baseRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 145,
    NGN: 1500,
    GHS: 14.5,
    // ...add other currencies as needed
  };
  
  if (baseRates[from] && baseRates[to]) {
    return baseRates[to] / baseRates[from];
  }
  
  return 1; // Fallback
};

export default HomePage;
