
import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from '../../theme/ThemeProvider';


const Sidebar = () => {
  const { isDarkMode } = useTheme();
  
  React.useEffect(() => {
    const updateDimensions = () => {
      // Window resize handler logic if needed
    };
    
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  
  return (
    <div id="sidebar" className="sidebar modern-sidebar">
      <style jsx>{`
        .modern-sidebar {
          background: ${isDarkMode 
            ? 'rgba(0, 0, 0, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)'} !important;
          backdrop-filter: blur(20px);
          border-right: 1px solid ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.1)'};
          box-shadow: 8px 0 32px ${isDarkMode 
            ? 'rgba(0, 0, 0, 0.3)' 
            : 'rgba(0, 0, 0, 0.1)'};
          height: 100vh;
          position: fixed;
          z-index: 1000;
        }
          
          .sidebar-wrapper {
            height: 100%;
            position: relative;
            overflow: hidden;
            padding: 20px 0;
          }
          
          .sidebar-brand {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 20px;
          }
          
        .brand-title {
          color: ${isDarkMode ? '#ffffff' : '#1f2937'};
          font-size: 18px;
          font-weight: bold;
          margin: 0;
          letter-spacing: 1px;
          text-shadow: ${isDarkMode ? '0 2px 10px rgba(0, 0, 0, 0.25)' : 'none'};
        }
          
          .nav {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .nav li {
            margin: 5px 15px;
          }
          
        .nav-link {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          color: ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.8)' 
            : 'rgba(0, 0, 0, 0.8)'};
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
          
          .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #111111 0%, #2f2f2f 100%);
            transition: left 0.3s ease;
            z-index: -1;
          }
          
        .nav-link:hover {
          color: ${isDarkMode ? '#ffffff' : '#000000'};
          transform: translateX(5px);
          background: ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.1)'};
        }
          
          .nav-link:hover::before {
            left: 0;
          }
          
          .nav-link.active {
              color: #ffffff;
              background: linear-gradient(135deg, #111111 0%, #2f2f2f 100%);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            transform: translateX(3px);
          }
          
          .nav-link.active::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 20px;
            background: #ffffff;
            border-radius: 2px;
          }
          
          .nav-link i {
            margin-right: 12px;
            font-size: 16px;
            width: 20px;
            text-align: center;
          }
          
          .nav-link p {
            margin: 0;
            font-size: 14px;
            font-weight: 500;
          }
          
        /* Status indicator at bottom */
        .sidebar-status {
          position: absolute;
          bottom: 20px;
          left: 15px;
          right: 15px;
          padding: 15px;
          background: ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(0, 0, 0, 0.05)'};
          border-radius: 12px;
          border: 1px solid ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.1)'};
        }
        
        .status-text {
          color: ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.7)' 
            : 'rgba(0, 0, 0, 0.7)'};
          font-size: 11px;
          text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }
          
          .status-indicator {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #4CAF50;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
            }
            70% {
              transform: scale(1);
              box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
            }
            100% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
            }
          }
        `}</style>
        
        <div className="sidebar-wrapper">
          {/* <div className="sidebar-brand">
              <h2 className="brand-title">🏥 GERMINY</h2>
            <p style={{ 
              color: "rgba(255, 255, 255, 0.6)", 
              fontSize: "11px", 
              margin: "5px 0 0 0",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              Admin Panel
            </p>
          </div> */}
          
          <ul className="nav">
            {this.props.routes.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li key={key}>
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>
          
          <div className="sidebar-status">
            <div className="status-text">System Status</div>
            <div className="status-indicator">
              <span style={{ 
                fontSize: "12px", 
                color: isDarkMode ? "#ffffff" : "#000000" 
              }}>Server</span>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div className="status-dot" />
                <span style={{ fontSize: "11px", color: "#4CAF50" }}>Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Sidebar;
