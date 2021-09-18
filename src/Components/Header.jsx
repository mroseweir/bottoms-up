import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <main>
        <nav>
          <ul className="nav-list">
            <li className="nav-items">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-items">
              <NavLink
                className="nav-link"
                activeClassName="active-link"
                to="/Search"
              >
                Search
              </NavLink>
            </li>
            <li className="nav-items">
              <NavLink
                className="nav-link"
                activeClassName="active-link"
                to="/Favorites"
              >
                Favorites
              </NavLink>
            </li>
            <li className="nav-items">
              <NavLink
                className="nav-link"
                activeClassName="active-link"
                to="/Random"
              >
                Random
              </NavLink>
            </li>
            <li className="nav-items">
              <NavLink
                className="nav-link"
                activeClassName="active-link"
                to="/Login"
              >
                Account
              </NavLink>
            </li>
          </ul>
        </nav>
      </main>
    </header>
  );
}

export default Header;
