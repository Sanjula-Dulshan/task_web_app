import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const handleLogout = () => {
    console.log("logout");
    localStorage.clear();
    console.log(localStorage.getItem("token"));
    window.location.href = "/";
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/home">
          Task App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/home"}
              >
                Home
              </Link>
            </li>
          </ul>

          <Link className="logout" onClick={handleLogout}>
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
