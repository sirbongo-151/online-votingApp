import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAddUserMutation } from "../redux/apiSlice";
import Loading from "../components/Loading";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [addUser, { isLoading }] = useAddUserMutation();

  const notifySuccess = () => toast.success("Sign up successfully!");
  const notifyError = (msg) => toast.error(msg);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      notifyError("All fields are required");
      return;
    }

    try {
      const response = await addUser({ name, email, password }).unwrap();
      console.log(response);
      notifySuccess();
      setFormData({ name: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      notifyError(error?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 gap-4 bg-base-100">
      <div className="max-w-md">
        <h1 className="text-4xl text-center font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleAddUser} className="flex flex-col gap-3 justify-center items-center mx-auto mt-12-col gap-4">
          <input
            type="text"
            placeholder="Username"
            required
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border border-gray-400 rounded-xl p-2"
          />
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-gray-400 rounded-xl p-2"
          />
          <div className="relative w-full border border-gray-400 rounded-xl p-2 flex items-center">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full outline-none"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="ml-2"
            >
              {passwordVisible ? <EyeClosed /> : <Eye />}
            </button>
          </div>
          <button
            type="submit"
            className={`w-full text-white text-xl p-2 rounded-2xl transition-all ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-800 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:underline">
            Login
          </Link>
        </p>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default SignUp;
