import React, { useState, useEffect } from 'react';
import { FaUser, FaChartBar, FaHistory, FaPlay, FaBars, FaSignOutAlt, FaHome } from 'react-icons/fa';
import './Sidebar.css';
const baseURL = import.meta.env.VITE_API_BASE_URL;
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState('User'); // Default fallback name
  const navigate = useNavigate();
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
        const res = await fetch(`${baseURL}/user/profile`, {
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
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {!isOpen && (
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}

      <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">kwizzy</h2>
          <button className="sidebar-close-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>

        <div className="sidebar-content">
          <ul>
          <li onClick={() => handleNavigation('/home')}><FaHome /><span>Home</span></li>
          <li onClick={() => handleNavigation('/userprofile')}><FaUser /><span>{user}'s Profile</span></li>
          <li onClick={() => handleNavigation('/quiz')}><FaPlay /><span>Start Quiz</span></li>
          <li onClick={() => handleNavigation('/analytics')}><FaChartBar /><span>Analytics</span></li>
          <li onClick={() => handleNavigation('/history')}><FaHistory /><span>History</span></li>


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
