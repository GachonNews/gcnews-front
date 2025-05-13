// src/components/Header.js
import React from 'react';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  borderBottom: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const iconStyle = {
  fontSize: '24px',
  cursor: 'pointer',
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <span style={iconStyle}>←</span>
      <span style={titleStyle}>GC NEWS</span>
      <span style={iconStyle}>+</span>
    </header>
  );
};

export default Header;