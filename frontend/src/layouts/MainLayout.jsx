import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import "./MainLayout.css";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar isOpen={isSidebarOpen} />

        <div className="layout-main" style={{ flex: 1, minWidth: 0 }}>
          <Topbar toggleSidebar={toggleSidebar} />

          <div className="layout-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}