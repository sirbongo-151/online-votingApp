import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddUserMutation } from "../redux/apiSlice";
import UsersTable from "../components/UsersTable";
import Loading from "../components/Loading";

const Users = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Hook should be called at the top level
  const [addUser, { isLoading }] = useAddUserMutation();

  const notifySuccess = () => toast.success("User created successfully");
  const notifyError = (message) => toast.error(message || "Error creating user");

  const handleAddUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = newUser;
    if (!newUser.name || !newUser.email || !newUser.password) {
      notifyError("All fields are required");
      return;
    }

    try {
      const response = await addUser({name,email,password})
      console.log(response);
      if (response) {
        notifySuccess();
        setNewUser({ name: "", email: "", password: "" });
      }
    } catch (error) {
      notifyError(error?.data?.message || "Failed to create user");
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-10">
     

      <div className="justify-center items-center">
        <div className="w-120 border-2 border-gray-400 rounded-3xl shadow-xl p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Add New User</h1>
          <form onSubmit={handleAddUser} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full border-b-2 outline-none p-2"
              required
            />
            <input
              type="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full border-b-2 outline-none p-2"
              required
            />
            {/* <input
              type="tel"
              placeholder="Enter phone number"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              className="w-full border-b-2 outline-none p-2"
              required
            /> */}
            <input
              type="password"
              placeholder="Enter password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full border-b-2 outline-none p-2"
              required
            />
            <button
              type="submit"
              className={`w-full text-white text-xl p-2 rounded-2xl transition-all ${
                isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? <Loading/> : "Add new user"}
            </button>
          </form>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
      <div>
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
