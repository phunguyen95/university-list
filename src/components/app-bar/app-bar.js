import React, { useContext } from "react";
import _isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";
import css from "./app-bar.scss";
import { firebaseAuth } from "../../provider/AuthProvider";
import { TOKEN_LOGIN_KEY } from "../../constants/app-constant";
export default function Navbar() {
  const [isActive, setisActive] = React.useState(false);
  const { handleSignout } = useContext(firebaseAuth);
  const localStorageToken = window.localStorage.getItem(TOKEN_LOGIN_KEY);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Logo"
            width="112"
            height="28"
          />
        </a>

        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <div className="navbar-item">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/subscription" className="navbar-item">
              Subscription
            </Link>
            {_isEmpty(localStorageToken) ? (
              <Link to="/register" className="navbar-item">
                Register
              </Link>
            ) : (
              <Link onClick={handleSignout} to="/" className="navbar-item">
                Log out
              </Link>
            )}
            {_isEmpty(localStorageToken) && (
              <Link to="/login" className="navbar-item">
                Login
              </Link>
            )}
            {!_isEmpty(localStorageToken) && (
              <Link to="/favourites" className="navbar-item">
                Favourites
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
