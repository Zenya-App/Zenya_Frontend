import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = () => {
  const [filter, setFilter] = useState('30'); // Default filter: Last 30 days

  // Sample data for the chart
  const data = {
    labels: Array.from({ length: parseInt(filter) }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Energy Usage (kWh)',
        data: Array.from({ length: parseInt(filter) }, () => Math.floor(Math.random() * 100) + 50),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Energy Usage - Last ${filter} Days`,
      },
    },
  };

  return (
    <div className="max-w-lg w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Energy Usage</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
