import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ userRole, children }) => {
  // Check if userRole is 'admin'
  if (userRole !== 'admin') {
  
    return <Navigate to="/login" />;
  }

  <Outlet/>
  return children;
};

export default AdminRoute;