import React from "react";
import { Menu } from "lucide-react";
import AvatarComponent from "./Avatar";
import { Link } from "react-router-dom";
import useLoginModal from "../../hooks/useLoginModal";
import useSignupModal from "../../hooks/useSignupModal";

const UserMenu = ({ airbnbYourHome }) => {
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();

  return (
    <div className="dropdown">
      <button
        className="btn d-flex align-items-center gap-2 p-2 rounded-circle border"
        type="button"
        id="userMenuDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <Menu />
        <AvatarComponent />
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="userMenuDropdown"
      >
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              loginModal.open();
            }}
          >
            Login
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              signupModal.open();
            }}
          >
            Sign up
          </button>
        </li>
        <li>
          <Link to="/chat" className="dropdown-item">
            Inbox
          </Link>
        </li>
        <li>
          <Link to="/MyReservations" className="dropdown-item">
            My Reservation
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item" onClick={airbnbYourHome}>
            Airbnb your home
          </button>
        </li>
        <li>
          <button className="dropdown-item">Host an experience</button>
        </li>
        <li>
          <button className="dropdown-item">Help Center</button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
