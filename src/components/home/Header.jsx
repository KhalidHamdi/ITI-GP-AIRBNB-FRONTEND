// src/components/Header/Header.jsx

import React from "react";
import AppLogo from "./AppLogo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { useDispatch } from "react-redux";
import { openAddPropertyModal } from "../../redux/modalSlice";
import { Switch } from "@mui/material";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Header.css"; // Import custom CSS for additional styling

const Header = ({ toggleDarkMode, darkMode }) => {
  const dispatch = useDispatch();

  const airbnbYourHome = () => {
    dispatch(openAddPropertyModal());
  };

  return (
    <Navbar
      expand="lg"
      bg={darkMode ? "dark" : "white"}
      variant={darkMode ? "dark" : "light"}
      className="border-bottom py-3"
      sticky="top"
    >
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand href="/">
          <AppLogo />
        </Navbar.Brand>

        {/* Search Bar */}
        <div className="d-none d-lg-block flex-grow-1 mx-3">
          <Search />
        </div>

        {/* Right Side Menu */}
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          <Nav className="ms-auto align-items-center">
            {/* Airbnb Your Home */}
            <Nav.Item className="me-3">
              <button
                className="btn btn-link text-decoration-none fw-bold"
                onClick={airbnbYourHome}
              >
                Airbnb your home
              </button>
            </Nav.Item>

            {/* Globe Icon */}
            <Nav.Item className="me-3">
              <button className="btn btn-link p-0">
                <i className="bi bi-globe fs-5"></i>
              </button>
            </Nav.Item>

            {/* Dark Mode Switch */}
            <Nav.Item className="d-flex align-items-center me-3">
              <Switch onChange={toggleDarkMode} checked={darkMode} />
              <span className="fw-bold ms-1">
                {darkMode ? "Light" : "Dark"}
              </span>
            </Nav.Item>

            {/* User Menu */}
            <Nav.Item>
              <UserMenu airbnbYourHome={airbnbYourHome} />
            </Nav.Item>
          </Nav>

          {/* Search Bar for Mobile */}
          <div className="d-block d-lg-none mt-3">
            <Search />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
