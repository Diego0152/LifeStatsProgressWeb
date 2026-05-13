import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-status">
        <span className="status-dot"></span>
        <span className="status-text">DATABASE_CONNECTED: PORT_3309</span>
      </div>
      
      <div className="footer-copyright">
        TERMINAL_V.2.0.26 // © 2026 Diego Ramos - ALL RIGHTS RESERVED
      </div>

      <div className="footer-clock">
        {new Date().toLocaleTimeString()}
      </div>
    </footer>
  );
};

export default Footer;