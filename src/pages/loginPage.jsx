import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function login() {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/api/users/login",
            {
                email: email,
                password: password
            }
        );

        localStorage.setItem("token",response.data.token)
        toast.success("Login successfull!");
        const token = localStorage.getItem("token");

        const user = response.data.user; 
        if (user.role == "admin") {  
            navigate("/admin");
        } else {
            navigate("/");
        }
    }catch(e){
        console.error("Login failed:",e);
        toast.error("Login failed. Please check your credentials.");
    }
    

  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex">
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

      {/* Right side (login form) */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center">
        <div className="w-[90%] max-w-[450px] bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-10 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-secondary text-center mb-2">
            Welcome Back ✨
          </h2>

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-secondary placeholder-gray-500"
          />

          <div className="flex flex-col gap-2">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-secondary placeholder-gray-500"
            />
            <a
              href="/forgot-password"
              className="text-sm text-accent hover:underline self-end"
            >
              Forgot Password?
            </a>
          </div>

          <button
            onClick={login}
            className="w-full py-3 rounded-xl bg-accent text-white font-semibold shadow-md hover:bg-orange-500 transition-all duration-300"
          >
            Login
          </button>

          <p className="text-center text-sm text-secondary/70">
            Don’t have an account?{" "}
            <a href="/register" className="text-accent hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
