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
              <NavLink className="nav-link" to="/Search">
                Search
              </NavLink>
            </li>
            <li className="nav-items">
              <NavLink className="nav-link" to="/Favorites">
                Favorites
              </NavLink>
            </li>
            <li className="nav-items">
              <NavLink className="nav-link" to="/Random">
                Random
              </NavLink>
            </li>
            <li className="nav-items">
              <NavLink className="nav-link" to="/Login">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </main>
    </header>
  );
}

export default Header;