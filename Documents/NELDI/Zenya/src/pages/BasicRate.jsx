import React, { useState } from "react";

const currencyRates = {
  USD: 1,
  EUR: 0.94,
  GBP: 0.81,
  GHS: 14.6,
  NGN: 1420,
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

  const filteredRates = Object.entries(currencyRates).filter(([code]) => {
    const label = currencyLabels[code];
    const term = searchTerm.toLowerCase();
    return (
      code.toLowerCase().includes(term) ||
      label?.country.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">🌍 Daily Exchange Rates</h1>
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search for a currency or country..."
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Added more prominent link at the top of the content */}
      <div className="max-w-xl mx-auto mb-8 text-center">
        <a 
          href="/currency-converter" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl w-full justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span>Compare Currency Exchange Services</span>
        </a>
        <p className="mt-2 text-sm text-gray-600 font-medium">
          Find the best rates and lowest fees across multiple providers
        </p>
      </div>

      {filteredRates.length === 0 ? (
        <div className="text-center text-gray-500">No currencies found for your search.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {filteredRates.map(([code, rate]) => {
            const label = currencyLabels[code];
            return (
              <div
                key={code}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg flex items-center gap-4 transition"
              >
                <img
                  src={`https://flagcdn.com/w40/${label.code}.png`}
                  alt={label.country}
                  className="w-8 h-6 object-cover rounded-sm"
                />
                <div>
                  <div className="font-semibold">{label.country} ({code})</div>
                  <div className="text-gray-600">Rate: {rate}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Keep bottom button for users who scroll through all rates */}
      <div className="mt-10 text-center">
        <a 
          href="/currency-converter" 
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <span>Compare Currency Exchange Services</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
        <p className="mt-3 text-sm text-gray-500">
          Find the best exchange rates and lowest fees across multiple providers
        </p>
      </div>
    </div>
  );
};

export default CurrencyRates;
