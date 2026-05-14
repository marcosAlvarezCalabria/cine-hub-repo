import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../../assets/images/cineHub2.png";
import AuthContext from "../../../contexts/auth.context";
import UserAvatar from "../user-avatar/user-avatar";

function Navbar() {
  const { user, doLogout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar fixed-top app-navbar ${isScrolled ? "app-navbar--solid" : ""}`}>
      <div className="container-fluid app-navbar__inner">
        <NavLink to="/" className="navbar-brand app-navbar__brand">
          <img src={logo} alt="CineHub" />
          <div className="app-navbar__brand-copy">
            <span>CineHub</span>
            <small>Discover what to watch next</small>
          </div>
        </NavLink>

        <div className="app-navbar__actions">
          {user ? (
            <>
              <NavLink className="app-navbar__profile" to="/profile">
                <UserAvatar user={user} />
              </NavLink>
              <button className="app-navbar__button app-navbar__button--ghost" onClick={doLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/main" className="app-navbar__button app-navbar__button--ghost">
                Browse
              </NavLink>
              <NavLink to="/login" className="app-navbar__button app-navbar__button--primary">
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
