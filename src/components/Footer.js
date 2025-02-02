import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {/* Your second container content goes here */}
      </div>

      {/* Footer */}
      <footer
        className="text-center text-lg-start"
        style={{
          flexShrink: 0,
          backgroundColor: "transparent",
          position: "relative",
          zIndex: 1,
          marginTop: "80px", // Reduced space above the footer
        }}
      >
        <div className="container p-4">
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "30px",
            }}
          >
            {/* Travel Section */}
            <div className="col-lg-3 col-md-6 mb-4" style={{ flex: 1, padding: "0 15px" }}>
              <h5 className="text-uppercase" style={{ color: "black" }}>Travel</h5>
              <ul className="list-unstyled">
                <li>
                  <p style={{ fontSize: "0.9rem", color: "#4a4a4a" }}>
                    Travel helps companies manage payments easily.
                  </p>
                </li>
                <li className="d-flex gap-2 mt-2">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#DF6951" }}>
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#DF6951" }}>
                    <i className="fab fa-facebook-f fa-lg"></i>
                  </a>
                  <a href="https://messenger.com" target="_blank" rel="noopener noreferrer" style={{ color: "#DF6951" }}>
                    <i className="fab fa-facebook-messenger fa-lg"></i>
                  </a>
                  <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" style={{ color: "#DF6951" }}>
                    <i className="fab fa-whatsapp fa-lg"></i>
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div className="col-lg-3 col-md-6 mb-4" style={{ flex: 1, padding: "0 15px" }}>
              <h5 className="text-uppercase" style={{ color: "black" }}>Company</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/about-us" className="text-dark" aria-label="About Us" style={{ textDecoration: "none" }}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-dark" aria-label="Careers" style={{ textDecoration: "none" }}>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-dark" aria-label="Blog" style={{ textDecoration: "none" }}>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-dark" aria-label="Pricing" style={{ textDecoration: "none" }}>
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="col-lg-3 col-md-6 mb-4" style={{ flex: 1, padding: "0 15px" }}>
              <h5 className="text-uppercase" style={{ color: "black" }}>Join Our Newsletter</h5>
              <form className="d-flex align-items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control border-0"
                  style={{ borderRadius: "0", height: "40px", backgroundColor: "#f5f5f5" }}
                />
                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: "#DF6951",
                    color: "#fff",
                    borderRadius: "0 5px 5px 0",
                    height: "40px",
                  }}
                >
                  Subscribe
                </button>
              </form>
              <p style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                *Receive weekly updates and exclusive tour packages.
              </p>
            </div>

            {/* Contact Section */}
            <div className="col-lg-3 col-md-6 mb-4" style={{ flex: 1, padding: "0 15px" }}>
              <h5 className="text-uppercase" style={{ color: "black" }}>Contact</h5>
              <p>
                <i className="fas fa-envelope" style={{ color: "#DF6951", marginRight: "8px" }}></i>
                Email: <a href="mailto:info@travelwebsite.com" className="text-dark">info@travelwebsite.com</a>
                <br />
                <i className="fas fa-phone" style={{ color: "#DF6951", marginRight: "8px" }}></i>
                Phone: <a href="tel:+1234567890" className="text-dark">+1 234 567 890</a>
              </p>
            </div>
          </div>
        </div>

        {/* Line */}
        <div
          className="container"
          style={{ paddingLeft: "15px", paddingRight: "15px" }}
        >
          <hr style={{ borderTop: "1px solid rgb(0, 0, 0)", margin: "0" }} />
        </div>

        {/* Footer Bottom */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "transparent", paddingLeft: "30px", paddingRight: "30px" }}
        >
          © 2025 Travel Website | All Rights Reserved
        </div>
      </footer>

      {/* Image */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          width: "577px",
          height: "350px",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <img
          src="/assets/images/Footer img.png"
          alt="Footer Decoration"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default Footer;