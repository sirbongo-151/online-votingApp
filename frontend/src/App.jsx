import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyOTP from "./components/VerifyOTP";
import Users from "./pages/Users";
import VotingPage from "./pages/VotingPage";

import AdminLayout from "./components/AdminLayout"; // Adjust the import path as needed
import ViewVotes from "./pages/ViewVotes";
import Candidates from "./pages/Candidates";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
     
     <Navbar/>   
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUp />} />
       

        {/* Protected Routes for Authenticated Users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/voting" element={<VotingPage />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/view-votes" element={<ViewVotes />} />
            <Route path="/candidates" element={<Candidates />} />
          </Route>
        </Route>

        {/* Catch-all Route */}
        <Route
          path="*"
          element={
            <h2 className="text-2xl font-semibold text-center mt-20">
              Page Not Found
            </h2>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
