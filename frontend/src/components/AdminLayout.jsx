import React from "react";
import { Outlet, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const AdminLayout = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-800 to-purple-800 h-20">
        <ul className="flex text-2xl text-white justify-center items-center gap-2 py-4">
          <li className="bg-white text-gray-700 p-2 rounded-md font-semibold">
            <Link to="/admin">Voting List</Link>
          </li>
          <li className="bg-white text-gray-700 p-2 rounded-md font-semibold">
            <Link to="/users">Users</Link>
          </li>
          <li className="bg-white text-gray-700 p-2 rounded-md font-semibold">
            <Link to="/candidates">Candidates</Link>
          </li>
          <li className="bg-white text-gray-700 p-2 rounded-md font-semibold">
            <Link to="/view-votes">View Votes</Link>
          </li>

         
          {/* Logout button */}
          <LogoutButton/>
        </ul>
      </nav>
      
      {/* Nested admin routes will be rendered here */}
      <div style={{ padding: "1rem" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
