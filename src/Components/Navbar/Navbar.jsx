import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ userData, logOut }) {
  return (
    <div className="mb-5 pb-3">
        <nav className="navbar navbar-expand-md navbar-dark   fixed-top  bg-nav w-100">
        <div className="container-fluid">
          <Link className="navbar-brand text-light font-nav-logo" to="/">
            <h3>Noxe</h3>
          </Link>
          <button
            className="navbar-toggler d-lg-none "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="movies">
                    Movies
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="Tvshow">
                    Tvshow
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="people">
                    People
                  </Link>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto ">
              <li className="nav-item d-flex align-items-center">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-soundcloud my-2"></i>
              </li>

              {userData === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="register">
                      Register
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link active" to="login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item d-flex align-items-center ">
                    <Link to="search">
                      <i class="fa-brands fa-searchengin mx-2 fa-lg"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span onClick={logOut} className="nav-link">
                      Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>

      
  );
}
