// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Footer = () => {
//   const [showExpanded, setShowExpanded] = useState(false);
//   const [language, setLanguage] = useState('English (US)');
//   const [currency, setCurrency] = useState('$ USD');
//   const navigate = useNavigate();

//   const toggleFooter = () => setShowExpanded(!showExpanded);

//   const handleExit = () => {
//     setShowExpanded(false);
//     navigate('/');
//   };

//   const handleLanguageChange = (e) => setLanguage(e.target.value);
//   const handleCurrencyChange = (e) => setCurrency(e.target.value);

//   const mainFooter = (
//     <footer className="py-3 bg-white border-top">
//       <div className="container-fluid">
//         <div className="row justify-content-between align-items-center">
//           <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
//             <span>© 2024 Airbnb, Inc.</span>
//             <span className="mx-2">·</span>
//             <a href="#" className="text-decoration-none text-dark">Terms</a>
//             <span className="mx-2">·</span>
//             <a href="#" className="text-decoration-none text-dark">Sitemap</a>
//             <span className="mx-2">·</span>
//             <a href="#" className="text-decoration-none text-dark">Privacy</a>
//             <span className="mx-2">·</span>
//             <a href="#" className="text-decoration-none text-dark">Your Privacy Choices</a>
//           </div>
//           <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end align-items-center">
//             <div className="dropdown me-3">
//               <button className="btn btn-link text-dark text-decoration-none dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
//                 <i className="bi bi-globe"></i> {language}
//               </button>
//               <ul className="dropdown-menu" aria-labelledby="languageDropdown">
//                 <li><button className="dropdown-item" onClick={() => setLanguage('English (US)')}>English (US)</button></li>
//                 <li><button className="dropdown-item" onClick={() => setLanguage('Français')}>Français</button></li>
//                 <li><button className="dropdown-item" onClick={() => setLanguage('Español')}>Español</button></li>
//               </ul>
//             </div>
//             <div className="dropdown me-3">
//               <button className="btn btn-link text-dark text-decoration-none dropdown-toggle" type="button" id="currencyDropdown" data-bs-toggle="dropdown" aria-expanded="false">
//                 {currency}
//               </button>
//               <ul className="dropdown-menu" aria-labelledby="currencyDropdown">
//                 <li><button className="dropdown-item" onClick={() => setCurrency('$ USD')}>$ USD</button></li>
//                 <li><button className="dropdown-item" onClick={() => setCurrency('€ EUR')}>€ EUR</button></li>
//                 <li><button className="dropdown-item" onClick={() => setCurrency('£ GBP')}>£ GBP</button></li>
//               </ul>
//             </div>
//             <span onClick={toggleFooter} style={{cursor: 'pointer'}}>
//               Support & resources 
//               <i className={`bi bi-chevron-${showExpanded ? 'up' : 'down'} ms-1`}></i>
//             </span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );

//   const expandedFooter = (
//     <footer className="py-4 bg-white border-top">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-12 mb-4">
//             <button onClick={handleExit} className="btn btn-close float-end" aria-label="Close"></button>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-4 mb-3">
//             <h6 className="mb-3">Support</h6>
//             <ul className="list-unstyled">
//               <li><a href="#" className="text-decoration-none text-dark">Help Center</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Get help with a safety issue</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">AirCover</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Anti-discrimination</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Disability support</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Cancellation options</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Report neighborhood concern</a></li>
//             </ul>
//           </div>
//           <div className="col-md-4 mb-3">
//             <h6 className="mb-3">Hosting</h6>
//             <ul className="list-unstyled">
//               <li><a href="#" className="text-decoration-none text-dark">Airbnb your home</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">AirCover for Hosts</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Hosting resources</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Community forum</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Hosting responsibly</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Airbnb-friendly apartments</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Join a free Hosting class</a></li>
//             </ul>
//           </div>
//           <div className="col-md-4 mb-3">
//             <h6 className="mb-3">Airbnb</h6>
//             <ul className="list-unstyled">
//               <li><a href="#" className="text-decoration-none text-dark">Newsroom</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">New features</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Careers</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Investors</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Gift cards</a></li>
//               <li><a href="#" className="text-decoration-none text-dark">Airbnb.org emergency stays</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );

//   return (
//     <div className="footer-wrapper">
//       {showExpanded ? expandedFooter : mainFooter}
//     </div>
//   );
// };

// export default Footer;


// src/components/Footer.jsx

import React from 'react';
import { Link } from "react-router-dom"; 


const Footer = () => {
  return (
    <footer className="footer py-5" style={{
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-color)'
    }}>
      <hr style={{ borderColor: 'var(--border-color)' }} />
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Cool Staff</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="https://www.linkedin.com/in/ibrahim1saber/" target="_blank" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>
                  Ibrahim Saber
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.linkedin.com/in/khalidhamdii/" target="_blank" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>
                  Khaled Hamdy
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.linkedin.com/in/basmala-salem/" target="_blank" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>
                  Basmala Salem
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.linkedin.com/in/davidemad10/" target="_blank" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>
                  David Emad
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.linkedin.com/in/michael-emad-7a9a25277/" target="_blank" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>
                  Michael Emad
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Pages</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>Home</a>
              </li>
              <li className="mb-2">
                <a href="/MyReservations" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>Your Reservations</a>
              </li>
              <li className="mb-2">
                <a href="/my-favorites" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>Your Favorites</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">About</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
              <a href="/team" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>Meet Our Team</a>

            </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Help</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
              <a href="/contact-support" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>Support</a>
              </li>
              <li className="mb-2">
              <a href="/terms" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>Terms and Conditions
              </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 mb-4">
            <h5 className="fw-bold">Stay Connected</h5>
            <div>
              <a href="#" className="me-3 text-decoration-none" style={{ color: 'var(--text-color)' }}>
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
              <a href="#" className="me-3 text-decoration-none" style={{ color: 'var(--text-color)' }}>
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="me-3 text-decoration-none" style={{ color: 'var(--text-color)' }}>
                <i className="fab fa-google-plus-g fa-lg"></i>
              </a>
              <a href="#" className="text-decoration-none" style={{ color: 'var(--text-color)' }}>
                <i className="fab fa-linkedin-in fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="row border-top pt-4" style={{ borderColor: 'var(--border-color)' }}>
          <div className="col-md-3 mb-3">
            <strong>ITI Graduation Project</strong>
          </div>
          <div className="col-md-3 mb-3">
            <h6 className="fw-bold">Address</h6>
            <address className="mb-0" style={{ color: 'var(--text-muted)' }}>
              Building 4, Knowledge City<br />
              New Administrative Capital, Cairo, Egypt
            </address>
          </div>
          <div className="col-md-3 mb-3">
            <h6 className="fw-bold">About Us</h6>
            <p className="mb-0" style={{ color: 'var(--text-muted)' }}>
              This project was created by 5 students from the <strong>Institute of Information Technology</strong>.
            </p>
          </div>
          <div className="col-md-3 mb-3 text-md-end">
            <Link to="/" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} ITI-GP-Airbnb. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;