import axios from "axios";
import { useEffect, useState } from "react";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
        window.location.href = "/login";
        return;
    }
    axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: {Authorization: `Bearer ${token}`},
    }).then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUser(res.data);
    }).catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    });

  }, []);

  // Empty functions for now
  async function updateUserData() {
    const data = {
        firstName: firstName,
        lastName: lastName,
        image: user.image
    }
    if(image != null){
        const link = await mediaUpload(image);
        image.profilePicture = link;
    }

    await axios.put(import.meta.env.VITE_API_URL + "/api/users/me", data,{
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    }).then(()=>{
        alert("Profile Updated Successfully");
    }).catch((err)=>{
        console.error("Error updating profile: ",err);
        alert("Failed to update profile");
    })
    navigate("/");
  };

  async function updatePassword() {
    if(password !== confirmPassword){
        toast.error("Password do not match");
        return;
    }
    await axios.put(import.meta.env.VITE_API_URL + "/api/users/me/password", {
        password: password,
    },{
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    }).then(()=>{
        toast.success("password updated successfully");
        setPassword("");
        setConfirmPassword("");
    }).catch((err)=>{
        console.error("Error updating password:", err);
        toast.error("Failed to update password");
    })
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center lg:flex-row">
      
      {/* Left Panel - User Info */}
      <div className="w-[90%] lg:w-[40%] backdrop-blur-2xl rounded-2xl m-6 p-8 flex flex-col shadow-lg border border-[--color-primary]/40">
        <h1 className="text-2xl font-bold mb-6 text-center text-[--color-secondary]">
          User Information
        </h1>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[--color-accent] mb-4">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[--color-primary] flex items-center justify-center text-[--color-secondary] text-sm">
                No Image
              </div>
            )}
          </div>
          <label className="cursor-pointer bg-[--color-accent] text-white px-3 py-1 rounded-full hover:bg-[#e8741f] transition-all">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        {/* User Info Inputs */}
        <label className="block mb-1 text-[--color-secondary] font-semibold">
            First Name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-2 mb-4 rounded-md border border-[--color-primary] focus:ring-2 focus:ring-[--color-accent] outline-none"
        />
        <label className="block mb-1 text-[--color-secondary] font-semibold">
            Last Name
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="p-2 mb-4 rounded-md border border-[--color-primary] focus:ring-2 focus:ring-[--color-accent] outline-none"
        />
        <button
          onClick={updateUserData}
          className="bg-[--color-accent] text-white font-semibold py-2 rounded-md hover:bg-[#e8741f] transition-all"
        >
          Update Info
        </button>
      </div>

      {/* Right Panel - Password Change */}
      <div className="w-[90%] lg:w-[40%] backdrop-blur-2xl rounded-2xl m-6 p-8 flex flex-col shadow-lg border border-[--color-primary]/40">
        <h1 className="text-2xl font-bold mb-6 text-center text-[--color-secondary]">
          Change Password
        </h1>

        <label className="block mb-1 text-[--color-secondary] font-semibold">
            New Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 rounded-md border border-[--color-primary] focus:ring-2 focus:ring-[--color-accent] outline-none"
        />
        <label className="block mb-1 text-[--color-secondary] font-semibold">
            Confirm New Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 mb-4 rounded-md border border-[--color-primary] focus:ring-2 focus:ring-[--color-accent] outline-none"
        />
        <button
          onClick={updatePassword}
          className="bg-[--color-accent] text-white font-semibold py-2 rounded-md hover:bg-[#e8741f] transition-all"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
