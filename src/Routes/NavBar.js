import React, { useContext } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import SearchHome from "./Searches/SearchHome";
import { IsLogInContext, CurrentUserContext } from "../App";

function NavBar({ handleLogout }) {
  const { isLogIn } = useContext(IsLogInContext);
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const logoutAndRedirect = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="navbar bg-primary container-fluid">
      <Navbar
        expand="md"
        className="w-100 d-flex justify-content-between align-items-center"
      >
        <NavLink to="/" className="navbar-brand text-white">
          <h1 className="fs-3 m-0">NewBookAi</h1>
        </NavLink>

        {!isHome && <SearchHome />}

        <Nav className="d-flex align-items-center gap-2">
          {isLogIn ? (
            <>
              <NavItem>
                <NavLink
                  className="btn btn-light"
                  to={`/profile/${currentUser}`}
                >
                  Profile ({currentUser})
                </NavLink>
              </NavItem>
              <NavItem>
                <button onClick={logoutAndRedirect} className="btn btn-danger">
                  Log Out
                </button>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink to="/login" className="btn btn-light">
                  Log In
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink to="/signup" className="btn btn-light">
                  Sign Up
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
