import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()

  async function register() {

    if(password !== confirmPassword){
        toast.error("Password do not match");
        return;
    }

    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/api/users/",
            {
                email: email,
                password: password,
                firstName : firstName,
                lastName : lastName
            }
        );

        toast.success("Registration successfull please login.")
        
    }catch(e){
        console.error("Login failed:",e);
        toast.error("Login failed. Please check your credentials.");
    }
    

  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex">
      {/* Right side (register form) */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center">
        <div className="w-[90%] max-w-[450px] bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-10 flex flex-col gap-6">

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-secondary placeholder-gray-500"
          />

          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="Enter your first name"
            autoComplete="given_name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-secondary placeholder-gray-500"
          />

          <input
            onChange={(e) => setLastName(e.target.value)}
            type="email"
            placeholder="Enter your last name"
            autoComplete="family_name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-secondary placeholder-gray-500"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-secondary placeholder-gray-500"
          />

          
        <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Re-enter your password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-secondary placeholder-gray-500"
        />
            
          

          <button
            onClick={register}
            className="w-full py-3 rounded-xl bg-accent text-white font-semibold shadow-md hover:bg-orange-500 transition-all duration-300"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-secondary/70">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      
      
      {/* Left side (branding) */}
      <div className="hidden md:flex w-1/2 h-full bg-secondary/40 backdrop-blur-sm flex-col justify-center items-center text-white p-10">
        <img src="/logo.png" alt="CBC Logo" className="w-40 mb-6 drop-shadow-lg" />
        <h1 className="text-4xl font-bold mb-3 tracking-wide">
          Crystal Beauty Clear
        </h1>
        <p className="text-lg text-center max-w-md opacity-80">
          Discover your beauty with CBC. Sign in to explore our exclusive range
          of cosmetic products.
        </p>
      </div>

      
    </div>
  );
}
