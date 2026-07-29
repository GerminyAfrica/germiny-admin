import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Container, Badge } from "react-bootstrap";
import { useTheme } from '../../theme/ThemeProvider';

const Header = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <header>
      <style jsx>{`
        .modern-header {
          background: ${isDarkMode 
            ? 'rgba(0, 0, 0, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)'} !important;
          backdrop-filter: blur(20px);
          border-bottom: 1px solid ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.1)'};
          box-shadow: 0 4px 20px ${isDarkMode 
            ? 'rgba(0, 0, 0, 0.3)' 
            : 'rgba(0, 0, 0, 0.1)'};
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .brand-modern {
          font-size: 20px !important;
          font-weight: bold !important;
          color: ${isDarkMode ? '#ffffff' : '#1f2937'} !important;
          letter-spacing: 1px;
          display: flex !important;
          align-items: center !important;
          gap: 8px;
          text-shadow: ${isDarkMode ? '0 2px 10px rgba(0, 0, 0, 0.25)' : 'none'};
        }
        
        .nav-link-modern {
          color: ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.8)' 
            : 'rgba(0, 0, 0, 0.8)'} !important;
          padding: 8px 16px !important;
          border-radius: 12px !important;
          margin: 0 5px !important;
          transition: all 0.3s ease !important;
          background: ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(0, 0, 0, 0.05)'} !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.1)'} !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px;
        }
          
        .nav-link-modern:hover {
          color: ${isDarkMode ? '#ffffff' : '#000000'} !important;
          background: ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.1)'} !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px ${isDarkMode 
            ? 'rgba(0, 0, 0, 0.2)' 
            : 'rgba(0, 0, 0, 0.1)'};
        }
        
        .nav-link-modern:focus {
          color: ${isDarkMode ? '#ffffff' : '#1f2937'} !important;
          background: ${isDarkMode
            ? 'linear-gradient(135deg, #111111 0%, #2f2f2f 100%)'
            : 'rgba(0, 0, 0, 0.08)'} !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }
          
          .navbar-nav {
            gap: 10px;
          }
          
        .navbar-toggler {
          border: 1px solid ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.2)' 
            : 'rgba(0, 0, 0, 0.2)'} !important;
          background: ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.1)'} !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 8px !important;
        }
        
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='${isDarkMode 
            ? 'rgba%28255, 255, 255, 0.8%29' 
            : 'rgba%280, 0, 0, 0.8%29'}' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
        }
          
          .notification-badge {
            position: relative;
          }
          
          .pulse-animation {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
            }
            70% {
              transform: scale(1.05);
              box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
            }
          }
        `}</style>
        
        <Navbar className="modern-header" variant={isDarkMode ? "dark" : "light"} expand="lg" fixed="top">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand className="brand-modern">
                🏥 Germiny
              </Navbar.Brand>
            </LinkContainer>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/dashboard">
                  <Nav.Link className="nav-link-modern">
                    <i className="fas fa-tachometer-alt" />
                    Dashboard
                  </Nav.Link>
                </LinkContainer>
                
                <LinkContainer to="/notifications">
                  <Nav.Link className="nav-link-modern notification-badge">
                    <i className="fas fa-bell" />
                    Notifications
                    <Badge 
                      bg="danger" 
                      pill 
                      className="pulse-animation"
                      style={{ 
                        fontSize: "10px", 
                        marginLeft: "8px",
                        background: "#ff5252"
                      }}
                    >
                      3
                    </Badge>
                  </Nav.Link>
                </LinkContainer>
                
                <LinkContainer to="/profile">
                  <Nav.Link className="nav-link-modern">
                    <i className="fas fa-user-circle" />
                    Profile
                  </Nav.Link>
                </LinkContainer>
                
                <LinkContainer to="/logout">
                  <Nav.Link className="nav-link-modern">
                    <i className="fas fa-sign-out-alt" />
                    Logout
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
};

export default Header;
