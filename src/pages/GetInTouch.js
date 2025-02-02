import React, { useState } from 'react';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    owner: '',
    name: '',
    commonRegistrationNumber: '',
    phoneNumber: '',
    whatsapp: '',
    email: '',
    companyAddress: '',
    contactPersonName: '',
    contactEmail: '',
    contactPersonNumber: '',
    typeOfType: '',
    keyOfficialNames: '',
    specialActivities: '',
    additionalDocument: '',
    acceptTerms: false // Added for the checkbox
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add form submission logic here
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
    <div style={{ position: 'relative', width: '100%', marginBottom: '20px',}}>
  <img 
    src="/assets/images/getintouch1.png" 
    alt="Contact Us" 
    style={{ width: '100%', height: 'auto', }} 
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
    Get In Touch
  </div>
</div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', boxShadow: '0 4px 6px rgba(51, 51, 51, 0.1)' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Two inputs per row */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px',marginTop:'20px' }}>
            <div style={{ flex: 1 }}>
              <label>Company Name</label> <label style={{color:'red'}}>*</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g., ABC Corporation"
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Owner</label><label style={{color:'red'}}>*</label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label>Company Email</label><label style={{color:'red'}}>*</label>
              <input
                type="email"
                name="Company email"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., info@abccorp.com"
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Commercial Registration Number</label><label style={{color:'red'}}>*</label>
              <input
                type="text"
                name="Commercial Registration Number"
                value={formData.CommercialRegistrationNumber}
                onChange={handleChange}
                placeholder="e.g., 123456789"
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label>Phone Number</label><label style={{color:'red'}}>*</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g., +1234567890"
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Website URL</label>
              <input
                type="text"
                name="Website URL"
                value={formData.WebsiteURL}
                onChange={handleChange}
                placeholder="e.g., www.abccorp.com"
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            
            <div style={{ flex: 1 }}>
              <label>Company Address</label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                placeholder="e.g., 123 Main St, City, Country"
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
          </div>

         

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px',marginTop:'60px' }}>
            <div style={{ flex: 1 }}>
              <label>Contact Person Name</label><label style={{color:'red'}}>*</label>
              <input
                type="text"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                placeholder="e.g., Jane Smith"
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Contact Email</label><label style={{color:'red'}}>*</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="e.g., jane.smith@abccorp.com"
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Contact Person Number</label><label style={{color:'red'}}>*</label>
            <input
              type="text"
              name="contactPersonNumber"
              value={formData.contactPersonNumber}
              onChange={handleChange}
              placeholder="e.g., +1234567890"
              style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px',marginTop:'60px' }}>
            <div style={{ flex: 1 }}>
              <label>Type of Trips</label><label style={{color:'red'}}>*</label>
              <input
                type="text"
                name="typeOfType"
                value={formData.typeOfType}
                onChange={handleChange}
                placeholder="e.g., Business, Leisure"
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Key Destinations</label>
              <input
                type="text"
                name="Key Destinations"
                value={formData.KeyDestinations}
                onChange={handleChange}
                placeholder="e.g., New York, Paris"
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Special Activities</label>
            <input
              type="text"
              name="specialActivities"
              value={formData.specialActivities}
              onChange={handleChange}
              placeholder="e.g., Team Building, Adventure Sports"
              style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Additional Document Layout</label>
            <input
              type="file"
              name="additionalDocument"
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f1f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
            />
          </div>

          {/* Gray box for terms and conditions with image */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px',marginTop:'60px' }}>
            <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px', flex: 1 }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>By Submitting the Form, You Agree To:</p>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                <li>Present Accounts of the 1st Course Nomination.</li>
                <li>Before written as Description and Release Customer Composition Propriety.</li>
                <li>Some We work on Your Code and The Details for Promotion.</li>
                <li>Completion of All Application to your own Website Project.</li>
              </ul>
              <div style={{ marginTop: '10px',color:'#2642a8 '  }}>
                <label>
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    style={{ marginRight: '10px'}}
                  />
                  Accepts the File Available Now From Post Your Account for Policy violations.
                </label>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <img 
                src="/assets/images/273 1.png" 
                alt="Terms and Conditions" 
                style={{ width: '65%', height: 'auto', borderRadius: '5px' }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#DF6951', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                width: '20%',
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetInTouch;