// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// Import custom components
import StatusIndicator from '../components/StatusIndicator';
import TopLeftAnimation from '../components/TopLeftAnimation';
import CursorGlow from './Cursor';
const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch dashboard data from the API
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setMessage('');
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Top-left Lottie animation */}
      <TopLeftAnimation />

      {/* Glowing cursor effect */}
      <CursorGlow />


      {/* Online status indicator */}
      <StatusIndicator />

      {/* Main dashboard content */}
      <h1>Welcome to Dashboard</h1>
      <p>{message}</p>
      <div className="dashboard-content">
        {/* Add your dashboard widgets or components here */}
      </div>
    </motion.div>
  );
};

export default Dashboard;
