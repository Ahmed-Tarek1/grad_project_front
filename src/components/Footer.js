import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              We are a travel company committed to providing you with amazing
              experiences and unforgettable memories.
            </p>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about-us" className="text-dark">About Us</a>
              </li>
              <li>
                <a href="/packages" className="text-dark">Packages</a>
              </li>
              <li>
                <a href="/contact-us" className="text-dark">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <p>
              Email: info@travelwebsite.com <br />
              Phone: +1 234 567 890
            </p>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © 2024 Travel Website | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
