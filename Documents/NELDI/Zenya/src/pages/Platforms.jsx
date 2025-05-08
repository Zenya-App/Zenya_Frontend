import React, { useState, useRef, useEffect } from "react";

const currencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
  'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'INR', 'RUB', 'BRL', 'ZAR',
  'NGN', 'GHS', 'KES', 'EGP', 'MAD', 'TND', 'PKR', 'BDT', 'IDR', 'THB'
];

// Add currency labels with country codes for flags
const currencyLabels = {
  USD: { country: "United States", code: "us" },
  EUR: { country: "European Union", code: "eu" },
  GBP: { country: "United Kingdom", code: "gb" },
  JPY: { country: "Japan", code: "jp" },
  AUD: { country: "Australia", code: "au" },
  CAD: { country: "Canada", code: "ca" },
  CHF: { country: "Switzerland", code: "ch" },
  CNY: { country: "China", code: "cn" },
  SEK: { country: "Sweden", code: "se" },
  NZD: { country: "New Zealand", code: "nz" },
  MXN: { country: "Mexico", code: "mx" },
  SGD: { country: "Singapore", code: "sg" },
  HKD: { country: "Hong Kong", code: "hk" },
  NOK: { country: "Norway", code: "no" },
  KRW: { country: "South Korea", code: "kr" },
  TRY: { country: "Turkey", code: "tr" },
  INR: { country: "India", code: "in" },
  RUB: { country: "Russia", code: "ru" },
  BRL: { country: "Brazil", code: "br" },
  ZAR: { country: "South Africa", code: "za" },
  NGN: { country: "Nigeria", code: "ng" },
  GHS: { country: "Ghana", code: "gh" },
  KES: { country: "Kenya", code: "ke" },
  EGP: { country: "Egypt", code: "eg" },
  MAD: { country: "Morocco", code: "ma" },
  TND: { country: "Tunisia", code: "tn" },
  PKR: { country: "Pakistan", code: "pk" },
  BDT: { country: "Bangladesh", code: "bd" },
  IDR: { country: "Indonesia", code: "id" },
  THB: { country: "Thailand", code: "th" }
};

// Replace platform data with actual remittance platforms
const platforms = [
  {
    name: "Wise",
    rates: {},
    fees: {},
    times: {},
    feePercent: 1.2,
    baseFee: 3.50,
    speed: "1 hour",
    link: "https://wise.com"
  },
  {
    name: "Remitly",
    rates: {},
    fees: {},
    times: {},
    feePercent: 1.8,
    baseFee: 2.99,
    speed: "minutes",
    link: "https://remitly.com"
  },
  {
    name: "WorldRemit",
    rates: {},
    fees: {},
    times: {},
    feePercent: 2.0,
    baseFee: 3.99,
    speed: "1–2 hours",
    link: "https://worldremit.com"
  },
  {
    name: "PaySend",
    rates: {},
    fees: {},
    times: {},
    feePercent: 1.5,
    baseFee: 2.00,
    speed: "within a day",
    link: "https://paysend.com"
  },
  {
    name: "SendWave",
    rates: {},
    fees: {},
    times: {},
    feePercent: 1.0,
    baseFee: 1.50,
    speed: "instant",
    link: "https://sendwave.com"
  },
  {
    name: "Xoom",
    rates: {},
    fees: {},
    times: {},
    feePercent: 2.2,
    baseFee: 4.99,
    speed: "minutes",
    link: "https://xoom.com"
  },
  {
    name: "Western Union",
    rates: {},
    fees: {},
    times: {},
    feePercent: 3.0,
    baseFee: 5.99,
    speed: "same day",
    link: "https://westernunion.com"
  },
  {
    name: "MoneyGram",
    rates: {},
    fees: {},
    times: {},
    feePercent: 3.5,
    baseFee: 4.99,
    speed: "within hours",
    link: "https://moneygram.com"
  },
  {
    name: "Azimo",
    rates: {},
    fees: {},
    times: {},
    feePercent: 1.7,
    baseFee: 2.49,
    speed: "1–2 hours",
    link: "https://azimo.com"
  },
  {
    name: "Skrill",
    rates: {},
    fees: {},
    times: {},
    feePercent: 2.3,
    baseFee: 3.99,
    speed: "1–2 days",
    link: "https://skrill.com"
  },
  {
    name: "Revolut",
    rates: {},
    fees: {},
    times: {},
    feePercent: 1.4,
    baseFee: 4.00,
    speed: "same day",
    link: "https://revolut.com"
  },
  {
    name: "XE",
    rates: {},
    fees: {},
    times: {},
    feePercent: 1.9,
    baseFee: 3.50,
    speed: "minutes",
    link: "https://xe.com"
  },
  {
    name: "XTransfer",
    rates: {},
    fees: {},
    times: {},
    feePercent: 1.3,
    baseFee: 2.75,
    speed: "same day",
    link: "https://xtransfer.com"
  },
  {
    name: "Nium",
    rates: {},
    fees: {},
    times: {},
    feePercent: 1.6,
    baseFee: 3.25,
    speed: "within hours",
    link: "https://nium.com"
  }
];

// Define specific rates for each platform, based on provided data
const platformRates = {
  "Wise": {
    "USD-GHS": 11.05,
    "EUR-GHS": 13.10,
    "USD-KES": 132.30,
    "USD-NGN": 1609.75,
    "GBP-GHS": 14.25,
    "USD-ZAR": 18.20,
    "EUR-NGN": 1725.80
  },
  "Remitly": {
    "USD-GHS": 10.90,
    "EUR-GHS": 12.95,
    "USD-KES": 130.50,
    "USD-NGN": 1600.50,
    "GBP-GHS": 14.00,
    "USD-ZAR": 18.00,
    "EUR-NGN": 1715.60
  },
  "WorldRemit": {
    "USD-GHS": 11.00,
    "EUR-GHS": 12.88,
    "USD-KES": 131.90,
    "USD-NGN": 1590.25,
    "GBP-GHS": 14.05,
    "USD-ZAR": 17.90,
    "EUR-NGN": 1698.50
  },
  "PaySend": {
    "USD-GHS": 10.80,
    "EUR-GHS": 12.75,
    "USD-KES": 129.90,
    "USD-NGN": 1580.00,
    "GBP-GHS": 13.85,
    "USD-ZAR": 17.85,
    "EUR-NGN": 1690.30
  },
  "SendWave": {
    "USD-GHS": 11.00,
    "USD-KES": 132.00,
    "USD-NGN": 1605.60,
    "USD-ZAR": 18.10
  },
  "Xoom": {
    "USD-GHS": 10.85,
    "USD-NGN": 1595.75,
    "USD-KES": 131.20,
    "EUR-GHS": 12.90,
    "USD-ZAR": 17.95,
    "EUR-NGN": 1705.60
  },
  "Western Union": {
    "USD-GHS": 10.70,
    "USD-KES": 129.80,
    "USD-NGN": 1570.00,
    "USD-ZAR": 17.60
  },
  "MoneyGram": {
    "USD-GHS": 10.60,
    "USD-KES": 129.00,
    "USD-NGN": 1565.00,
    "USD-ZAR": 17.55
  },
  "Azimo": {
    "USD-GHS": 10.95,
    "USD-KES": 130.70,
    "USD-NGN": 1585.00,
    "EUR-NGN": 1700.00,
    "USD-ZAR": 17.80
  },
  "Skrill": {
    "USD-GHS": 10.75,
    "USD-KES": 130.10,
    "USD-NGN": 1582.50,
    "EUR-NGN": 1702.20,
    "USD-ZAR": 18.05
  },
  "Revolut": {
    "USD-GHS": 11.02,
    "EUR-GHS": 13.05,
    "USD-KES": 131.50,
    "USD-NGN": 1608.10,
    "GBP-GHS": 14.10,
    "USD-ZAR": 18.15,
    "EUR-NGN": 1720.00
  },
  "XE": {
    "USD-GHS": 10.92,
    "EUR-GHS": 12.98,
    "USD-KES": 130.80,
    "USD-NGN": 1598.00,
    "GBP-GHS": 13.95,
    "USD-ZAR": 18.00,
    "EUR-NGN": 1710.90
  },
  "XTransfer": {
    "USD-GHS": 11.10,
    "USD-KES": 133.00,
    "USD-NGN": 1612.50,
    "USD-ZAR": 18.25
  },
  "Nium": {
    "USD-GHS": 11.00,
    "EUR-GHS": 13.00,
    "USD-KES": 132.50,
    "USD-NGN": 1609.27,
    "GBP-GHS": 14.20,
    "USD-ZAR": 18.10,
    "EUR-NGN": 1723.80
  }
};

// Initialize the platforms with rates and calculate fees/times
platforms.forEach(platform => {
  const specificRates = platformRates[platform.name] || {};
  
  currencies.forEach(from => {
    currencies.forEach(to => {
      if (from !== to) {
        const pair = `${from}-${to}`;
        
        // Check if there's a specific rate for this pair and platform
        if (specificRates[pair]) {
          // Use the exact rate from our defined platform rates
          platform.rates[pair] = specificRates[pair];
        } else {
          // For pairs not explicitly defined, use a more realistic rate calculation
          const baseRate = getBaseExchangeRate(from, to);
          
          // Apply platform-specific variation (±0.5-2%)
          // Different platforms have slightly different rates due to their margins
          const platformVariation = 1 + ((platform.feePercent - 2) / 100); // Higher fee platforms tend to have better rates
          const marketSpread = 0.005 + (Math.random() * 0.015); // 0.5-2% market spread
          
          // Calculate the final rate
          platform.rates[pair] = parseFloat((baseRate * platformVariation * (1 - marketSpread)).toFixed(4));
          
          // For exotic currency pairs, reduce the rate slightly to reflect higher spreads
          if (!isCommonCurrency(from) || !isCommonCurrency(to)) {
            platform.rates[pair] *= 0.98; // Additional 2% spread for exotic pairs
          }
        }
        
        // Calculate fee using a base fee plus percentage
        const baseFeeToCurrency = platform.baseFee * platform.rates[pair];
        const typicalAmount = 100;
        const percentageFeeAmount = typicalAmount * (platform.feePercent / 100);
        
        platform.fees[pair] = parseFloat((baseFeeToCurrency + percentageFeeAmount).toFixed(2));
        
        // Assign realistic time based on the currency corridor and platform speed
        let baseTimeMinutes;
        switch(platform.speed) {
          case "instant":
            baseTimeMinutes = 2 + Math.floor(Math.random() * 8); // 2-10 mins
            break;
          case "minutes":
            baseTimeMinutes = 10 + Math.floor(Math.random() * 20); // 10-30 mins
            break;
          case "1 hour":
            baseTimeMinutes = 45 + Math.floor(Math.random() * 30); // 45-75 mins
            break;
          case "1–2 hours":
            baseTimeMinutes = 60 + Math.floor(Math.random() * 60); // 60-120 mins
            break;
          case "within hours":
            baseTimeMinutes = 120 + Math.floor(Math.random() * 180); // 2-5 hours
            break;
          case "same day":
            baseTimeMinutes = 180 + Math.floor(Math.random() * 360); // 3-9 hours
            break;
          case "within a day":
            baseTimeMinutes = 360 + Math.floor(Math.random() * 720); // 6-18 hours
            break; 
          case "1–2 days":
            baseTimeMinutes = 1440 + Math.floor(Math.random() * 1440); // 24-48 hours
            break;
          default:
            baseTimeMinutes = 240 + Math.floor(Math.random() * 480); // 4-12 hours
        }
        
        // Add corridor-specific time adjustments
        // High volume corridors (like USD-EUR) are faster
        if (isHighVolumeCorridor(from, to)) {
          baseTimeMinutes = Math.max(1, Math.floor(baseTimeMinutes * 0.7)); // 30% faster
        } 
        // Exotic corridors take longer
        else if (isExoticCorridor(from, to)) {
          baseTimeMinutes = Math.floor(baseTimeMinutes * 1.5); // 50% slower
        }
        
        platform.times[pair] = baseTimeMinutes;
      }
    });
  });
});

// Helper function to determine if a currency is common
function isCommonCurrency(currency) {
  const commonCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
  return commonCurrencies.includes(currency);
}

// Helper function to identify high-volume corridors
function isHighVolumeCorridor(from, to) {
  // Major currency pairs typically have high volumes
  const majorPairs = [
    'USD-EUR', 'EUR-USD', 
    'USD-GBP', 'GBP-USD', 
    'USD-JPY', 'JPY-USD',
    'USD-CAD', 'CAD-USD',
    'USD-CHF', 'CHF-USD',
    'EUR-GBP', 'GBP-EUR'
  ];
  
  return majorPairs.includes(`${from}-${to}`) || majorPairs.includes(`${to}-${from}`);
}

// Helper function to identify exotic currency corridors
function isExoticCorridor(from, to) {
  const exoticCurrencies = ['IDR', 'THB', 'PKR', 'BDT', 'KES', 'TND', 'MAD'];
  return exoticCurrencies.includes(from) || exoticCurrencies.includes(to);
}

// Get a more realistic base exchange rate
function getBaseExchangeRate(base, target) {
  const baseRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 145,
    AUD: 1.5,
    CAD: 1.35,
    CHF: 0.9,
    CNY: 7.2,
    SEK: 11,
    NZD: 1.6,
    MXN: 17,
    SGD: 1.35,
    HKD: 7.8,
    NOK: 10,
    KRW: 1300,
    TRY: 30,
    INR: 83,
    RUB: 95,
    BRL: 5,
    ZAR: 19,
    NGN: 1500,
    GHS: 14.5,
    KES: 130,
    EGP: 47,
    MAD: 10,
    TND: 3.1,
    PKR: 280,
    BDT: 110,
    IDR: 16000,
    THB: 36
  };
  
  // If we have rates for both currencies, calculate a cross rate
  if (baseRates[base] && baseRates[target]) {
    const usdToBase = baseRates[base];
    const usdToTarget = baseRates[target];
    
    return usdToTarget / usdToBase;
  }
  
  // Fallback for currencies we don't have in our list
  return parseFloat(getRandomRate(base, target));
}

// Keep the getRandomRate function as a fallback
function getRandomRate(base, target) {
  const random = Math.random();
  const baseRate = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 145,
    AUD: 1.5,
    CAD: 1.35,
    CHF: 0.9,
    CNY: 7.2,
    SEK: 11,
    NZD: 1.6,
    MXN: 17,
    SGD: 1.35,
    HKD: 7.8,
    NOK: 10,
    KRW: 1300,
    TRY: 30,
    INR: 83,
    RUB: 95,
    BRL: 5,
    ZAR: 19,
    NGN: 1500,
    GHS: 14.5,
    KES: 130,
    EGP: 47,
    MAD: 10,
    TND: 3.1,
    PKR: 280,
    BDT: 110,
    IDR: 16000,
    THB: 36
  };

  let from = baseRate[base];
  if (!from) from = 1;
  
  let to = baseRate[target]; 
  if (!to) to = 1;

  const calculatedRate = (to / from) * (0.95 + random * 0.1);
  
  return calculatedRate < 0.01 ? 0.01 : calculatedRate.toFixed(2);
}

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromSearchTerm, setFromSearchTerm] = useState('');
  const [toSearchTerm, setToSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('best');
  const [feeThreshold, setFeeThreshold] = useState(100);
  const [timeThreshold, setTimeThreshold] = useState(24 * 60);
  const [amount, setAmount] = useState('');

  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target)) {
        setShowFromDropdown(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target)) {
        setShowToDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFromChange = (currency) => {
    setFromCurrency(currency);
    setFromSearchTerm('');
    setShowFromDropdown(false);
  };

  const handleToChange = (currency) => {
    setToCurrency(currency);
    setToSearchTerm('');
    setShowToDropdown(false);
  };

  const selectedPair = fromCurrency && toCurrency ? `${fromCurrency}-${toCurrency}` : null;

  const filteredPlatforms = selectedPair
    ? platforms.filter(p => {
        if (!p.rates[selectedPair] || p.rates[selectedPair] === 0) return false;

        if (filterType === 'fee' && p.fees[selectedPair] > feeThreshold) {
          return false;
        }

        if (filterType === 'time' && p.times[selectedPair] > timeThreshold) {
          return false;
        }

        return true;
      })
    : [];

  const matchingPlatforms = [...filteredPlatforms].sort((a, b) => {
    if (sortOrder === 'best') {
      const scoreA = a.rates[selectedPair] - a.fees[selectedPair] - (a.times[selectedPair] / 1000);
      const scoreB = b.rates[selectedPair] - b.fees[selectedPair] - (b.times[selectedPair] / 1000);
      return scoreB - scoreA;
    }
    
    if (sortOrder === 'lowest') {
      if (filterType === 'rate') return a.rates[selectedPair] - b.rates[selectedPair];
      if (filterType === 'fee') return a.fees[selectedPair] - b.fees[selectedPair];
      if (filterType === 'time') return a.times[selectedPair] - b.times[selectedPair];
      return a.rates[selectedPair] - b.rates[selectedPair];
    }
    
    if (sortOrder === 'highest') {
      if (filterType === 'rate') return b.rates[selectedPair] - a.rates[selectedPair];
      if (filterType === 'fee') return b.fees[selectedPair] - a.fees[selectedPair];
      if (filterType === 'time') return b.times[selectedPair] - a.times[selectedPair];
      return b.rates[selectedPair] - a.rates[selectedPair];
    }
    
    return 0;
  });

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    if (minutes < 24 * 60) {
      const hours = Math.floor(minutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    const days = Math.floor(minutes / (24 * 60));
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  };

  const FilterSortControls = () => {
    return (
      <div style={styles.filterContainer}>
        <div style={styles.filterSection}>
          <h3 style={styles.filterTitle}>Filter by:</h3>
          <div style={styles.buttonGroup}>
            <button
              style={{
                ...styles.filterButton,
                backgroundColor: filterType === 'all' ? '#3b82f6' : '#fff',
                color: filterType === 'all' ? '#fff' : '#333',
              }}
              onClick={() => setFilterType('all')}
            >
              All
            </button>
            <button
              style={{
                ...styles.filterButton,
                backgroundColor: filterType === 'rate' ? '#3b82f6' : '#fff',
                color: filterType === 'rate' ? '#fff' : '#333',
              }}
              onClick={() => setFilterType('rate')}
            >
              Rate
            </button>
            <button
              style={{
                ...styles.filterButton,
                backgroundColor: filterType === 'fee' ? '#3b82f6' : '#fff',
                color: filterType === 'fee' ? '#fff' : '#333',
              }}
              onClick={() => setFilterType('fee')}
            >
              Fee
            </button>
            <button
              style={{
                ...styles.filterButton,
                backgroundColor: filterType === 'time' ? '#3b82f6' : '#fff',
                color: filterType === 'time' ? '#fff' : '#333',
              }}
              onClick={() => setFilterType('time')}
            >
              Time
            </button>
          </div>
        </div>

        <div style={styles.filterSection}>
          <h3 style={styles.filterTitle}>Sort by:</h3>
          <div style={styles.buttonGroup}>
            <button
              style={{
                ...styles.filterButton,
                backgroundColor: sortOrder === 'best' ? '#3b82f6' : '#fff',
                color: sortOrder === 'best' ? '#fff' : '#333',
              }}
              onClick={() => setSortOrder('best')}
            >
              Best Overall
            </button>
            <button
              style={{
                ...styles.filterButton,
                backgroundColor: sortOrder === 'lowest' ? '#3b82f6' : '#fff',
                color: sortOrder === 'lowest' ? '#fff' : '#333',
              }}
              onClick={() => setSortOrder('lowest')}
            >
              Lowest First
            </button>
            <button
              style={{
                ...styles.filterButton,
                backgroundColor: sortOrder === 'highest' ? '#3b82f6' : '#fff',
                color: sortOrder === 'highest' ? '#fff' : '#333',
              }}
              onClick={() => setSortOrder('highest')}
            >
              Highest First
            </button>
          </div>
        </div>

        {filterType === 'fee' && (
          <div style={styles.sliderContainer}>
            <label style={styles.sliderLabel}>
              Max Fee: {feeThreshold.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={feeThreshold}
              onChange={(e) => setFeeThreshold(parseFloat(e.target.value))}
              style={styles.slider}
            />
          </div>
        )}

        {filterType === 'time' && (
          <div style={styles.sliderContainer}>
            <label style={styles.sliderLabel}>
              Max Time: {formatTime(timeThreshold)}
            </label>
            <input
              type="range"
              min="10"
              max={72 * 60}
              step="30"
              value={timeThreshold}
              onChange={(e) => setTimeThreshold(parseInt(e.target.value, 10))}
              style={styles.slider}
            />
          </div>
        )}
      </div>
    );
  };

  const filterCurrencies = (options, searchTerm) => {
    if (!searchTerm) return options;
    
    return options.filter(option => {
      const code = option.toLowerCase();
      const country = currencyLabels[option]?.country.toLowerCase();
      const term = searchTerm.toLowerCase();
      
      return code.includes(term) || country.includes(term);
    });
  };

  const CustomDropdown = ({ 
    label, 
    selectedValue, 
    showDropdown, 
    setShowDropdown, 
    handleChange, 
    options, 
    dropdownRef,
    searchTerm,
    setSearchTerm
  }) => {
    const selectOption = (option) => {
      handleChange(option);
      setShowDropdown(false);
    };

    const filteredOptions = filterCurrencies(options, searchTerm);

    return (
      <div style={{ width: '100%', position: 'relative' }}>
        <label style={styles.label}>{label}</label>
        <div 
          style={{
            ...styles.select,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px 10px'
          }} 
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
        >
          {selectedValue ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`https://flagcdn.com/w20/${currencyLabels[selectedValue]?.code}.png`}
                alt={currencyLabels[selectedValue]?.country}
                style={{ width: '20px', marginRight: '8px' }}
              />
              <span>{selectedValue} - {currencyLabels[selectedValue]?.country}</span>
            </div>
          ) : (
            <span>Select</span>
          )}
          <span style={{ marginLeft: '8px' }}>▼</span>
        </div>
        
        {showDropdown && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: '#fff',
              border: '2px solid #3b82f6',
              borderRadius: '4px',
              zIndex: 9999,
              maxHeight: '300px',
              overflowY: 'auto',
              boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
              width: '100%',
            }}
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            {filteredOptions.length === 0 ? (
              <div style={{ padding: '10px', textAlign: 'center', color: '#666' }}>
                No currencies found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid #eee',
                    backgroundColor: selectedValue === option ? '#f0f0f0' : '#fff',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => selectOption(option)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f4f4f4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = selectedValue === option ? '#f0f0f0' : '#fff';
                  }}
                >
                  <img
                    src={`https://flagcdn.com/w20/${currencyLabels[option]?.code}.png`}
                    alt={currencyLabels[option]?.country}
                    style={{ width: '20px', marginRight: '8px' }}
                  />
                  <span>{option} - {currencyLabels[option]?.country}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Compare Exchange Rates</h1>
        <p style={styles.subtitle}>Find the best rates and lowest fees across multiple providers</p>

        <div style={styles.card}>
          <div style={styles.selectContainer}>
            <CustomDropdown 
              label="From Currency:"
              selectedValue={fromCurrency}
              showDropdown={showFromDropdown}
              setShowDropdown={setShowFromDropdown}
              handleChange={handleFromChange}
              options={currencies}
              dropdownRef={fromDropdownRef}
              searchTerm={fromSearchTerm}
              setSearchTerm={setFromSearchTerm}
            />
            
            <div style={styles.switchIcon}>
              <div style={styles.arrowsIcon}>⇄</div>
            </div>
            
            <CustomDropdown 
              label="To Currency:"
              selectedValue={toCurrency}
              showDropdown={showToDropdown}
              setShowDropdown={setShowToDropdown}
              handleChange={handleToChange}
              options={currencies}
              dropdownRef={toDropdownRef}
              searchTerm={toSearchTerm}
              setSearchTerm={setToSearchTerm}
            />
          </div>

          {fromCurrency && toCurrency && (
            <div style={styles.amountSection}>
              <label htmlFor="amount" style={styles.label}>Amount to Convert:</label>
              <div style={styles.amountWrapper}>
                <span style={styles.currencySymbol}>{fromCurrency}</span>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  style={styles.amountInput}
                />
              </div>
            </div>
          )}
        </div>

        {fromCurrency && toCurrency && (
          <div style={styles.resultsContainer}>
            <div style={styles.resultsHeader}>
              <h2 style={styles.subheading}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {fromCurrency && (
                    <div style={styles.currencyBadge}>
                      <img
                        src={`https://flagcdn.com/w20/${currencyLabels[fromCurrency]?.code}.png`}
                        alt={fromCurrency}
                        style={styles.flagImage}
                      />
                      <span style={styles.currencyCode}>{fromCurrency}</span>
                    </div>
                  )}
                  <span style={styles.toLabel}>to</span>
                  {toCurrency && (
                    <div style={styles.currencyBadge}>
                      <img
                        src={`https://flagcdn.com/w20/${currencyLabels[toCurrency]?.code}.png`}
                        alt={toCurrency}
                        style={styles.flagImage}
                      />
                      <span style={styles.currencyCode}>{toCurrency}</span>
                    </div>
                  )}
                </div>
              </h2>
            </div>

            <FilterSortControls />

            {matchingPlatforms.length === 0 ? (
              <div style={styles.noMatchContainer}>
                <p style={styles.noMatch}>No platforms available for this pair with the selected filters.</p>
              </div>
            ) : (
              <ul style={styles.platformList}>
                {matchingPlatforms.map((platform, index) => {
                  const rate = platform.rates[selectedPair];
                  const fee = platform.fees[selectedPair];
                  const time = platform.times[selectedPair];
                  
                  const inputAmount = parseFloat(amount);
                  let convertedAmount = null;
                  let finalAmount = null;
                  
                  if (!isNaN(inputAmount) && inputAmount > 0) {
                    // Calculate the fees based on the input amount
                    const percentageFee = inputAmount * (platform.feePercent / 100) * rate;
                    const baseFeeToCurrency = platform.baseFee * rate;
                    const totalFee = percentageFee + baseFeeToCurrency;
                    
                    // Calculate the final amount
                    convertedAmount = inputAmount * rate;
                    finalAmount = convertedAmount - totalFee;
                    
                    // Don't allow negative final amounts
                    if (finalAmount < 0) finalAmount = 0;
                  }

                  // Determine if this is the best rate
                  const isBestRate = index === 0 && sortOrder === 'best';
                  
                  return (
                    <li key={index} style={{
                      ...styles.platformItem,
                      ...(isBestRate && styles.bestPlatform)
                    }}>
                      {isBestRate && <div style={styles.bestRateBadge}>Best Value</div>}
                      <div style={styles.platformHeader}>
                        <span style={styles.platformName}>
                          <a href={platform.link} target="_blank" rel="noopener noreferrer" style={styles.platformLink}>
                            {platform.name}
                          </a>
                        </span>
                        <span style={styles.platformRate}>
                          Rate: <span style={styles.rateValue}>{parseFloat(rate).toFixed(2)}</span>
                        </span>
                      </div>
                      <div style={styles.platformDetails}>
                        <span style={styles.platformFee}>
                          <span style={styles.detailLabel}>Fee:</span> ${platform.baseFee.toFixed(2)} + {platform.feePercent}%
                        </span>
                        <span style={styles.platformTime}>
                          <span style={styles.detailLabel}>Time:</span> {formatTime(time)}
                        </span>
                      </div>
                      
                      {convertedAmount !== null && (
                        <div style={styles.conversionResult}>
                          <div style={styles.conversionDetails}>
                            <div style={styles.conversionRow}>
                              <span style={styles.conversionLabel}>You send:</span>
                              <span style={styles.amountValue}>
                                {inputAmount.toFixed(2)} {fromCurrency}
                              </span>
                            </div>
                            <div style={styles.conversionRow}>
                              <span style={styles.conversionLabel}>You get:</span>
                              <span style={styles.amountValue}>
                                {finalAmount.toFixed(2)} {toCurrency}
                              </span>
                            </div>
                          </div>
                          <a 
                            href={platform.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={styles.transferButton}
                          >
                            Transfer Now
                          </a>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        <div style={styles.footer}>
          <p style={styles.disclaimer}>
            Rates and fees are approximations and may vary. Always check the provider's website for the most current rates.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '2rem 1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    position: 'relative',
    overflow: 'visible',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    borderRadius: '16px',
    position: 'relative',
    zIndex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '0.5rem',
    letterSpacing: '-0.025em',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '1.125rem',
    color: '#64748b',
    marginBottom: '2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.07)',
    marginBottom: '1.5rem',
    position: 'relative',
    zIndex: 1,
  },
  selectContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    position: 'relative',
    zIndex: 100,
  },
  switchIcon: {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: '22px',
  },
  arrowsIcon: {
    fontSize: '20px',
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#475569',
  },
  select: {
    width: '100%',
    fontSize: '1rem',
    transition: 'all 0.2s',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    border: '2px solid #3b82f6',
    borderRadius: '8px',
    zIndex: 9999,
    maxHeight: '300px',
    overflowY: 'auto',
    boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
    width: '100%',
  },
  resultsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.07)',
  },
  resultsHeader: {
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  },
  subheading: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0',
  },
  currencyBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    padding: '4px 8px',
    margin: '0 4px',
  },
  flagImage: {
    width: '20px',
    height: 'auto',
    marginRight: '6px',
    borderRadius: '2px',
  },
  currencyCode: {
    fontWeight: '600',
    color: '#0f172a',
  },
  toLabel: {
    margin: '0 8px',
    color: '#64748b',
  },
  filterContainer: {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  filterSection: {
    marginBottom: '1rem',
  },
  filterTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#475569',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  filterButton: {
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s',
    backgroundColor: '#fff',
    color: '#475569',
  },
  sliderContainer: {
    marginTop: '1rem',
    padding: '0.5rem 0',
  },
  sliderLabel: {
    display: 'block',
    marginBottom: '0.75rem',
    fontSize: '0.875rem',
    color: '#475569',
  },
  slider: {
    width: '100%',
    height: '6px',
    appearance: 'none',
    backgroundColor: '#e2e8f0',
    borderRadius: '3px',
    outline: 'none',
  },
  platformList: {
    listStyleType: 'none',
    padding: 0,
    margin: '0.5rem 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  platformItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.25rem',
    paddingTop: '1.75rem', // Increased top padding to make room for the badge
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s, box-shadow 0.2s',
    position: 'relative',
    overflow: 'hidden',
  },
  bestPlatform: {
    borderColor: '#3b82f6',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
  },
  bestRateBadge: {
    position: 'absolute',
    top: '0',
    right: '0', // Changed from left to right
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    padding: '6px 12px',
    borderTopRightRadius: '8px', // Changed to match the top-right corner
    borderBottomLeftRadius: '8px', // Changed to bottom-left for styling
    zIndex: 5,
  },
  platformHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  platformName: {
    fontWeight: '700',
    fontSize: '1.125rem',
    color: '#1e293b',
  },
  platformRate: {
    fontFamily: 'monospace',
    fontSize: '1rem',
    color: '#1e293b',
  },
  rateValue: {
    fontWeight: 'bold',
    color: '#0f172a',
  },
  platformDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    color: '#64748b',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f1f5f9',
    marginBottom: '0.75rem',
  },
  detailLabel: {
    fontWeight: '500',
    color: '#475569',
    marginRight: '0.25rem',
  },
  platformFee: {
    color: '#ef4444',
  },
  platformTime: {
    color: '#10b981',
  },
  amountSection: {
    marginTop: '1.5rem',
  },
  amountWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  currencySymbol: {
    position: 'absolute',
    left: '16px',
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: '500',
  },
  amountInput: {
    width: '100%',
    padding: '12px 12px 12px 50px',
    fontSize: '1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#fff',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  },
  platformLink: {
    color: 'inherit',
    textDecoration: 'none',
    borderBottom: '1px dashed #cbd5e1',
    paddingBottom: '1px',
    transition: 'border-color 0.2s',
  },
  conversionResult: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  conversionDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  conversionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    alignItems: 'center',
  },
  conversionLabel: {
    color: '#64748b',
  },
  amountValue: {
    fontWeight: '600',
    color: '#0f172a',
  },
  transferButton: {
    display: 'block',
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    textAlign: 'center',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.875rem',
    transition: 'background-color 0.2s',
  },
  noMatchContainer: {
    padding: '2rem',
    textAlign: 'center',
  },
  noMatch: {
    color: '#64748b',
    fontStyle: 'italic',
    fontSize: '1rem',
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    maxWidth: '500px',
    margin: '0 auto',
  }
};
