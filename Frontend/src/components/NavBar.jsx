// src/components/Navbar.jsx
import React from 'react';
import '../css/NavBar.css';

function Navbar({ totalTasks, completedTasks, notCompletedTasks, onReset }) {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all counters? This will not delete any tasks.')) {
      onReset();
    }
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">TODO LIST</h1>
      <div className="navbar-stats">
        <div className="stat-item">
          <span className="stat-label">Total Tasks Created</span>
          <span className="stat-value">{totalTasks || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Completed</span>
          <span className="stat-value completed">{completedTasks || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Deleted</span>
          <span className="stat-value deleted">{notCompletedTasks || 0}</span>
        </div>
        <button onClick={handleReset} className="reset-button">
          Start Fresh
        </button>
      </div>
    </nav>
  );
}

export default Navbar;