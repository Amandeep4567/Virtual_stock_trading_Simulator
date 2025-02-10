import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/trading">Trade</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Logout ({user.username})</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
