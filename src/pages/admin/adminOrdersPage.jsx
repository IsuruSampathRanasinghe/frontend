import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../compnents/loader";
import OrderDetailsModel from "../../compnents/orderDetailsModel";




export default function AdminOrderPage(){
    
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedOrder, setSeelectedOrder] = useState(null)

    const navigate = useNavigate();

    useEffect(()=>{
        if(isLoading){
            const token = localStorage.getItem("token");
            if(token == null){
                navigate("/login");
                return;
            }
            axios
            .get(import.meta.env.VITE_API_URL + "/api/orders",{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then((response)=>{
                console.log(response.data);
                setOrders(response.data);
                setIsLoading(false);
            })
            .catch((error)=> {
                console.error("Failed to fetch orders: ", error);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    return(
        <div className="w-full h-full p-6 bg-primary min-h-screen">
            
            
            <OrderDetailsModel
                isModelOpen={isModelOpen}
                selectedOrder={selectedOrder}
                closeModal={() => setIsModelOpen(false)}
                refresh={() => setIsLoading(true)}
            />
            
            

            <h1 className="text-2xl font-bold text-secondary mb-6">
                Order Management
            </h1>

            <div className="overflow-x-auto shadow-md rounded-2xl bg-white">
                {isLoading?<Loader/> : 
                    <table className="w-full text-center border-collapse">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Number of Items</th>
                            <th className="py-3 px-4">Customer Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Phone</th>
                            <th className="py-3 px-4">Address</th>
                            <th className="py-3 px-4">Total</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, index) => (
                            <tr 
                                key={item.orderID} 
                                className={`border-b hover:bg-primary transition-colors ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                                onClick={()=>{
                                    setSeelectedOrder(item);
                                    setIsModelOpen(true);
                                }}
                            >
                            
                                <td className="py-3 px-4 font-medium text-secondary">
                                    {item.orderID}
                                </td>
                                <td className="py-3 px-4">
                                    {item.items.length}
                                </td>
                                <td className="py-3 px-4">
                                    {item.customerName}
                                </td>
                                <td className="py-3 px-4 font-medium text-secondary">
                                    {item.email}
                                </td>
                                <td className="py-3 px-4 font-medium text-secondary">
                                    {item.phone}
                                </td>
                                <td className="py-3 px-4 font-medium text-secondary">
                                    {item.address}
                                </td>
                                <td className="py-3 px-4 font-medium text-secondary">
                                    {`LKR ${item.total.toFixed(2)}`}
                                </td>
                                <td className="py-3 px-4 font-medium text-secondary">
                                    {item.status}
                                </td>
                                <td className="py-3 px-4 font-medium text-secondary">
                                    {new Date(item.date).toLocaleDateString()}
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
