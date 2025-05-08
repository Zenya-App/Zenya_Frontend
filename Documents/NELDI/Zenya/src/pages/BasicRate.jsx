import React, { useState } from "react";

const currencyRates = {
  USD: 1,
  EUR: 0.94,
  GBP: 0.81,
  GHS: 14.6,
  NGN: 1610.18,
  ZAR: 18.2,
  KES: 130,
  INR: 83.3,
  JPY: 155,
  CNY: 7.2,
  CAD: 1.36,
  AUD: 1.52,
  BRL: 5.1,
  EGP: 48.5,
  TZS: 2520,
  UGX: 3820,
  XAF: 612,
  XOF: 610,
  PKR: 278,
  BDT: 117,
  LKR: 305,
  MAD: 10.1,
  TND: 3.1,
  GMD: 67.5,
  ETB: 57.2,
};

const currencyLabels = {
  USD: { country: "United States", code: "us" },
  EUR: { country: "European Union", code: "eu" },
  GBP: { country: "United Kingdom", code: "gb" },
  GHS: { country: "Ghana", code: "gh" },
  NGN: { country: "Nigeria", code: "ng" },
  ZAR: { country: "South Africa", code: "za" },
  KES: { country: "Kenya", code: "ke" },
  INR: { country: "India", code: "in" },
  JPY: { country: "Japan", code: "jp" },
  CNY: { country: "China", code: "cn" },
  CAD: { country: "Canada", code: "ca" },
  AUD: { country: "Australia", code: "au" },
  BRL: { country: "Brazil", code: "br" },
  EGP: { country: "Egypt", code: "eg" },
  TZS: { country: "Tanzania", code: "tz" },
  UGX: { country: "Uganda", code: "ug" },
  XAF: { country: "Central African CFA", code: "cf" },
  XOF: { country: "West African CFA", code: "sn" },
  PKR: { country: "Pakistan", code: "pk" },
  BDT: { country: "Bangladesh", code: "bd" },
  LKR: { country: "Sri Lanka", code: "lk" },
  MAD: { country: "Morocco", code: "ma" },
  TND: { country: "Tunisia", code: "tn" },
  GMD: { country: "Gambia", code: "gm" },
  ETB: { country: "Ethiopia", code: "et" },
};

const CurrencyRates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [selectedRegion, setSelectedRegion] = useState("All");

  // Group currencies by region
  const regions = {
    All: Object.keys(currencyRates),
    Africa: ["NGN", "GHS", "ZAR", "KES", "TZS", "UGX", "XAF", "XOF", "MAD", "TND", "GMD", "ETB"],
    Asia: ["INR", "JPY", "CNY", "PKR", "BDT", "LKR"],
    Americas: ["USD", "CAD", "BRL"],
    Europe: ["EUR", "GBP"],
    Oceania: ["AUD"]
  };

  const filteredCurrencies = regions[selectedRegion].filter(code => {
    const label = currencyLabels[code];
    const term = searchTerm.toLowerCase();
    return (
      code.toLowerCase().includes(term) ||
      label?.country.toLowerCase().includes(term)
    );
  });

  const calculateRate = (currency) => {
    if (baseCurrency === currency) return 1;
    return currencyRates[currency] / currencyRates[baseCurrency];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <h1 
            className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fadeIn"
          >
            <span className="text-3xl mr-2">🌍</span> Global Exchange Rates
          </h1>
          <p 
            className="text-xl text-center text-blue-100 max-w-2xl mx-auto animate-fadeInDelayed"
          >
            Live currency rates updated daily from reliable financial sources
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 mb-12">
        <div 
          className="bg-white rounded-xl shadow-xl p-6 animate-slideUp"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Currency</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for a currency or country..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Currency</label>
              <select
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {Object.keys(currencyRates).map(code => (
                  <option key={code} value={code}>
                    {code} - {currencyLabels[code].country}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {Object.keys(regions).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="/currency-converter" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all hover:shadow-lg hover:scale-[1.02] shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Compare Exchange Services</span>
            </a>
            <p className="mt-2 text-sm text-gray-600">
              Find the best rates and lowest fees across multiple providers
            </p>
          </div>
        </div>
      </div>

      {/* Base Currency Card */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <img
              src={`https://flagcdn.com/w80/${currencyLabels[baseCurrency].code}.png`}
              alt={currencyLabels[baseCurrency].country}
              className="w-16 h-12 object-cover rounded-md shadow"
            />
            <div>
              <h2 className="text-xl font-bold">{baseCurrency} - {currencyLabels[baseCurrency].country}</h2>
              <p className="text-sm text-blue-100">All rates shown relative to 1 {baseCurrency}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {filteredCurrencies.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 mb-6">
          <div className="text-gray-500 text-sm">
            Showing {filteredCurrencies.length} currencies {searchTerm ? `matching "${searchTerm}"` : ''}
          </div>
        </div>
      )}
      
      {/* Currency Cards */}
      {filteredCurrencies.length === 0 ? (
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white p-12 rounded-xl shadow text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-500">No currencies found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search term or region filter</p>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCurrencies.map((code) => {
              const label = currencyLabels[code];
              const rate = calculateRate(code);
              const isBase = code === baseCurrency;
              
              return (
                <div
                  key={code}
                  className={`rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 overflow-hidden ${isBase ? 'border-2 border-blue-500' : 'bg-white'}`}
                >
                  <div className="relative">
                    <img
                      src={`https://flagcdn.com/w640/${label.code}.png`}
                      alt={label.country}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-2 left-4 text-white font-bold text-lg">
                      {code}
                    </div>
                    {isBase && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                        BASE
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-gray-800">{label.country}</div>
                      <div className={`text-lg font-bold ${isBase ? 'text-blue-600' : 'text-gray-900'}`}>
                        {isBase ? '1.0000' : rate.toFixed(4)}
                      </div>
                    </div>
                    {!isBase && (
                      <div className="mt-2 text-sm text-gray-500 flex items-center justify-between">
                        <div>1 {baseCurrency} = {rate.toFixed(4)} {code}</div>
                        <div>1 {code} = {(1/rate).toFixed(4)} {baseCurrency}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Bottom CTA */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Need to send money internationally?</h3>
          <p className="text-gray-600 mb-4">Compare exchange rates and fees from trusted providers</p>
          <a 
            href="/currency-converter" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all hover:shadow-lg hover:scale-[1.02] shadow"
          >
            <span>Find the Best Exchange Service</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CurrencyRates;
