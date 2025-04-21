
import { useState } from 'react';
import { useLoginMutation } from '../redux/apiSlice';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { EyeClosedIcon,  LucideEye } from 'lucide-react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
  
    console.log("Submitting login request with:", { email, password });
  
    try {
      const response = await login({ email, password }).unwrap();
    
      const user = response; 
      const token = response.token || "dummy_token"; 
  
      if (!user || !user.role) {
        setErrorMessage("Login failed. User data is missing.");
        return;
      }
  
      dispatch(setUser({ user, token }));
      localStorage.setItem("user", JSON.stringify({ user, token }));
  
      // console.log("User role:", user.role);
  
      setTimeout(() => {
        if (user.role === "admin") {
          console.log("Navigating to /admin");
          navigate("/admin");
        } else {
          console.log("Navigating to /user");
          navigate("/");
        }
      }, 300); // Small delay to allow Redux updates
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage(err.data?.message || "Login failed. Check your credentials.");
    }
  };
  

  
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4">
    {/* <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
      <img
        src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg?semt=ais_hybrid"
        alt="Login Illustration"
        className="max-w-full h-auto"
      />
    </div> */}
      
      <div className="my-12">

      <h1 className="text-4xl text-center font-bold ">LogIn</h1>
      <p className="text-center mt-3">Please login with your Credentials  <br /> if you have an issues contact admin</p>
    <div className="max-w-md">
      <form onSubmit={handleSubmit} className=" flex flex-col gap-3 justify-center items-center mx-auto mt-12">
      <label htmlFor="email" className="sr-only">Email</label>
<input
  id="email"
  type="email"
  autoComplete="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
  required
  className="w-full outline-none border border-gray-400 rounded-xl p-4"
/>

<label htmlFor="password" className="sr-only">Password</label>
<div className="flex border border-gray-400 rounded-xl p-2">

<input
  id="password"
  type={passwordVisible ? "text" : "password"}
  autoComplete="current-password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  required
  className="w-full outline-none"
/>

<button
  type="button"
  onClick={() => setPasswordVisible(!passwordVisible)}
  className="px-4 py-2"
>
  {passwordVisible ? <EyeClosedIcon/> : <LucideEye/>} 
</button>
</div>
        <button type="submit" disabled={isLoading} className="bg-blue-800 hover:bg-blue-700 w-full rounded-xl p-2 text-2xl text-white font-semibold">
        {isLoading ? <Loading/> : 'Login'}</button>
        {errorMessage && (
  <p className="bg-red-600 text-white px-4 py-2 rounded text-center w-full">
    {errorMessage}
  </p>
)}
      </form>
      <p>Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link></p>
    </div>
      </div>

      <p className="text-center mt-12">L300 GROUP 7 ICLASS © {new Date().getFullYear()} - All rights reserved</p>
     
    </div>
  );
};

export default LoginScreen;

//bg-gradient-to-r from-blue-800 to-purple-800 w-full h-20