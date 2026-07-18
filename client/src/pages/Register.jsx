import { useState } from 'react';
import { useNavigate,Link } from "react-router-dom";
import api from "../services/api";


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

      if(password!==confirmPassword){
      alert("Passwords do not match");
      return;
    }
    try{
     
    const response =await api.post("/users/register",
       { name, 
        email, 
        password
       });

     alert(response.data.message);

     navigate("/login");

    }catch(error){
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    < >
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">

    {/* White Card */}
    <div className="bg-white shadow-xl rounded-3xl w-full max-w-lg p-10">

      <h2 className="text-4xl font-bold text-slate-800 text-center">
        Create Your
      </h2>

      <h2 className="text-4xl font-bold text-green-700 text-center mt-2">
        Ojasvi Account 🌿
      </h2>

      <p className="text-gray-500 text-center mt-4">
        Begin your journey towards natural wellness.
      </p>

      
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">

    <input  type="text" placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"/>
    <input  type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"/>
    <input  type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"/>
    <input  type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"/>

    <div className="pt-2">
  <button
    type="submit"
    className="w-full bg-green-700 hover:bg-green-800 hover:scale-[1.02] text-white font-semibold py-3 rounded-xl transition duration-300"
  >
  Create Account
  </button>
  </div>

   <p className="text-center text-gray-600 mt-5">
   Already have an account?{" "}
   <Link
    onClick={() => navigate("/login")}
    className="text-green-700 font-semibold cursor-pointer hover:underline"
   >
    Login
   </Link>
  </p>

      </form>

    </div>

  </div>
  </>

  /* <form onSubmit={handleSubmit} >
    <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
    <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

    <button type="submit">Register</button>

  </form>
    </> */
  
  );
}

export default Register
