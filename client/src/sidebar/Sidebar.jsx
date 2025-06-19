import React, { useState, useEffect } from 'react';
import { FaUser, FaChartBar, FaHistory, FaPlay, FaBars, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState('User'); // Default fallback name

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload(); // or redirect to login page
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (token) {
        console.log("✅ Token found:", token);
      } else {
        console.log("❌ No token found");
      }

      try {
        const res = await fetch('http://localhost:5001/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("User profile:", data);
          setUser(data.name); // Assuming response has { name, email }
        } else {
          console.error("Failed to fetch user");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {!isOpen && (
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}

      <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">Quizzy</h2>
          <button className="sidebar-close-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>

        <div className="sidebar-content">
          <ul>
            <li><FaUser /><span>{user}</span></li>
            <li><FaPlay /><span>Start Quiz</span></li>
            <li><FaChartBar /><span>Analytics</span></li>
            <li><FaHistory /><span>History</span></li>
          </ul>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /><span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
