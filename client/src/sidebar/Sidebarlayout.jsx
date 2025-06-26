// SidebarLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const SidebarLayout = () => {
  return (
    <div className="main-main-container">
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <Outlet /> {/* All routed pages appear here */}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
