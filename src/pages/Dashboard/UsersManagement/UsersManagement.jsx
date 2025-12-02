import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Shield, ShieldCheck, ShieldOff } from "lucide-react";
import Swal from "sweetalert2";

const UsersManagement = () => {
    const [searchText,setSearchText]= useState('')
  const axiosSecure = useAxiosSecure();
  const {refetch, data: users = [] } = useQuery({
    queryKey: ["users",searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });
  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    Swal.fire({
      title: "Are you sure?",
      text: "You will able to revert this Later!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it!",
    }).then((result) => {
        if (result.isConfirmed) {
          console.log(user._id);
          
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
            if (res.data.modifiedCount) {
              refetch()
              Swal.fire({
              title: "Done!",
              text: `${user.name} has been promoted Admin`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleMakeUser = (user) => {
    const roleInfo = { role: "user" };
    Swal.fire({
      title: "Are you sure?",
      text: "You will able to revert this Later!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it!",
    }).then((result) => {
        if (result.isConfirmed) {
          console.log(user._id);
          
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
            if (res.data.modifiedCount) {
              refetch()
              Swal.fire({
              title: "Done!",
              text: `${user.name} has been User`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h1>Welcome to User Management Page: {users.length}</h1>
          {/* <p>search text { searchText}</p> */}
      <div>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input onChange={(e)=>setSearchText(e.target.value)} type="search" className="grow" placeholder="Search user with name and email" />
          
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th># No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.image} alt="profile" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <th>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleMakeUser(user)}
                      className="btn tooltip"
                      data-tip="Make User"
                    >
                      <ShieldOff color="#e21212" />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="tooltip btn"
                        data-tip="Make Admin"
                      >
                        <ShieldCheck color="#16e212" />
                      </button>
                    </>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
