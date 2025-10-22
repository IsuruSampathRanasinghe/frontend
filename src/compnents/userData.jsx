import axios from "axios";
import { useEffect, useState } from "react";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-full p-2">
      {
        isLogoutConfirmOpen&&(
            <div className="fixed z-[120] w-full h-screen top-0 left-0 bg-black/30">
                <div className="w-[300px] h-[150px] bg-primary rounded-lg p-4 flex flex-col justify-between items-center absolute">
                    <span className="text-lg">Are you sure you want to logout?</span>
                    <div className="w-full flex justify-around">
                        <button className="bg-accent text-white px-4 py-2 rounded hover:bg-secondary transition" onClick={()=>{
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}>
                            Yes
                        </button>
                        <button className="bg-accent text-white px-4 py-2 rounded hover:bg-secondary transition" onClick={()=>{
                            setIsLogoutConfirmOpen(false);
                        }}>
                            No 
                        </button>
                        <button className="bg-accent text-white px-4 py-2 rounded hover:bg-secondary transition" onClick={()=>{
                            setIsLogoutConfirmOpen(false);
                        }}>
                            Cancel  
                        </button>
                    </div>
                </div>
            </div>
        )
      }
      {/* Loading Spinner */}
      {loading && (
        <div className="w-[32px] h-[32px] border-[3px] border-accent border-b-transparent rounded-full animate-spin"></div>
      )}

      {/* User Logged In */}
      {user && (
        <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 transition-all hover:shadow-lg">
          <img
            src={user.image}
            alt="User Avatar"
            className="w-[42px] h-[42px] rounded-full border-2 border-accent object-cover"
          />
          <div className="ml-3 flex flex-col">
            <span className="text-secondary font-semibold leading-tight">{user.firstName}</span>
            <span className="text-xs text-gray-500">Welcome back 👋</span>
          </div>

          <select
            onChange={
                (e)=>{
                    if(e.target.value == "logout"){
                        setIsLogoutConfirmOpen(true);
                    }
                }
            }
            className="ml-4 bg-accent text-white text-sm px-3 py-1 rounded-full focus:outline-none hover:bg-[#e8741f] transition-all cursor-pointer"
          >
            <option hidden>⋯</option>
            <option>Account Setting</option>
            <option>Orders</option>
            <option value={"logout"}>Logout</option>
          </select>
        </div>
      )}

      {/* No User (Show Login Button) */}
      {!loading && user == null && (
        <a
          href="/login"
          className="bg-accent text-white font-medium px-5 py-2 rounded-full hover:bg-[#e8741f] shadow-md hover:shadow-lg transition-all"
        >
          Login
        </a>
      )}
    </div>
  );
}
