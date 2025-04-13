// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ adminOnly }) => {
//   const { userInfo } = useSelector((state) => state.auth);

//   if (!userInfo) return <Navigate to="/login" />;
//   if (adminOnly && !userInfo.isAdmin) return <Navigate to="/dashboard" />;

//   return <Outlet />;
// };

// export default ProtectedRoute;
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice"; // Adjust import based on your file structure

const ProtectedRoute = ({ requiredRole }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    
    const storedData = localStorage.getItem("user");
    if (!storedData) {
      setErrorMessage("Login failed. User data is missing.");
      setLoading(false);
      return;
    }

    let userData;
    try {
      userData = JSON.parse(storedData);
    } catch (error) {
      setErrorMessage("Invalid user data. Please login again.");
      setLoading(false);
      return;
    }

    
    if (!userData.user || !userData.user.role) {
      setErrorMessage("Login failed. User data is missing.");
      setLoading(false);
      return;
    }

    
    const { user, token } = userData;
    dispatch(setUser({ user, token }));
    // console.log("User role:", user.role);

    if (requiredRole && user.role !== requiredRole) {
      setTimeout(() => {
        if (user.role === "admin") {
          // console.log("Navigating to /admin");
          navigate("/admin");
        } else {
          // console.log("Navigating to /user");
          navigate("/user");
        }
      }, 500);
      return;
    }
    
    setLoading(false);
  }, [dispatch, navigate, requiredRole]);

  // While checking user data, you can display a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, redirect to login (optionally you can show the error)
  if (errorMessage) {
    console.error(errorMessage);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
