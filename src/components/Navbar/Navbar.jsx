import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";
import NavSkeleton from "../Skeletons/NavSkeleton";

const Navbar = () => {
  const { user, loading } = useAuth();
  const navLinks = (
    <>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/services'>Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink  to='/contact'>Contact</NavLink>
      </li>
      {loading ? (
        <NavSkeleton></NavSkeleton>
      ) : (
        user && (
          <>
            <li>
              <NavLink to="/dashboard/sendParcel">Send Parcel</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myParcels">My Parcels</NavLink>
            </li>
            <li>
              <NavLink to="/rider">Be A Rider</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </>
        )
      )}
    </>
  );
  return (
    <div className="my-7 ">
      <div className="navbar bg-white shadow-sm rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>

          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {loading ? (
            <Loader />
          ) : user ? (
            <>
              <img
                className="rounded-full h-12 w-12 object-cover"
                src={user.photoURL}
                alt="profile"
                   title={user.displayName}
                  referrerPolicy="no-referrer"
              />
            </>
          ) : (
            <Link to="/login" className="btn btn-primary text-black">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
