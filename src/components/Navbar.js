import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); 

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      style={{
        backgroundColor: "transparent", 
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          style={{
            color: "#DF6951",
            paddingLeft: "40px",
            fontSize: "1.8rem",
          }}
          to="/"
        >
          Travel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav ms-auto justify-content-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/about-us" ? "active" : ""}`}
                style={{
                  fontSize: "1.2rem",
                  position: "relative",
                }}
                to="/about-us"
              >
                About Us
                {location.pathname === "/about-us" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#DF6951", 
                    }}
                  ></div>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/packages" ? "active" : ""}`}
                style={{
                  fontSize: "1.2rem",
                  position: "relative",
                }}
                to="/packages"
              >
                Packages
                {location.pathname === "/packages" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#DF6951", 
                    }}
                  ></div>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/contact-us" ? "active" : ""}`}
                style={{
                  fontSize: "1.2rem",
                  position: "relative",
                }}
                to="/contact-us"
              >
                Contact Us
                {location.pathname === "/contact-us" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#DF6951", 
                    }}
                  ></div>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/contact-us" ? "active" : ""}`}
                style={{
                  fontSize: "1.2rem",
                  position: "relative",
                }}
                to="/GetInTouch"
              >
                Get In Touch
                {location.pathname === "/GetInTouch" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#DF6951", 
                    }}
                  ></div>
                )}
              </Link>
            </li>
          </ul>

          {/* sign up button */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="btn nav-link text-white"
                to="SignUp"
                style={{
                  backgroundColor: "#DF6951",
                  borderColor: "#DF6951",
                  paddingRight: "10px",
                  fontSize: "1.2rem",
                }}
              >
                SignUp
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
