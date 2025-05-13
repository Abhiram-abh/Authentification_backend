import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StatusIndicator = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication tokens or user data here
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="status-indicator">
      <div
        className="status-badge"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="status-dot" />
        <span className="status-text">Online</span>
        <span className="arrow">&#9660;</span> {/* Down arrow */}
      </div>
      {dropdownOpen && (
        <div className="dropdown-menu">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;
