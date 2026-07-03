import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "../config/menu";
import "./Sidebar.css";
import logo from "./Logo sari tebu.svg";

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`sidebar ${isOpen ? "show" : ""}`}>

      <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={logo} alt="Logo" width="35" height="35" />
        <h4 className="logo" style={{ color: '#1b5e20', margin: 0 }}>Sari Tebu</h4>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((section, i) => (
          <div key={i} className="menu-section">

            <p className="menu-title">{section.title}</p>

            {section.items.map((item, j) => {
              const isActive = location.pathname === item.path;

              return (
                <div
                  key={j}
                  className={`menu-item ${isActive ? "active" : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  <span className="menu-text">{item.name}</span>
                </div>
              );
            })}

          </div>
        ))}
      </div>

    </div>
  );
}