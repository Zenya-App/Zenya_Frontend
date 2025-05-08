import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaymentPlatformModal from '../components/PaymentPlatformModal';

// Mock data for expenses - adding historical rates
const mockExpenses = [
  { id: 'exp1', description: 'AWS Hosting', amount: 500, currency: 'USD', category: 'Software', date: '2023-12-01', historicalRate: 12.35 }, // Historical USD-GHS rate on 2023-12-01
  { id: 'exp2', description: 'Marketing Consultant', amount: 1200, currency: 'EUR', category: 'Services', date: '2023-12-05', historicalRate: 13.42 }, // Historical EUR-GHS rate on 2023-12-05
  { id: 'exp3', description: 'Office Rent', amount: 8000, currency: 'GHS', category: 'Facilities', date: '2023-12-01', historicalRate: 1 }, // GHS to GHS is always 1
  { id: 'exp4', description: 'Staff Salaries', amount: 15000, currency: 'GHS', category: 'Personnel', date: '2023-12-28', historicalRate: 1 },
  { id: 'exp5', description: 'Business Trip', amount: 750, currency: 'USD', category: 'Travel', date: '2023-12-15', historicalRate: 12.48 }, // Historical USD-GHS rate on 2023-12-15
  { id: 'exp6', description: 'Software Licenses', amount: 300, currency: 'EUR', category: 'Software', date: '2023-12-10', historicalRate: 13.55 }, // Historical EUR-GHS rate on 2023-12-10
];

// Mock exchange rates - current rates
const mockRates = {
  USD: 12.5,
  EUR: 13.6,
  GBP: 15.8,
  GHS: 1,
  NGN: 0.008
};

// Mock historical exchange rates database
const mockHistoricalRates = {
  "2023-12-01": { "USD": 12.35, "EUR": 13.40, "GBP": 15.65, "GHS": 1, "NGN": 0.0079 },
  "2023-12-05": { "USD": 12.40, "EUR": 13.42, "GBP": 15.70, "GHS": 1, "NGN": 0.0080 },
  "2023-12-10": { "USD": 12.45, "EUR": 13.55, "GBP": 15.75, "GHS": 1, "NGN": 0.0081 },
  "2023-12-15": { "USD": 12.48, "EUR": 13.60, "GBP": 15.80, "GHS": 1, "NGN": 0.0080 },
  "2023-12-20": { "USD": 12.50, "EUR": 13.62, "GBP": 15.85, "GHS": 1, "NGN": 0.0082 },
  "2023-12-25": { "USD": 12.47, "EUR": 13.59, "GBP": 15.82, "GHS": 1, "NGN": 0.0081 },
  "2023-12-28": { "USD": 12.52, "EUR": 13.63, "GBP": 15.86, "GHS": 1, "NGN": 0.0082 }
};

const BusinessDashboard = () => {
  const [baseCurrency, setBaseCurrency] = useState('GHS');
  const [expenses, setExpenses] = useState(mockExpenses);
  const [timeRange, setTimeRange] = useState('month');
  const [rateAlerts, setRateAlerts] = useState([
    { currency: 'EUR', change: '+5.2%', impact: 'high', message: 'EUR has risen significantly. Consider delaying EUR payments if possible.' },
    { currency: 'USD', change: '-1.3%', impact: 'low', message: 'USD has slightly decreased. Favorable for USD payments.' }
  ]);
  
  // Add state for expense modal
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    currency: 'GHS',
    category: 'Software',
    date: new Date().toISOString().split('T')[0],
    historicalRate: null
  });
  
  // Add state to display rate information
  const [showRateInfo, setShowRateInfo] = useState(false);
  
  // Add state for report modal and data
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState(null);
  
  // Updated state for payment platform connection with pre-connected platforms
  const [showPaymentPlatformModal, setShowPaymentPlatformModal] = useState(false);
  // Initialize with some mock connected platforms to simulate successful integration
  const [connectedPlatforms, setConnectedPlatforms] = useState([
    {
      id: 'wewire',
      name: 'WeWire',
      connectedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      lastSyncAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),   // 2 days ago
      status: 'active',
      importedTransactions: 32,
      logo: '💸',
      accountInfo: 'Business Account (****4382)'
    },
    {
      id: 'paybio',
      name: 'PayBio',
      connectedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      lastSyncAt: new Date(),  // Today
      status: 'active',
      importedTransactions: 18,
      logo: '💰',
      accountInfo: 'Main Account (john.doe@example.com)'
    }
  ]);
  
  // Handle successful platform connection
  const handlePlatformConnected = (connectionInfo) => {
    setConnectedPlatforms(prev => [
      ...prev, 
      {
        id: connectionInfo.platformId,
        name: connectionInfo.platformName,
        connectedAt: new Date(),
        lastSyncAt: new Date(),
        status: 'active',
        importedTransactions: connectionInfo.importResults.imported
      }
    ]);
    
    // Close the modal
    setShowPaymentPlatformModal(false);
    
    // Show success notification
    alert(`Successfully connected to ${connectionInfo.platformName} and imported ${connectionInfo.importResults.imported} transactions!`);
  };

  // Available payment platforms
  const paymentPlatforms = [
    { id: 'wewire', name: 'WeWire', logo: '💸', description: 'Connect your WeWire business account to automatically import transactions.' },
    { id: 'paybio', name: 'PayBio', logo: '💰', description: 'Integrate with PayBio for seamless transaction imports and payment tracking.' },
    { id: 'transwise', name: 'TransWise', logo: '💱', description: 'Link your TransWise account to track international payments and fees.' },
    { id: 'supapay', name: 'SupaPay', logo: '💳', description: 'Connect SupaPay to manage and track credit card payments in foreign currencies.' },
    { id: 'manual', name: 'Manual Import', logo: '📋', description: 'Upload a CSV or Excel file with your transaction data.' }
  ];
  
  // Handle platform connection
  const handleConnectPlatform = () => {
    alert(`Connecting to ${paymentPlatforms.find(p => p.id === selectedPlatform).name}. In a production app, this would redirect to the platform's authentication page.`);
    setShowPaymentPlatformModal(false);
  };

  // Categories for dropdown
  const categories = ['Software', 'Services', 'Facilities', 'Personnel', 'Travel', 'Other'];
  
  // Currencies for dropdown (use existing currencies from mockRates)
  const availableCurrencies = Object.keys(mockRates);
  
  // Watch for date/currency changes to update the historical rate
  useEffect(() => {
    if (newExpense.date && newExpense.currency) {
      updateHistoricalRate(newExpense.date, newExpense.currency);
    }
  }, [newExpense.date, newExpense.currency]);
  
  // Function to fetch and update the historical rate
  const updateHistoricalRate = (date, currency) => {
    const availableDates = Object.keys(mockHistoricalRates).sort();
    let closestDate = availableDates[0];
    
    for (const histDate of availableDates) {
      if (histDate <= date) {
        closestDate = histDate;
      } else {
        break;
      }
    }
    
    const rateForDate = mockHistoricalRates[closestDate]?.[currency] || 
                         mockRates[currency];
    
    setNewExpense(prev => ({
      ...prev,
      historicalRate: currency === baseCurrency ? 1 : rateForDate
    }));
    
    setShowRateInfo(true);
  };

  const validateRate = (rate) => {
    if (!rate || rate === 0) {
      console.warn('Invalid exchange rate detected, using fallback');
      return 1.0;
    }
    return rate;
  };
  
  const convertAmount = (amount, fromCurrency, toCurrency, historicalRate) => {
    if (fromCurrency === toCurrency) return amount;
    
    const validRate = validateRate(historicalRate);
    
    if (toCurrency === 'GHS') {
      return amount * validRate;
    }
    
    if (fromCurrency === 'GHS') {
      return amount / validateRate(mockRates[toCurrency]);
    }
    
    const amountInBase = amount * validRate;
    return amountInBase / validateRate(mockRates[toCurrency]);
  };

  const generateFullReport = () => {
    const reportData = {
      totalExpenses: totalInBaseCurrency,
      baseCurrency,
      currencyBreakdown: expensesByCurrency,
      categoryBreakdown: categoryDistribution,
      foreignCurrencyPercentage,
      timeRange,
      expenses,
      generatedAt: new Date().toLocaleString()
    };
    
    setReportData(reportData);
    setShowReportModal(true);
  };
  
  const timeRangeText = (range) => {
    switch(range) {
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'quarter': return 'This Quarter';
      case 'year': return 'This Year';
      default: return 'Custom Period';
    }
  };
  
  const calculateRateImpact = (expenseList, base) => {
    const expensesByForeignCurrency = expenseList.reduce((acc, expense) => {
      if (expense.currency !== base) {
        if (!acc[expense.currency]) {
          acc[expense.currency] = [];
        }
        acc[expense.currency].push(expense);
      }
      return acc;
    }, {});
    
    return Object.entries(expensesByForeignCurrency).map(([currency, exps]) => {
      const totalAmount = exps.reduce((sum, exp) => sum + exp.amount, 0);
      
      const avgHistoricalRate = exps.reduce((sum, exp) => sum + exp.historicalRate, 0) / exps.length;
      
      const currentRate = mockRates[currency];
      
      const rateDirection = base === 'GHS' ? 
        `1 ${currency} to ${base}` :
        `1 ${base} to ${currency}`;
      
      const diff = ((currentRate - avgHistoricalRate) / avgHistoricalRate) * 100;
      
      const historicalValueInBase = totalAmount * avgHistoricalRate;
      const currentValueInBase = totalAmount * currentRate;
      const absoluteDiff = currentValueInBase - historicalValueInBase;
      
      const formattedHistoricalRate = avgHistoricalRate.toFixed(2);
      const formattedCurrentRate = currentRate.toFixed(2);
      
      let message, effect;
      
      if (Math.abs(diff) < 0.5) {
        message = `Current rate (${formattedCurrentRate}) is very similar to your historical average (${formattedHistoricalRate}). No significant impact.`;
        effect = 'neutral';
      } else if (diff > 0) {
        message = `Rate has increased from ${formattedHistoricalRate} to ${formattedCurrentRate} (${diff.toFixed(1)}%) since your transactions. This has raised the value of these expenses by ${Math.abs(absoluteDiff).toFixed(2)} ${base}.`;
        effect = 'negative';
      } else {
        message = `Rate has decreased from ${formattedHistoricalRate} to ${formattedCurrentRate} (${Math.abs(diff).toFixed(1)}%) since your transactions. This has reduced the value of these expenses by ${Math.abs(absoluteDiff).toFixed(2)} ${base}.`;
        effect = 'positive';
      }
      
      return {
        currency,
        message,
        effect,
        rateDirection
      };
    });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    
    const expenseToAdd = {
      id: `exp${expenses.length + 1}`,
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      historicalRate: newExpense.currency === baseCurrency ? 
                    1 : 
                    newExpense.historicalRate
    };
    
    setExpenses([...expenses, expenseToAdd]);
    
    setNewExpense({
      description: '',
      amount: '',
      currency: 'GHS',
      category: 'Software',
      date: new Date().toISOString().split('T')[0],
      historicalRate: null
    });
    setShowAddExpenseModal(false);
    setShowRateInfo(false);
  };

  const totalInBaseCurrency = expenses.reduce((sum, expense) => {
    const convertedAmount = convertAmount(
      expense.amount, 
      expense.currency, 
      baseCurrency, 
      expense.historicalRate
    );
    return sum + convertedAmount;
  }, 0);

  const currencyDistribution = expenses.reduce((acc, expense) => {
    const convertedAmount = convertAmount(
      expense.amount, 
      expense.currency, 
      baseCurrency, 
      expense.historicalRate
    );
    
    if (!acc[expense.currency]) {
      acc[expense.currency] = 0;
    }
    acc[expense.currency] += convertedAmount;
    return acc;
  }, {});

  const categoryDistribution = expenses.reduce((acc, expense) => {
    const convertedAmount = convertAmount(
      expense.amount, 
      expense.currency, 
      baseCurrency, 
      expense.historicalRate
    );
    
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += convertedAmount;
    return acc;
  }, {});

  const foreignCurrencyPercentage = Object.entries(currencyDistribution).reduce((sum, [currency, amount]) => {
    if (currency !== baseCurrency) {
      return sum + (amount / totalInBaseCurrency) * 100;
    }
    return sum;
  }, 0);

  const expensesByCurrency = expenses.reduce((acc, expense) => {
    if (!acc[expense.currency]) {
      acc[expense.currency] = 0;
    }
    acc[expense.currency] += expense.amount;
    return acc;
  }, {});

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">MultiFX Manager</h1>
            <p className="text-gray-500 mt-1">Manage your multi-currency business expenses in one place</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
            <div className="bg-white rounded-lg shadow-sm flex p-1">
              <Link to="/dashboard" className="py-2 px-4 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors">
                Personal
              </Link>
              <Link to="/business" className="py-2 px-4 rounded-md bg-blue-600 text-white font-medium">
                Business
              </Link>
            </div>
            
            <button 
              onClick={() => setShowAddExpenseModal(true)}
              className="bg-blue-600 px-4 py-2 rounded-md shadow text-white flex items-center hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Expense
            </button>
          </div>
        </div>

        {showAddExpenseModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Add New Expense</h2>
                <button 
                  onClick={() => {
                    setShowAddExpenseModal(false);
                    setShowRateInfo(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      value={newExpense.currency}
                      onChange={(e) => setNewExpense({...newExpense, currency: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {availableCurrencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {showRateInfo && newExpense.currency !== baseCurrency && (
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-sm text-blue-800">
                      <span className="font-medium">Historical Exchange Rate:</span> 
                      <span className="ml-1">1 {newExpense.currency} = {newExpense.historicalRate?.toFixed(2)} {baseCurrency}</span>
                      <div className="text-xs mt-1">
                        Rate from {new Date(newExpense.date).toLocaleDateString()} will be used for this expense.
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddExpenseModal(false);
                      setShowRateInfo(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Total Expenses</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold text-gray-900">{totalInBaseCurrency.toFixed(2)}</div>
                  <div className="text-xl text-gray-500 ml-2">{baseCurrency}</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Total in {baseCurrency} (using historical rates)
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Original amounts:</h3>
                <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {foreignCurrencyPercentage.toFixed(1)}% foreign currencies
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 rounded-full overflow-hidden h-2 bg-gray-200">
                  {Object.entries(expensesByCurrency).map(([currency, amount], index, array) => {
                    const currencyTotal = array.reduce((sum, [_, amt]) => sum + amt, 0);
                    const percentage = (amount / currencyTotal) * 100;
                    
                    return (
                      <div 
                        key={currency}
                        className="h-full"
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: getColorForCurrency(currency),
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-2 mt-3">
                {Object.entries(expensesByCurrency)
                  .sort((a, b) => b[1] - a[1])
                  .map(([currency, amount]) => {
                    const currencyTotal = Object.values(expensesByCurrency).reduce((a, b) => a + b, 0);
                    const percentage = ((amount / currencyTotal) * 100).toFixed(1);
                    
                    const inBaseCurrency = expenses
                      .filter(exp => exp.currency === currency)
                      .reduce((sum, exp) => {
                        const rate = exp.historicalRate || 1;
                        return sum + (exp.currency === baseCurrency ? exp.amount : exp.amount * rate);
                      }, 0);
                    
                    return (
                      <div key={currency} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: getColorForCurrency(currency) }}></div>
                          <span className="font-medium">{currency}</span>
                          <span className="text-xs text-gray-500 ml-2">({percentage}%)</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{amount.toFixed(2)}</div>
                          {currency !== baseCurrency && (
                            <div className="text-xs text-gray-500">
                              = {inBaseCurrency.toFixed(2)} {baseCurrency}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Currency Exposure</h2>
            <div className="space-y-3">
              {Object.entries(currencyDistribution).map(([currency, amount]) => (
                <div key={currency} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: getColorForCurrency(currency) }}></div>
                    <span>{currency}</span>
                  </div>
                  <div className="font-medium">
                    {((amount / totalInBaseCurrency) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Rate Alerts</h2>
            <div className="space-y-3">
              {rateAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  alert.impact === 'high' ? 'bg-red-50 text-red-700' : 
                  alert.impact === 'medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'
                }`}>
                  <div className="flex justify-between">
                    <span className="font-medium">{alert.currency}</span>
                    <span className={alert.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {alert.change}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Expenses</h2>
              <div className="flex space-x-2">
                <select 
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value)}
                >
                  {availableCurrencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
                <select 
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="pb-3">Description</th>
                    <th className="pb-3">Original</th>
                    <th className="pb-3">In {baseCurrency}</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => {
                    const convertedAmount = convertAmount(
                      expense.amount,
                      expense.currency,
                      baseCurrency,
                      expense.historicalRate
                    );
                    
                    let rateDisplay;
                    if (expense.currency !== baseCurrency) {
                      if (baseCurrency === 'GHS') {
                        rateDisplay = `1 ${expense.currency} = ${expense.historicalRate.toFixed(2)} ${baseCurrency}`;
                      } else if (expense.currency === 'GHS') {
                        const rate = 1 / validateRate(mockRates[baseCurrency]);
                        rateDisplay = `1 ${expense.currency} = ${rate.toFixed(4)} ${baseCurrency}`;
                      } else {
                        const crossRate = expense.historicalRate / validateRate(mockRates[baseCurrency]);
                        rateDisplay = `1 ${expense.currency} = ${crossRate.toFixed(4)} ${baseCurrency}`;
                      }
                    }
                    
                    return (
                      <tr key={expense.id} className="border-b border-gray-100">
                        <td className="py-3">{expense.description}</td>
                        <td className="py-3">{expense.amount.toFixed(2)} {expense.currency}</td>
                        <td className="py-3 font-medium">
                          {convertedAmount.toFixed(2)}
                          {expense.currency !== baseCurrency && (
                            <span className="text-xs text-gray-500 block">
                              {rateDisplay}
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-gray-500">{formatDate(expense.date)}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded-full text-xs" 
                            style={{ 
                              backgroundColor: getCategoryColor(expense.category, '15'), 
                              color: getCategoryColor(expense.category)
                            }}>
                            {expense.category}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Expenses →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Spending Analytics</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">BY CATEGORY</h3>
              <div className="space-y-2">
                {Object.entries(categoryDistribution).map(([category, amount]) => (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category}</span>
                      <span className="font-medium">
                        {((amount / totalInBaseCurrency) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${(amount / totalInBaseCurrency) * 100}%`,
                          backgroundColor: getCategoryColor(category)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">INSIGHTS</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-800 text-sm">
                  <div className="font-medium mb-1">Rate Impact</div>
                  <p>EUR rate changes have increased your costs by 3.2% this month.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-green-800 text-sm">
                  <div className="font-medium mb-1">Saving Opportunity</div>
                  <p>Converting USD to GHS now could save approximately 2.5% vs last month.</p>
                </div>
              </div>
              
              <button 
                onClick={generateFullReport} 
                className="w-full mt-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Generate Full Report
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Integrations & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">Payment Platforms</h3>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Connected
                </div>
              </div>
              
              {connectedPlatforms.length === 0 ? (
                <>
                  <p className="text-gray-600 text-sm mb-4">Automatically import expenses from WeWire, PayBio or other payment services.</p>
                  <button 
                    onClick={() => setShowPaymentPlatformModal(true)} 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Connect Now →
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm">
                      <span className="text-green-600 font-medium">{connectedPlatforms.length}</span> platform{connectedPlatforms.length > 1 ? 's' : ''} connected
                      <span className="text-xs text-gray-500 ml-2">· Auto-syncing enabled</span>
                    </p>
                    <div className="mt-3 space-y-3">
                      {connectedPlatforms.map(platform => (
                        <div key={platform.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <div className="text-xl mr-3">{platform.logo}</div>
                              <div>
                                <div className="font-medium text-gray-800">{platform.name}</div>
                                <div className="text-xs text-gray-500">{platform.accountInfo}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                              <span className="text-xs font-medium text-green-700">Active</span>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                            <div>
                              {platform.importedTransactions} transactions imported
                            </div>
                            <div>
                              Last sync: {platform.lastSyncAt.toLocaleDateString()}
                            </div>
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between">
                            <button className="text-xs text-blue-600 hover:text-blue-800">
                              Sync Now
                            </button>
                            <button className="text-xs text-blue-600 hover:text-blue-800">
                              View Transactions
                            </button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">
                              Settings
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      Manage Connections
                    </button>
                    <button 
                      onClick={() => setShowPaymentPlatformModal(true)}
                      className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Another
                    </button>
                  </div>
                </>
              )}
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Export Reports</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Create custom reports for accounting, taxes, or business analysis.</p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Build Report →
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-yellow-100 p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Configure Alerts</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Set up custom notifications for rate changes and spending thresholds.</p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Setup Alerts →
              </button>
            </div>
          </div>
        </div>

        {/* Add Transaction Insights Card based on connected platforms */}
        {connectedPlatforms.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Imported Transaction Insights</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Total Imported</div>
                <div className="text-2xl font-bold text-gray-900">50</div>
                <div className="text-xs text-green-600 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  +18 this week
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Currency Coverage</div>
                <div className="text-2xl font-bold text-gray-900">3 Currencies</div>
                <div className="text-xs text-blue-600 mt-1">USD, EUR, GHS</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Next Sync</div>
                <div className="text-xl font-bold text-gray-900">Today, 11:30 PM</div>
                <div className="text-xs text-gray-600 mt-1">Auto-sync every 24 hours</div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-600">Recent Transactions</h4>
                <button className="text-xs text-blue-600 hover:text-blue-800">View All</button>
              </div>
              
              <div className="space-y-2">
                {[
                  { description: 'AWS Cloud Services', amount: '218.50', currency: 'USD', platform: 'WeWire', date: '2 days ago' },
                  { description: 'Office Supplies - Amazon', amount: '65.99', currency: 'EUR', platform: 'PayBio', date: 'Today' },
                  { description: 'Team Lunch', amount: '320.00', currency: 'GHS', platform: 'PayBio', date: 'Today' }
                ].map((tx, i) => (
                  <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                    <div>
                      <div className="font-medium">{tx.description}</div>
                      <div className="text-xs text-gray-500">
                        via {tx.platform} · {tx.date}
                      </div>
                    </div>
                    <div className="font-medium">
                      {tx.amount} {tx.currency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <PaymentPlatformModal 
        isOpen={showPaymentPlatformModal} 
        onClose={() => setShowPaymentPlatformModal(false)}
        onSuccess={handlePlatformConnected}
      />

      {showReportModal && reportData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-2 border-b">
              <h2 className="text-xl font-bold text-gray-900">Expense Report</h2>
              <div className="flex items-center">
                <button 
                  onClick={() => window.print()}
                  className="mr-3 text-blue-600 hover:text-blue-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="report-content">
              <div className="mb-6">
                <p className="text-sm text-gray-500">Generated on {reportData.generatedAt}</p>
                <h3 className="text-lg font-semibold mt-2">Expense Summary - {timeRangeText(reportData.timeRange)}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-1">Total Expenses</h4>
                  <div className="text-2xl font-bold">{reportData.totalExpenses.toFixed(2)} {reportData.baseCurrency}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-1">Foreign Currency</h4>
                  <div className="text-2xl font-bold">{reportData.foreignCurrencyPercentage.toFixed(1)}%</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-1">No. of Transactions</h4>
                  <div className="text-2xl font-bold">{reportData.expenses.length}</div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Currency Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex mb-2 rounded-full overflow-hidden h-6 bg-gray-200">
                      {Object.entries(reportData.currencyBreakdown).map(([currency, amount], index, array) => {
                        const currencyTotal = array.reduce((sum, [_, amt]) => sum + amt, 0);
                        const percentage = (amount / currencyTotal) * 100;
                        
                        return (
                          <div 
                            key={currency}
                            className="h-full"
                            style={{ 
                              width: `${percentage}%`, 
                              backgroundColor: getColorForCurrency(currency),
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Amount</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In {reportData.baseCurrency}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(reportData.currencyBreakdown)
                          .sort((a, b) => b[1] - a[1])
                          .map(([currency, originalAmount]) => {
                            const inBaseCurrency = reportData.expenses
                              .filter(exp => exp.currency === currency)
                              .reduce((sum, exp) => {
                                return sum + (exp.currency === reportData.baseCurrency ? 
                                  exp.amount : 
                                  convertAmount(exp.amount, exp.currency, reportData.baseCurrency, exp.historicalRate));
                              }, 0);
                            
                            return (
                              <tr key={currency}>
                                <td className="px-4 py-2 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: getColorForCurrency(currency) }}></div>
                                    <div className="font-medium text-sm">{currency}</div>
                                  </div>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">{originalAmount.toFixed(2)}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">{inBaseCurrency.toFixed(2)}</td>
                              </tr>
                            );
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Spending by Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      {Object.entries(reportData.categoryBreakdown)
                        .sort((a, b) => b[1] - a[1])
                        .map(([category, amount]) => {
                          const percentage = (amount / reportData.totalExpenses) * 100;
                          return (
                            <div key={category}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{category}</span>
                                <span>{percentage.toFixed(1)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                  className="h-3 rounded-full" 
                                  style={{ 
                                    width: `${percentage}%`,
                                    backgroundColor: getCategoryColor(category)
                                  }}
                                ></div>
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount ({reportData.baseCurrency})</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(reportData.categoryBreakdown)
                          .sort((a, b) => b[1] - a[1])
                          .map(([category, amount]) => {
                            const percentage = (amount / reportData.totalExpenses) * 100;
                            return (
                              <tr key={category}>
                                <td className="px-4 py-2 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: getCategoryColor(category) }}></div>
                                    <div className="font-medium text-sm">{category}</div>
                                  </div>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">{amount.toFixed(2)}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">{percentage.toFixed(1)}%</td>
                              </tr>
                            );
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Detailed Expenses</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original</th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In {reportData.baseCurrency}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportData.expenses
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((expense) => {
                          const convertedAmount = convertAmount(
                            expense.amount,
                            expense.currency,
                            reportData.baseCurrency,
                            expense.historicalRate
                          );
                        
                          return (
                            <tr key={expense.id}>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">{formatDate(expense.date)}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.description}</td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className="px-2 py-1 rounded-full text-xs" 
                                  style={{ 
                                    backgroundColor: getCategoryColor(expense.category, '15'), 
                                    color: getCategoryColor(expense.category)
                                  }}>
                                  {expense.category}
                                </span>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.amount.toFixed(2)} {expense.currency}</td>
                              <td className="px-4 py-2 whitespace-nowrap font-medium text-sm">{convertedAmount.toFixed(2)}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Exchange Rate Analysis</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-3 text-sm">Based on the current exchange rates compared to the historical rates used in your transactions:</p>
                  <ul className="space-y-2 text-sm">
                    {calculateRateImpact(reportData.expenses, reportData.baseCurrency).map((impact, index) => (
                      <li key={index} className={`p-2 rounded-md ${impact.effect === 'positive' ? 'bg-green-100 text-green-800' : impact.effect === 'negative' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                        <span className="font-medium">{impact.currency}:</span> {impact.message}
                        <div className="text-xs mt-1 font-medium">For {impact.rateDirection}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function getColorForCurrency(currency) {
  const colors = {
    USD: '#4f46e5',
    EUR: '#2563eb',
    GBP: '#9333ea',
    GHS: '#059669',
    NGN: '#b91c1c'
  };
  return colors[currency] || '#6b7280';
}

function getCategoryColor(category, opacity = '') {
  const colors = {
    Software: `#3b82f6${opacity}`,
    Services: `#8b5cf6${opacity}`,
    Facilities: `#10b981${opacity}`,
    Personnel: `#f59e0b${opacity}`,
    Travel: `#ef4444${opacity}`
  };
  return colors[category] || `#6b7280${opacity}`;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default BusinessDashboard;
