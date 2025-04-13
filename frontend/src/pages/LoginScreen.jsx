
import { useState } from 'react';
import { useLoginMutation } from '../redux/apiSlice';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      }, 500); // Small delay to allow Redux updates
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage(err.data?.message || "Login failed. Check your credentials.");
    }
  };
  
  
  
  
  return (
    <div className="relative  min-h-screen overflow-hidden flex flex-wrap items-center justify-center mt-20 ">
      <div className="">
        <img src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg?semt=ais_hybrid" alt="" className="h-100" />
      </div>
      
      <div className="my-12">

      <h1 className="text-4xl text-center font-bold ">LogIn</h1>
      <p className="text-center mt-3">Please login with your Credentials  <br /> if you have an issues contact admin</p>
    <div className="max-w-md">
      <form onSubmit={handleSubmit} className=" flex flex-col gap-3 justify-center items-center mx-auto mt-12">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Please enter your email" required  className="w-full outline-none border-1 border-gray-400 rounded-xl p-2"/>

        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required  className="w-full outline-none border-1 border-gray-400 rounded-xl p-2"/>

        <button type="submit" disabled={isLoading} className="bg-blue-800 hover:bg-blue-700 w-full rounded-xl p-2 text-2xl text-white font-semibold">
        {isLoading ? 'Logging in...' : 'Login'}</button>
        {/* {error && <p className="bg-red-700 text-white w-md p-2 text-center">{error.data?.message || "Error logging in"}</p>} */}
      </form>
    </div>
      </div>
     
    </div>
  );
};

export default LoginScreen;

//bg-gradient-to-r from-blue-800 to-purple-800 w-full h-20