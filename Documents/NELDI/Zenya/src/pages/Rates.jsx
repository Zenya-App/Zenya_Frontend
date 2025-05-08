import React, { useState } from "react";

const platformsData = [

  // ... other platforms omitted for brevity
  {
    name: "Wise",
    rates: {
      "USD-GHS": 11.05,
      "EUR-GHS": 13.10,
      "USD-KES": 132.30,
      "USD-NGN": 1450.75,
      "GBP-GHS": 14.25,
      "USD-ZAR": 18.20,
      "EUR-NGN": 1560.40
    },
    feePercent: 1.2,
    speed: "1 hour",
    link: "https://wise.com"
  },
  {
    name: "Remitly",
    rates: {
      "USD-GHS": 10.90,
      "EUR-GHS": 12.95,
      "USD-KES": 130.50,
      "USD-NGN": 1442.10,
      "GBP-GHS": 14.00,
      "USD-ZAR": 18.00,
      "EUR-NGN": 1550.75
    },
    feePercent: 1.8,
    speed: "minutes",
    link: "https://remitly.com"
  },
  {
    name: "WorldRemit",
    rates: {
      "USD-GHS": 11.00,
      "EUR-GHS": 12.88,
      "USD-KES": 131.90,
      "USD-NGN": 1430.25,
      "GBP-GHS": 14.05,
      "USD-ZAR": 17.90,
      "EUR-NGN": 1520.00
    },
    feePercent: 2.0,
    speed: "1–2 hours",
    link: "https://worldremit.com"
  },
  {
    name: "PaySend",
    rates: {
      "USD-GHS": 10.80,
      "EUR-GHS": 12.75,
      "USD-KES": 129.90,
      "USD-NGN": 1405.00,
      "GBP-GHS": 13.85,
      "USD-ZAR": 17.85,
      "EUR-NGN": 1510.30
    },
    feePercent: 1.5,
    speed: "within a day",
    link: "https://paysend.com"
  },
  {
    name: "SendWave",
    rates: {
      "USD-GHS": 11.00,
      "USD-KES": 132.00,
      "USD-NGN": 1448.60,
      "USD-ZAR": 18.10
    },
    feePercent: 1.0,
    speed: "instant",
    link: "https://sendwave.com"
  },
  {
    name: "Xoom",
    rates: {
      "USD-GHS": 10.85,
      "USD-NGN": 1435.75,
      "USD-KES": 131.20,
      "EUR-GHS": 12.90,
      "USD-ZAR": 17.95,
      "EUR-NGN": 1535.60
    },
    feePercent: 2.2,
    speed: "minutes",
    link: "https://xoom.com"
  },
  {
    name: "Western Union",
    rates: {
      "USD-GHS": 10.70,
      "USD-KES": 129.80,
      "USD-NGN": 1400.00,
      "USD-ZAR": 17.60
    },
    feePercent: 3.0,
    speed: "same day",
    link: "https://westernunion.com"
  },
  {
    name: "MoneyGram",
    rates: {
      "USD-GHS": 10.60,
      "USD-KES": 129.00,
      "USD-NGN": 1390.00,
      "USD-ZAR": 17.55
    },
    feePercent: 3.5,
    speed: "within hours",
    link: "https://moneygram.com"
  },
  {
    name: "Azimo",
    rates: {
      "USD-GHS": 10.95,
      "USD-KES": 130.70,
      "USD-NGN": 1420.00,
      "EUR-NGN": 1530.00,
      "USD-ZAR": 17.80
    },
    feePercent: 1.7,
    speed: "1–2 hours",
    link: "https://azimo.com"
  },
  {
    name: "Skrill",
    rates: {
      "USD-GHS": 10.75,
      "USD-KES": 130.10,
      "USD-NGN": 1415.00,
      "EUR-NGN": 1540.20,
      "USD-ZAR": 18.05
    },
    feePercent: 2.3,
    speed: "1–2 days",
    link: "https://skrill.com"
  },

  {
    name: "Revolut",
    rates: {
      "USD-GHS": 11.02,
      "EUR-GHS": 13.05,
      "USD-KES": 131.50,
      "USD-NGN": 1448.10,
      "GBP-GHS": 14.10,
      "USD-ZAR": 18.15,
      "EUR-NGN": 1555.00
    },
    feePercent: 1.4,
    speed: "same day",
    link: "https://revolut.com"
  },
  {
    name: "XE",
    rates: {
      "USD-GHS": 10.92,
      "EUR-GHS": 12.98,
      "USD-KES": 130.80,
      "USD-NGN": 1438.00,
      "GBP-GHS": 13.95,
      "USD-ZAR": 18.00,
      "EUR-NGN": 1540.90
    },
    feePercent: 1.9,
    speed: "minutes",
    link: "https://xe.com"
  },
  {
    name: "XTransfer",
    rates: {
      "USD-GHS": 11.10,
      "USD-KES": 133.00,
      "USD-NGN": 1452.50,
      "USD-ZAR": 18.25
    },
    feePercent: 1.3,
    speed: "same day",
    link: "https://xtransfer.com"
  },
  {
    name: "Nium",
    rates: {
      "USD-GHS": 11.00,
      "EUR-GHS": 13.00,
      "USD-KES": 132.50,
      "USD-NGN": 1450.00,
      "GBP-GHS": 14.20,
      "USD-ZAR": 18.10,
      "EUR-NGN": 1558.75
    },
    feePercent: 1.6,
    speed: "within hours",
    link: "https://nium.com"
  }
  
];

export default function RatesSection() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("GHS");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  let filteredPlatforms = [...platformsData];

  if (filter === "lowestFee") {
    filteredPlatforms = filteredPlatforms.filter(p => p.feePercent < 2.5);
  } else if (filter === "bestRate") {
    filteredPlatforms = filteredPlatforms.filter(p => {
      const pair = `${fromCurrency}-${toCurrency}`;
      return p.rates[pair] > 10.8;
    });
  } else if (filter === "fastest") {
    filteredPlatforms = filteredPlatforms.filter(p =>
      ["minutes", "within minutes", "1 hour", "instant"].some(speed =>
        p.speed.toLowerCase().includes(speed)
      )
    );
  }

  if (sortBy === "rate") {
    filteredPlatforms.sort((a, b) => {
      const rateA = a.rates[`${fromCurrency}-${toCurrency}`] || 0;
      const rateB = b.rates[`${fromCurrency}-${toCurrency}`] || 0;
      return rateB - rateA;
    });
  } else if (sortBy === "fee") {
    filteredPlatforms.sort((a, b) => a.feePercent - b.feePercent);
  }

  const amountToSend = 100;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Compare Rates</h2>
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          className="border p-2 rounded"
          value={fromCurrency}
          onChange={e => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
          <option value="ZAR">ZAR</option>
          <option value="AUD">AUD</option>
          <option value="JPY">JPY</option>
        </select>

        <span className="self-center">to</span>

        <select
          className="border p-2 rounded"
          value={toCurrency}
          onChange={e => setToCurrency(e.target.value)}
        >
          <option value="GHS">GHS</option>
          <option value="KES">KES</option>
          <option value="NGN">NGN</option>
          <option value="ZAR">ZAR</option>
          <option value="GBP">GBP</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
          <option value="AUD">AUD</option>
          <option value="JPY">JPY</option>
        </select>

        <select
          className="border p-2 rounded"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="">No Filter</option>
          <option value="lowestFee">Lowest Fee</option>
          <option value="bestRate">Best Rate</option>
          <option value="fastest">Fastest Transfer</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="">No Sort</option>
          <option value="rate">Sort by Rate</option>
          <option value="fee">Sort by Fee</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredPlatforms.map(platform => {
          const pair = `${fromCurrency}-${toCurrency}`;
          const rate = platform.rates[pair] || "N/A";
          const received =
            typeof rate === "number"
              ? (amountToSend * rate * (1 - platform.feePercent / 100)).toFixed(2)
              : "N/A";

          return (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{platform.name}</h3>
                  <p className="text-sm text-gray-600">Speed: {platform.speed}</p>
                </div>
                <div className="text-right">
                  <p>
                    <strong>Rate:</strong> {rate}
                  </p>
                  <p>
                    <strong>Fee:</strong> {platform.feePercent}%
                  </p>
                  <p>
                    <strong>You Get:</strong> {received} {toCurrency}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
