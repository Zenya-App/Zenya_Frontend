import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Mock data for African countries
const africanCountries = [
  { country: 'Nigeria', currency: 'NGN', flag: '🇳🇬' },
  { country: 'Ghana', currency: 'GHS', flag: '🇬🇭' },
  { country: 'Kenya', currency: 'KES', flag: '🇰🇪' },
  { country: 'South Africa', currency: 'ZAR', flag: '🇿🇦' },
  { country: 'Uganda', currency: 'UGX', flag: '🇺🇬' },
  { country: 'Tanzania', currency: 'TZS', flag: '🇹🇿' },
  { country: 'Rwanda', currency: 'RWF', flag: '🇷🇼' },
  { country: 'Senegal', currency: 'XOF', flag: '🇸🇳' },
  { country: 'Côte d\'Ivoire', currency: 'XOF', flag: '🇨🇮' },
  { country: 'Zimbabwe', currency: 'ZWL', flag: '🇿🇼' },
  { country: 'Botswana', currency: 'BWP', flag: '🇧🇼' },
  { country: 'Zambia', currency: 'ZMW', flag: '🇿🇲' }
];

// Strategic corridors based on market research
const strategicCorridors = [
  { from: 'Nigeria', to: 'Ghana', volume: 'High', growth: '+12%' },
  { from: 'Senegal', to: 'Côte d\'Ivoire', volume: 'Medium', growth: '+8%' },
  { from: 'Kenya', to: 'Uganda', volume: 'High', growth: '+15%' },
  { from: 'Tanzania', to: 'Rwanda', volume: 'Medium', growth: '+9%' },
  { from: 'South Africa', to: 'Zimbabwe', volume: 'Very High', growth: '+14%' },
  { from: 'Botswana', to: 'Zambia', volume: 'Medium', growth: '+7%' }
];

// Updated delivery methods with percentage-based fees
const deliveryMethods = [
  { id: 'mobile', name: 'Mobile Money', icon: '📱', feePercentage: 2.2, time: 'Instant - 1 hour', providers: ['M-Pesa', 'Orange Money', 'MTN Money'] },
  { id: 'wallet', name: 'Digital Wallet', icon: '💳', feePercentage: 0.8, time: 'Instant', providers: ['Zenya Wallet', 'Chipper Cash', 'PalmPay'] },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦', feePercentage: 3.5, time: '1-2 business days', providers: ['All major banks'] },
  { id: 'cash', name: 'Cash Pickup', icon: '💵', feePercentage: 2.5, time: 'Same day', providers: ['Local agents'] }
];

const recentTransfers = [
  { recipient: 'Ade Johnson', amount: '250.00', currency: 'GHS', date: '2023-11-10', status: 'completed', from: 'NGN' },
  { recipient: 'Kwame Mensah', amount: '150.00', currency: 'KES', date: '2023-11-05', status: 'completed', from: 'ZAR' },
  { recipient: 'Chioma Okafor', amount: '200.00', currency: 'UGX', date: '2023-10-28', status: 'completed', from: 'NGN' }
];

const Remittance = () => {
  const navigate = useNavigate();
  const [sendAmount, setSendAmount] = useState('1000');
  const [sendCountry, setSendCountry] = useState('Nigeria');
  const [sendCurrency, setSendCurrency] = useState('NGN');
  const [receiveCountry, setReceiveCountry] = useState('Ghana');
  const [receiveCurrency, setReceiveCurrency] = useState('GHS');
  const [receiveAmount, setReceiveAmount] = useState('9.00');
  const [deliveryMethod, setDeliveryMethod] = useState('mobile');
  const [exchangeRate, setExchangeRate] = useState(0.009);
  const [feePercentage, setFeePercentage] = useState(3.2); // Changed from fixed fee to percentage
  const [feeAmount, setFeeAmount] = useState(12); // Fee amount calculated based on percentage
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Set currency when country changes
  useEffect(() => {
    const country = africanCountries.find(c => c.country === sendCountry);
    if (country) {
      setSendCurrency(country.currency);
    }
  }, [sendCountry]);
  
  useEffect(() => {
    const country = africanCountries.find(c => c.country === receiveCountry);
    if (country) {
      setReceiveCurrency(country.currency);
    }
  }, [receiveCountry]);

  // Calculate receive amount when send amount or currency changes
  useEffect(() => {
    // Simulate API call to get exchange rate
    setIsLoading(true);
    setTimeout(() => {
      // Enhanced exchange rate matrix for all African currency pairs
      const baseRates = {
        'NGN-USD': 0.00069, // Base rates to USD to facilitate cross-currency conversions
        'GHS-USD': 0.081,
        'KES-USD': 0.0078,
        'ZAR-USD': 0.052,
        'UGX-USD': 0.00027,
        'TZS-USD': 0.00040,
        'RWF-USD': 0.00087,
        'XOF-USD': 0.0017,
        'ZWL-USD': 0.0031,
        'BWP-USD': 0.075,
        'ZMW-USD': 0.041
      };
      
      let rate;
      const directKey = `${sendCurrency}-${receiveCurrency}`;
      
      // Try direct conversion first (some common pairs)
      const directRates = {
        'NGN-GHS': 0.009,
        'NGN-KES': 0.085,
        'NGN-ZAR': 0.011,
        'GHS-NGN': 111.0,
        'KES-NGN': 11.8,
        'ZAR-NGN': 90.0,
        // Add more direct pairs as needed
      };
      
      if (directRates[directKey]) {
        // Use direct rate if available
        rate = directRates[directKey];
      } else if (sendCurrency === receiveCurrency) {
        // Same currency, rate is 1:1
        rate = 1;
      } else {
        // Calculate cross rate via USD
        const sendToUsd = baseRates[`${sendCurrency}-USD`] || 0;
        const receiveFromUsd = 1 / (baseRates[`${receiveCurrency}-USD`] || 1);
        rate = sendToUsd * receiveFromUsd;
      }
      
      setExchangeRate(rate);
      setReceiveAmount((parseFloat(sendAmount) * rate).toFixed(2));
      setIsLoading(false);
    }, 500);
  }, [sendAmount, sendCurrency, receiveCurrency]);

  // Update fee when delivery method or send amount changes
  useEffect(() => {
    const selectedMethod = deliveryMethods.find(method => method.id === deliveryMethod);
    if (selectedMethod) {
      setFeePercentage(selectedMethod.feePercentage);
      // Calculate fee amount based on percentage of send amount
      const calculatedFeeAmount = (parseFloat(sendAmount) * selectedMethod.feePercentage / 100).toFixed(2);
      setFeeAmount(calculatedFeeAmount);
    }
  }, [deliveryMethod, sendAmount]);

  // Calculate total amount (send amount + fee)
  const calculateTotal = () => {
    const sendAmountValue = parseFloat(sendAmount);
    const feeAmountValue = parseFloat(feeAmount);
    return (sendAmountValue + feeAmountValue).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process the remittance (would connect to API in real implementation)
      alert('Transfer initiated successfully!');
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Find recommended corridors for the selected sending country
  const recommendedCorridors = strategicCorridors.filter(
    corridor => corridor.from === sendCountry
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Intra-Africa Transfers</h1>
            <p className="text-gray-600">Fast and affordable money transfers between African countries</p>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-white px-4 py-2 rounded-md shadow text-gray-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </button>
            <button 
              onClick={() => navigate('/transaction-history')}
              className="bg-blue-600 px-4 py-2 rounded-md shadow text-white flex items-center hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Transaction History
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
              <span className="text-sm mt-2">Amount</span>
            </div>
            <div className="h-1 flex-grow mx-2 bg-gray-200">
              <div className={`h-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{width: `${step > 1 ? '100%' : '0%'}`}}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
              <span className="text-sm mt-2">Recipient</span>
            </div>
            <div className="h-1 flex-grow mx-2 bg-gray-200">
              <div className={`h-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{width: `${step > 2 ? '100%' : '0%'}`}}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
              <span className="text-sm mt-2">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            {/* African Union banner */}
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center">
                <div className="mr-4 text-2xl">🌍</div>
                <div>
                  <h3 className="font-medium text-gray-800">Supporting African Economic Integration</h3>
                  <p className="text-sm text-gray-600">Save up to 50% on fees compared to traditional providers for transfers between African countries.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Amount and Currency */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Transfer Details</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sending From</label>
                    <div className="flex">
                      <select
                        value={sendCountry}
                        onChange={(e) => setSendCountry(e.target.value)}
                        className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        {africanCountries.map(country => (
                          <option key={country.country} value={country.country}>
                            {country.flag} {country.country} ({country.currency})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sending To</label>
                    <div className="flex">
                      <select
                        value={receiveCountry}
                        onChange={(e) => setReceiveCountry(e.target.value)}
                        className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        {africanCountries
                          .filter(country => country.country !== sendCountry)
                          .map(country => (
                            <option key={country.country} value={country.country}>
                              {country.flag} {country.country} ({country.currency})
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  
                  {recommendedCorridors.length > 0 && (
                    <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-blue-800 mb-2">Popular Corridor</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{africanCountries.find(c => c.country === sendCountry)?.flag}</span>
                          <span className="font-medium">{sendCountry}</span>
                          <svg className="h-4 w-4 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                          <span className="text-lg mr-2">{africanCountries.find(c => c.country === recommendedCorridors[0].to)?.flag}</span>
                          <span className="font-medium">{recommendedCorridors[0].to}</span>
                        </div>
                        <div className="text-sm">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">{recommendedCorridors[0].growth} growth</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Send</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        className="block w-full px-4 py-3 rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        placeholder="0.00"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-gray-300 rounded-r-md text-gray-700">
                        {sendCurrency}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Gets</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={receiveAmount}
                        onChange={(e) => setReceiveAmount(e.target.value)}
                        className="block w-full px-4 py-3 rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        placeholder="0.00"
                        disabled={isLoading}
                      />
                      <div className="px-4 py-3 bg-gray-100 border-gray-300 rounded-r-md text-gray-700">
                        {receiveCurrency}
                      </div>
                    </div>
                    {isLoading && (
                      <div className="text-sm text-gray-500 mt-2 flex items-center">
                        <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Calculating...
                      </div>
                    )}
                    {!isLoading && (
                      <div className="text-sm text-gray-500 mt-2">
                        1 {sendCurrency} = {exchangeRate} {receiveCurrency}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {deliveryMethods.map((method) => (
                        <div 
                          key={method.id}
                          onClick={() => setDeliveryMethod(method.id)} 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${deliveryMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                        >
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{method.icon}</div>
                            <div>
                              <h3 className="font-medium">{method.name}</h3>
                              <div className="text-sm text-gray-500">
                                <div>Fee: {method.feePercentage}%</div>
                                <div>Time: {method.time}</div>
                              </div>
                              {method.providers && (
                                <div className="text-xs text-gray-400 mt-1">
                                  Providers: {method.providers.join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comparison with traditional providers */}
                  <div className="mt-8 bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <h3 className="text-sm font-medium text-orange-800 mb-2">Save on your transfer</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-gray-700">Zenya Fee</div>
                        <div className="font-medium text-green-600">{feePercentage}%</div>
                      </div>
                      <div className="text-gray-400">vs</div>
                      <div>
                        <div className="text-gray-700">Traditional Provider</div>
                        <div className="font-medium text-red-600">10%</div>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Save {10 - feePercentage}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Recipient Information */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recipient Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      placeholder="johndoe@example.com"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      placeholder="+234 800 123 4567"
                    />
                  </div>

                  {deliveryMethod === 'mobile' && (
                    <>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Money Provider</label>
                        <select
                          className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          {receiveCountry === 'Kenya' && (
                            <option>M-Pesa</option>
                          )}
                          {receiveCountry === 'Ghana' && (
                            <>
                              <option>MTN Mobile Money</option>
                              <option>Vodafone Cash</option>
                              <option>AirtelTigo Money</option>
                            </>
                          )}
                          {receiveCountry === 'Nigeria' && (
                            <>
                              <option>Paga</option>
                              <option>OPay</option>
                              <option>Palmpay</option>
                            </>
                          )}
                          {['Uganda', 'Rwanda', 'Tanzania'].includes(receiveCountry) && (
                            <option>MTN Mobile Money</option>
                          )}
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Money Number</label>
                        <input
                          type="text"
                          className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          placeholder="+234 800 123 4567"
                        />
                      </div>
                    </>
                  )}

                  {deliveryMethod === 'wallet' && (
                    <>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Wallet Provider</label>
                        <select
                          className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          <option value="">Select a wallet provider</option>
                          {receiveCountry === 'Ghana' && (
                            <>
                              <option>Zenya Wallet</option>
                              <option>Chipper Cash</option>
                              <option>Zeepay</option>
                              <option>ExpressPay</option>
                            </>
                          )}
                          {receiveCountry === 'Nigeria' && (
                            <>
                              <option>Zenya Wallet</option>
                              <option>PalmPay</option>
                              <option>OPay</option>
                              <option>Kuda</option>
                              <option>Chipper Cash</option>
                            </>
                          )}
                          {receiveCountry === 'Kenya' && (
                            <>
                              <option>Zenya Wallet</option>
                              <option>Chipper Cash</option>
                              <option>Flutterwave</option>
                            </>
                          )}
                          {['Uganda', 'Rwanda', 'Tanzania', 'South Africa'].includes(receiveCountry) && (
                            <>
                              <option>Zenya Wallet</option>
                              <option>Chipper Cash</option>
                            </>
                          )}
                        </select>
                        <p className="text-xs text-green-600 mt-1">✓ Lowest fees (0.8%) • Fastest transfer speed</p>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Recipient's Wallet ID</label>
                        <input
                          type="text"
                          className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          placeholder="Enter wallet ID or username"
                        />
                      </div>
                      
                      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start">
                          <div className="text-blue-500 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="text-sm text-blue-800">
                            <p>Transfer directly to a digital wallet for instant settlement with the lowest fees. The recipient can withdraw to their bank account or mobile money at any time.</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {deliveryMethod === 'bank' && (
                    <>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                        <input
                          type="text"
                          className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          placeholder="First Bank of Nigeria"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                        <input
                          type="text"
                          className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          placeholder="0123456789"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center mt-6">
                    <input type="checkbox" id="saveRecipient" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="saveRecipient" className="ml-2 block text-sm text-gray-700">Save recipient for future transfers</label>
                  </div>
                </div>
              )}
              
              {/* Step 3: Review and Confirm */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Transfer Details</h2>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="font-medium text-gray-700 mb-4">Transfer Summary</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">You send</span>
                        <span className="font-medium">{sendAmount} {sendCurrency}</span>
                      </div>
                      
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Transfer fee</span>
                        <span className="font-medium">{feePercentage}%</span>
                      </div>
                      
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Total amount</span>
                        <span className="font-medium">{calculateTotal()} {sendCurrency}</span>
                      </div>
                      
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Exchange rate</span>
                        <span className="font-medium">1 {sendCurrency} = {exchangeRate} {receiveCurrency}</span>
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <span className="text-gray-900 font-medium">Recipient gets</span>
                        <span className="text-blue-600 font-bold">{receiveAmount} {receiveCurrency}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="font-medium text-gray-700 mb-4">Recipient Information</h3>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <span className="ml-2">John Doe</span>
                      </div>
                      
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2">johndoe@example.com</span>
                      </div>
                      
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <span className="ml-2">+234 800 123 4567</span>
                      </div>
                      
                      {deliveryMethod === 'bank' && (
                        <>
                          <div>
                            <span className="text-gray-600">Bank:</span>
                            <span className="ml-2">First Bank of Nigeria</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Account:</span>
                            <span className="ml-2">0123456789</span>
                          </div>
                        </>
                      )}
                      
                      {deliveryMethod === 'mobile' && (
                        <div>
                          <span className="text-gray-600">Mobile Money:</span>
                          <span className="ml-2">+234 800 123 4567</span>
                        </div>
                      )}
                      
                      {deliveryMethod === 'wallet' && (
                        <>
                          <div>
                            <span className="text-gray-600">Wallet Provider:</span>
                            <span className="ml-2">Zenya Wallet</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Wallet ID:</span>
                            <span className="ml-2">john.doe@zenya</span>
                          </div>
                        </>
                      )}
                      
                      <div>
                        <span className="text-gray-600">Delivery Method:</span>
                        <span className="ml-2">{deliveryMethods.find(m => m.id === deliveryMethod).name}</span>
                      </div>
                      
                      <div>
                        <span className="text-gray-600">Delivery Time:</span>
                        <span className="ml-2">{deliveryMethods.find(m => m.id === deliveryMethod).time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-6">
                    <input type="checkbox" id="agreeTerms" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                      I agree to the <a href="/terms" className="text-blue-600 hover:underline">terms and conditions</a> and <a href="/privacy" className="text-blue-600 hover:underline">privacy policy</a>.
                    </label>
                  </div>
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {step === 3 ? 'Confirm Transfer' : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          {/* Side Panel */}
          <div>
            {/* Market Analysis */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">African Corridors</h2>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 mb-2">
                  <p>Intra-African remittances reached ~$14.2 billion in 2022 with 9% annual growth.</p>
                </div>
                <div className="border-t pt-3">
                  <h3 className="text-md font-medium mb-2">Key Corridors</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>🇳🇬</span>
                        <span className="mx-1">→</span>
                        <span>🇬🇭</span>
                        <span className="ml-2 text-sm">Nigeria-Ghana</span>
                      </div>
                      <span className="text-green-600 text-sm">+12%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>🇰🇪</span>
                        <span className="mx-1">→</span>
                        <span>🇺🇬</span>
                        <span className="ml-2 text-sm">Kenya-Uganda</span>
                      </div>
                      <span className="text-green-600 text-sm">+15%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>🇿🇦</span>
                        <span className="mx-1">→</span>
                        <span>🇿🇼</span>
                        <span className="ml-2 text-sm">South Africa-Zimbabwe</span>
                      </div>
                      <span className="text-green-600 text-sm">+14%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Popular Destinations */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Destinations</h2>
              <div className="grid grid-cols-2 gap-3">
                {africanCountries.slice(0, 6).map((country) => (
                  <div
                    key={country.currency}
                    onClick={() => {
                      setReceiveCountry(country.country);
                    }}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${receiveCountry === country.country ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}
                  >
                    <span className="text-2xl mr-3">{country.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{country.country}</div>
                      <div className="text-xs text-gray-500">{country.currency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Transfers */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transfers</h2>
              <ul className="space-y-4">
                {recentTransfers.map((transfer, index) => (
                  <li key={index} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{transfer.recipient}</div>
                        <div className="text-sm text-gray-500">{new Date(transfer.date).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{transfer.amount} {transfer.currency}</div>
                        <div className="text-xs text-gray-500">from {transfer.from}</div>
                        <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 inline-block mt-1">
                          {transfer.status}
                        </div>
                      </div>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-800 mt-2">
                      Send again
                    </button>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
                View All Transfers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Remittance;
