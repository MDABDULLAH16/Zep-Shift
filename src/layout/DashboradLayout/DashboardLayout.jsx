import React from "react";
import { NavLink, Outlet } from "react-router";
import { Home, Package, Truck, Settings, LogOut, LucideHome, LayoutDashboard, CreditCard, Bike, Users2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const DashboardLayout = () => {
  const { logOut } = useAuth();
  const handleLogOut = () => {
    logOut();
  }
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 
                  is-drawer-close:tooltip is-drawer-close:tooltip-right
                  ${isActive ? "bg-primary text-black" : ""}`
          }
          data-tip="Dashboard"
        >
          <LucideHome size={20} />
          <span className="is-drawer-close:hidden">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 
                  is-drawer-close:tooltip is-drawer-close:tooltip-right
                  ${isActive ? "bg-primary text-black" : ""}`
          }
          data-tip="Dashboard"
        >
          <LayoutDashboard size={20} />
          <span className="is-drawer-close:hidden">Dashboard</span>
        </NavLink>
      </li>

      {/* Send Parcel */}
      <li>
        <NavLink
          to="/dashboard/sendParcel"
          className={({ isActive }) =>
            `flex items-center gap-3 
                  is-drawer-close:tooltip is-drawer-close:tooltip-right
                  ${isActive ? "bg-primary text-black" : ""}`
          }
          data-tip="Send Parcel"
        >
          <Package size={20} />
          <span className="is-drawer-close:hidden">Send Parcel</span>
        </NavLink>
      </li>

      {/* My Parcels */}
      <li>
        <NavLink
          to="/dashboard/myParcels"
          className={({ isActive }) =>
            `flex items-center gap-3 
                  is-drawer-close:tooltip is-drawer-close:tooltip-right
                  ${isActive ? "bg-primary text-black" : ""}`
          }
          data-tip="My Parcels"
        >
          <Truck size={20} />
          <span className="is-drawer-close:hidden">My Parcels</span>
        </NavLink>
      </li>

      {/* rider apply */}
      <li>
        <NavLink
          to="/dashboard/rider-apply"
          className={({ isActive }) =>
            `flex items-center gap-3 
                  is-drawer-close:tooltip is-drawer-close:tooltip-right
                  ${isActive ? "bg-primary text-black" : ""}`
          }
          data-tip="Rider Apply"
        >
          <Bike size={20} />
          <span className="is-drawer-close:hidden">Rider Apply</span>
        </NavLink>
      </li>
      {/* users management */}
      <li>
        <NavLink
          to="/dashboard/users-management"
          className={({ isActive }) =>
            `flex items-center gap-3 
                  is-drawer-close:tooltip is-drawer-close:tooltip-right
                  ${isActive ? "bg-primary text-black" : ""}`
          }
          data-tip="Users Management"
        >
          <Users2 size={20} />
          <span className="is-drawer-close:hidden">Users Management</span>
        </NavLink>
      </li>
      {/* payment history */}
      <li>
        <NavLink
          to="/dashboard/payment-history"
          className={({ isActive }) =>
            `flex items-center gap-3 
                  is-drawer-close:tooltip is-drawer-close:tooltip-right
                  ${isActive ? "bg-primary text-black" : ""}`
          }
          data-tip="Payment History"
        >
          <CreditCard size={20} />
          <span className="is-drawer-close:hidden">Payment History</span>
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Drawer controller */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <nav className="navbar bg-base-300 px-4">
          <label
            htmlFor="my-drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="size-5"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </label>
          <h1 className="text-xl font-semibold">Zep-Shift Dashboard</h1>
        </nav>

        {/* Page Content */}
        <div className="">
          <Outlet />
        </div>
      </div>

      {/* Sidebar / Drawer */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <div
          className="flex min-h-full flex-col bg-base-200 
          is-drawer-close:w-16 is-drawer-open:w-64 transition-all duration-300"
        >
          {/* Sidebar Menu */}
          <ul className="menu w-full grow p-2">
            {/* Dashboard */}
          {navLinks}

            {/* Logout */}
            <li className="mt-auto">
              <button onClick={handleLogOut}
                className="flex items-center gap-3 text-error 
                is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Logout"
              >
                <LogOut size={20} />
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
