import { useLogoutMutation } from "../redux/apiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const LogoutButton = ({color, size}) => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutApiCall().unwrap();
    dispatch(logout());
    navigate("/login");
  };

  return <button onClick={handleLogout} className="cursor-pointer flex justify-center items-center">
    <LogOut color={color} size={size} />
    Logout
  </button>;
};

export default LogoutButton;
