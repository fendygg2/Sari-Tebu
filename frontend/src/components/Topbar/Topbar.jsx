import "./Topbar.css";

export default function Topbar({ toggleSidebar }) {
  return (
    <div className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '15px 25px', backgroundColor: '#fff', borderBottom: '1px solid #eaeaea' }}>

      <div className="topbar-left" style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={toggleSidebar} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1b5e20', marginRight: '15px', display: 'flex' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

      </div>

      <div className="topbar-right">
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="avatar"
          style={{ borderRadius: '50%' }}
        />
      </div>

    </div>
  );
}