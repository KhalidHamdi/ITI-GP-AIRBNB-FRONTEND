import React from "react";
import { Menu } from "lucide-react";
import AvatarComponent from "./Avatar";
import { Link } from "react-router-dom";

const UserMenu = ({ airbnbYourHome }) => {
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
          <a className="dropdown-item" href="#">
            Login
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Sign up
          </a>
        </li>
        <li>
          <a className="dropdown-item">
            <Link to="/chat" style={{ color: "black", textDecoration: "none" }}>
              inbox
            </Link>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item" href="#" onClick={airbnbYourHome}>
            Airbnb your home
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Host an experience
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Help Center
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
