import React from 'react';
import { NavLink } from 'react-router';

const NavSkeleton = () => {
    return (
      <>
        <li>
          <div className="h-5 w-32 bg-base-300 rounded animate-pulse"></div>
        </li>

        <li>
          <div className="h-5 w-28 bg-base-300 rounded animate-pulse"></div>
        </li>

        <li>
          <div className="h-5 w-24 bg-base-300 rounded animate-pulse"></div>
        </li>
      </>
    );
};

export default NavSkeleton;