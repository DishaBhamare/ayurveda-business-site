import { useState,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try{
     
    const response =await api.post("/users/login",
       {
        email, 
        password
       });

    login(response.data);

    alert(response.data.message);

    navigate("/");

    }catch(error){
      alert(error.response?.data?.message || "Login failed");
    }
  }
  

  return (
    < >
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">

    {/* White Card */}
    <div className="bg-white shadow-xl rounded-3xl w-full max-w-lg p-10">

      <h2 className="text-4xl font-bold text-slate-800 text-center">
        Welcome Back
      </h2>

      <h2 className="text-4xl font-bold text-green-700 text-center mt-2">
        Login to Ojasvi 🌿
      </h2>

      <p className="text-gray-500 text-center mt-4">
        Sign in to continue your wellness journey.
      </p>

      
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">

    <input  type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"/>
    <input  type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"/>
   

    <div className="pt-2">
  <button
    type="submit"
    className="w-full bg-green-700 hover:bg-green-800 hover:scale-[1.02] text-white font-semibold py-3 rounded-xl transition duration-300"
  >
  Login
  </button>
  </div>

   <p className="text-center text-gray-600 mt-5">
   Don't have an account?{" "}
   <Link
    to="/register"
    className="text-green-700 font-semibold hover:underline"
>
    Register
</Link>
  </p>

      </form>

    </div>

  </div>
    </>
  )
}

export default Login

