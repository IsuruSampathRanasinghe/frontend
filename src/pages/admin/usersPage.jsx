import axios from "axios"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../compnents/loader";
import { MdVerified } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

function UserBlockConfirm(props){
    
    const email = props.user.email;
    const close = props.close;
    const refresh = props.refresh

    function blockUser(){
        const token = localStorage.getItem("token");
        
        axios
            .put(import.meta.env.VITE_API_URL + "/api/users/block/" + email,{
                isBlock: !props.user.isBlock
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                close();
                toast.success("User block status changed successfully");
                refresh();
            }).catch(()=>{
                toast.error("Failed to change user block status");
            })
        
    }

    return (<div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
        <div className="w-[500px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[40px]">
            <button onClick={close} className="absolute right-[-20px] top-[-20px] w-[40px] h-[40px] bg-red-600 rounded-full text-white flex justify-center items-center font-bold border border-red-600 hover:bg-white hover:text-red-600">
                X
            </button>
            <p className="text-xl font-semibold text-center">Are you sure you want to {props.user.isBlock ? "unblock" : "block"} the user with email: {email} ?</p>
            <div className="flex gap-[40px]">
                <button onClick={close} className="w-[100px] bg-blue-600 p-[5px] text-white hover:bg-accent">
                    Cancel
                </button>
                <button onClick={blockUser} className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-accent">
                    Yes
                </button>
            </div>
        </div>
    </div>);
}

export default function AdminUsersPage(){
    
    const [users, setUsers] = useState([]);
    const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
    const [userToBlock, setUserToBlock] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(()=>{
        
        if(isLoading){
            const token = localStorage.getItem("token");
            if(token == null){
                toast.error("Please login to access admin panel");
                navigate("/login");
                return;
            }
            axios
            .get(import.meta.env.VITE_API_URL + "/api/users/all-users",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response)=>{
                console.log(response.data);
                setUsers(response.data);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    return(
        <div className="w-full h-full p-6 bg-primary min-h-screen">
            {
                isBlockConfirmVisible && <UserBlockConfirm refresh={()=>{setIsLoading(true)}} user={userToBlock} close={()=>{setIsBlockConfirmVisible(false)}}/>
            }
            
    

            <h1 className="text-2xl font-bold text-secondary mb-6">
                User Management
            </h1>

            <div className="overflow-x-auto shadow-md rounded-2xl bg-white">
                {isLoading?<Loader/> : 
                    <table className="w-full text-center border-collapse">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="py-3 px-4">Image</th>
                            <th className="py-3 px-4 flex items-center">Email</th>
                            <th className="py-3 px-4">First Name</th>
                            <th className="py-3 px-4">Last Name</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr 
                                key={user.email} 
                                className={`border-b hover:bg-primary transition-colors ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                            >
                                <td className="py-3 px-4">
                                    <img 
                                        src={user.image} 
                                        referrerPolicy="no-referrer"
                                        alt={user.firstName}
                                        className={"w-10 h-10 object-cover rounded-full ring-1 ring-secondary/15 border-4 p-1 " + (user.isBlock?"border-red-600" : "border-b-green-600") }
                                    />
                                </td>
                                <td className="py-3 px-4 font-medium text-secondary flex items-center gap-2">
                                    {user.email}{user.isEmailVerified&&<MdVerified color="blue" />}
                                </td>
                                <td className="py-3 px-4 ">
                                    {user.firstName}
                                </td>
                                <td className="py-3 px-4">
                                    {user.lastName}
                                </td>
                                <td className="py-3 px-4 flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                    {user.role}
                                    <p>{
                                        user.role == "admin"&&<MdOutlineAdminPanelSettings /> 
                                    }</p>
                                    </div>
                                </td>
                                
                            
                                <td className="py-3 px-4">
                                    <div className="flex flex-row gap-4 justify-center items-center">
                                        {
                                            <button 
                                            onClick={()=>{
                                                setUserToBlock(user)
                                                setIsBlockConfirmVisible(true)
                                            }}
                                            className="w-[100px] h-[30px] rounded-full cursor-pointer bg-accent hover:bg-accent/40">
                                                {user.isBlock?"Unblock":"Block"}
                                            </button>
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
            </div>
        </div>
    )
}

