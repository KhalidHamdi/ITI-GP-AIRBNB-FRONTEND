import React from "react";
import AppLogo from "./AppLogo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { useDispatch } from "react-redux";
import { openAddPropertyModal } from "../../redux/modalSlice";
import { Switch } from "@mui/material";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = ({ toggleDarkMode, darkMode }) => {
  const dispatch = useDispatch();

  const airbnbYourHome = () => {
    dispatch(openAddPropertyModal());
  };

  return (
    <>
      <Navbar
        expand="md"
        bg={darkMode ? "dark" : "white"}
        variant={darkMode ? "dark" : "white"}
        className="border-bottom p-2 pb-3 mb-2"
      >
        <Container fluid className="px-md-5">
          <Navbar.Brand>
            <AppLogo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-content" />
          <Navbar.Collapse id="navbar-content">
            {/* Move Search inside Navbar for better alignment */}
            <Nav className="me-auto w-100">
              <div className="d-flex justify-content-center w-100">
                <Search />
              </div>
            </Nav>
            <Nav className="ms-auto align-items-center flex-column flex-md-row">
              {/* "Airbnb your home" button */}
              <Nav.Item className="mb-2 mb-md-0">
                <button
                  className={`btn btn-link ${
                    darkMode ? "text-light" : "text-dark"
                  } text-decoration-none p-0 fw-bold me-md-3`}
                  style={{ whiteSpace: "nowrap" }}
                  onClick={airbnbYourHome}
                >
                  Airbnb your home
                </button>
              </Nav.Item>
              {/* Globe icon */}
              <Nav.Item className="mb-2 mb-md-0">
                <button
                  className={`btn btn-link ${
                    darkMode ? "text-light" : "text-dark"
                  } p-0 me-md-3`}
                  onClick={airbnbYourHome}
                >
                  <i className="bi bi-globe"></i>
                </button>
              </Nav.Item>
              {/* Dark mode switch */}
              <Nav.Item className="d-flex align-items-center mb-2 mb-md-0 me-md-3">
                <Switch onChange={toggleDarkMode} checked={darkMode} />
                <span
                  className={`${
                    darkMode ? "text-light" : "text-dark"
                  } fw-bold p-0 ms-1`}
                >
                  {darkMode ? "Light" : "Dark"}
                </span>
              </Nav.Item>
              {/* User Menu */}
              <Nav.Item>
                <UserMenu airbnbYourHome={airbnbYourHome} />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
