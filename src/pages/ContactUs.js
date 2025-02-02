import React, { useState } from 'react';
import './styles.css'; //  font links 
const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    telephone: '',
    request: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Cover Image  */}
     
<div style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
  
  <img 
    src="/assets/images/1.png" 
    alt="Contact Us" 
    style={{ width: '100%', height: 'auto' }} 
  />

  {/*  Text 0ver the image  */}
  <div 
    style={{ 
      position: 'absolute', 
      top: '50%', // Center vertically
      left: '50%', // Center horizontally
      transform: 'translate(-50%, -50%)', 
      textAlign: 'center',
      color: 'white', 
      fontFamily: 'Yesteryear, cursive', 
      fontSize: '7rem', 
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
    }}
  >
    Contact Us
  </div>
</div>

      {/* Top Counter  */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20 20px',boxShadow: '0 4px 6px rgba(51, 51, 51, 0.1)'  }}>
        {/* Heading and Image in the Same Line with the send message  */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', //  vertically
          justifyContent: 'space-between', 
          marginBottom: '55px',
          marginTop: '55px',
          marginLeft:'50px' 
        }}>
          <h2 style={{
            color: "#DF6951",
            fontFamily: "'Yesteryear', cursive",
            fontSize: '2.5rem',
            margin: '0',
            marginLeft:'55px'
          }}>
            Send message
          </h2>
          {/* Image on the Far Right */}
          <img 
            src="/assets/images/contact-us-img-1.png" 
            alt="Contact Us Illustration" 
            style={{ 
              width: '180px', 
              height: 'auto', 
              marginRight: '80px' 
            }} 
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Inputs */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '50px', justifyContent: 'center',marginLeft:'50px' ,marginRight:'50px' }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              style={{ 
                flex: 1, 
                padding: '8px', 
                border: 'none', 
                borderBottom: '1px solid #ccc', 
                outline: 'none', 
                boxSizing: 'border-box',
                backgroundColor: 'transparent',
                fontFamily: 'Volkhov, serif' 
              }}
            />
            <input
              type="text"
              name="surname"
              placeholder="Your Surname"
              value={formData.surname}
              onChange={handleChange}
              style={{ 
                flex: 1, 
                padding: '8px', 
                border: 'none', 
                borderBottom: '1px solid #ccc', 
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: 'transparent',
                fontFamily: 'Volkhov, serif' 
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '50px',marginLeft:'50px' ,marginRight:'50px' }}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              style={{ 
                flex: 1, 
                padding: '8px', 
                border: 'none', 
                borderBottom: '1px solid #ccc', 
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: 'transparent',
                fontFamily: 'Volkhov, serif' 
              }}
            />
            <input
              type="tel"
              name="telephone"
              placeholder="Your Telephone"
              value={formData.telephone}
              onChange={handleChange}
              style={{ 
                flex: 1, 
                padding: '8px', 
                border: 'none', 
                borderBottom: '1px solid #ccc', 
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: 'transparent',
                fontFamily: 'Volkhov, serif' 
              }}
            />
          </div>

          <div style={{ marginBottom: '50px' ,marginLeft:'50px' ,marginRight:'50px'}}>
            <select
              name="request"
              value={formData.request}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: 'none', 
                borderBottom: '1px solid #ccc', 
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: 'transparent',
                fontFamily: 'Volkhov, serif' 
              }}
            >
              <option value="">Request</option>
              <option value="info">Information</option>
              <option value="support">Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message Textarea */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <textarea
              name="message"
              placeholder="Your Message..."
              value={formData.message}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                maxWidth: '500px', 
                padding: '12px', 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: 'transparent',
                resize: 'none', 
                fontFamily: 'Volkhov, serif', 
                fontSize: '14px', 
                lineHeight: '1.5', 
                height: '190px' 
              }}
            />
          </div>

          {/* Submit Button and Image */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px',position: 'relative' }}>
            
            <button
              type="submit"
              style={{ 
                display: 'flex', 
                padding: '11px 34px', 
                backgroundColor: '#DF6951', 
                color: 'white', 
                border: 'none', 
                justifyContent: 'center',
                boxSizing: 'border-box',
                borderRadius: '4px',
                maxWidth: '600px',
                fontSize: '22px', 
                fontWeight: 'bold',
                fontFamily: 'Volkhov, serif', 
                cursor: 'pointer', 
                transition: 'background-color 0.3s ease', 
                justifyItems:'center', marginBottom:'40px'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#C6533D'} 
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#DF6951'} 
            >
              Submit
            </button>

            {/* Image on the Far Right next to the button  */}
            <img 
              src="/assets/images/contact-us-img-3.png" 
              alt="Contact Us Illustration" 
              style={{ 
                width: '150px', 
                height: 'auto', 
                position: 'absolute', 
                right: '0', // the image at the far right
              }} 
            />
          </div>
        </form>
      </div>

      {/* Counter buttom  */}
      <div style={{ 
        width: '100%', 
        backgroundColor: '#f9f7f6', 
        color: 'black', 
        marginTop: '100px', 
        padding: '60px 0',
        position: 'relative',
      }}>
        {/* Background Image Overlay */}
        <img 
          src="/assets/images/h1-background-img-1 1.png" 
          alt="Background" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            zIndex: 1, 
          }} 
        />

        {/* Content Container */}
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '20 10px', 
          position: 'relative', 
          zIndex: 2, // overlay
        }}>
          {/* Heading with reduced left padding */}
          <h3 style={{ 
            color: '#DF6951', 
            fontFamily: 'Volkhov, serif', 
            fontSize: '1.5rem', 
            marginBottom: '30px', 
            paddingLeft: '5 px', 
          }}>
            TRAVEL EGYPT CUSTOMER SERVICE
          </h3>

          {/* Text content */}
          <div style={{ 
            paddingRight: '50px', 
          }}>
            <p style={{ margin: '20px 0' }}>Phone: [Phone Number]</p>
            <p style={{ margin: '20px 0' }}>Email: support@travilegypt.com</p>
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
  <p style={{ margin: '0 10px 0 0' }}>For Companies</p>
  <button
    type="submit"
    style={{ 
      padding: '8px 15px', 
      backgroundColor: '#DF6951', 
      color: 'white', 
      border: 'none', 
      borderRadius: '5px',
      fontSize: '12px', 
      fontWeight: 'bold',
      fontFamily: 'Volkhov, serif', 
      cursor: 'pointer', 
      transition: 'background-color 0.3s ease', 
    }}
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#C6533D'} 
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#DF6951'} 
    
  >
    Get in touch
  </button>
  
</div>

            
          </div>
        </div>

        {/* Image in the left bottom corner */}
        <img 
          src="/assets/images/Travel_Concepts_2 1.png" 
          alt="Travel Concepts" 
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            width: '200px', 
            height: 'auto', 
            zIndex: 3, // overlay 
          }} 
        />
      </div>
    </div>
  );
};

export default ContactUsForm;