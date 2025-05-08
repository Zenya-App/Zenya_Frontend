import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ThemeProvider from './context/ThemeContext'; 
import Rates from './pages/rates';
import ExchangeRates from './pages/BasicRate';
import CurrencyConverter from './pages/Platforms';
import BusinessDashboard from './pages/BusinessDashboard';
import AlertsPage from './pages/AlertsPage';
import Remittance from './pages/Remittance';

const App = () => {
  return (
    <ThemeProvider> {/* Wrap the entire app with ThemeProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/exchange-rates" element={<ExchangeRates />} />
          <Route path="/currency-converter" element={<CurrencyConverter />} />
          <Route path="/business" element={<BusinessDashboard />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/remittance" element={<Remittance />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
