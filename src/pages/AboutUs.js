import React from 'react';
import './styles.css'; 

const AboutUs = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
     
      <div style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
        
        <img 
          src="/assets/images/siwa.jpg" 
          alt="About Us" 
          style={{ width: '100%', height: 'auto' }} 
        />

        <div 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            textAlign: 'center',
            color: 'white', 
            fontFamily: 'Yesteryear, cursive', 
            fontSize: '7rem', 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
          }}
        >
          About Us
        </div>
      </div>
    </div>
  );
};

export default AboutUs;