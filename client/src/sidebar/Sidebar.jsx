import React, { useState } from 'react';
import { FaUser, FaChartBar, FaHistory, FaPlay, FaBars, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-content">
          <h1 className="logo">Quizzy</h1>
          <ul>
            <li><FaUser /> {isOpen && 'User Profile'}</li>
            <li><FaPlay /> {isOpen && 'Start Quiz'}</li>
            <li><FaChartBar /> {isOpen && 'Analytics'}</li>
            <li><FaHistory /> {isOpen && 'History'}</li>
          </ul>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <FaSignOutAlt /> {isOpen && 'Logout'}
        </button>
      </div>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
    </>
  );
};

export default Sidebar;