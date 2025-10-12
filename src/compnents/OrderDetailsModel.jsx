import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function OrderDetailsModel({ isModelOpen, selectedOrder, closeModal, refresh }) {

    const [status, setStatus] = useState(selectedOrder?.status);

    if (!isModelOpen || !selectedOrder) return null;

    return (
        <div className="fixed left-0 top-0 w-full h-screen bg-[#00000080] z-[100] flex justify-center items-center p-4">
            <div className="w-full max-w-[600px] bg-primary rounded-2xl shadow-2xl relative flex flex-col gap-4 p-6 overflow-y-auto max-h-[90vh]">

                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute right-4 top-4 text-secondary hover:text-accent transition"
                >
                    ✕
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold text-secondary mb-2 text-center">
                    Order Details
                </h2>

                {/* Order Information */}
                <div className="border-b border-accent pb-3">
                    <p><span className="font-semibold text-secondary">Order ID:</span> {selectedOrder.orderID}</p>
                    <p><span className="font-semibold text-secondary">Date:</span> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                    <p><span className="font-semibold text-secondary">Status:</span> <span className="text-accent">{selectedOrder.status}</span></p>
                </div>

                {/* Customer Info */}
                <div className="border-b border-accent pb-3">
                    <h3 className="font-semibold text-secondary mb-1">Customer Information</h3>
                    <p><span className="font-semibold text-secondary">Name:</span> {selectedOrder.customerName}</p>
                    <p><span className="font-semibold text-secondary">Email:</span> {selectedOrder.email}</p>
                    <p><span className="font-semibold text-secondary">Phone:</span> {selectedOrder.phone}</p>
                    <p><span className="font-semibold text-secondary">Address:</span> {selectedOrder.address}</p>
                </div>

                {/* Items Table */}
                <div>
                    <h3 className="font-semibold text-secondary mb-2">Ordered Items</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center border-collapse">
                            <thead className="bg-secondary text-white">
                                <tr>
                                    <th className="py-2 px-2">Image</th>
                                    <th className="py-2 px-2">Name</th>
                                    <th className="py-2 px-2">Qty</th>
                                    <th className="py-2 px-2">Price (LKR)</th>
                                    <th className="py-2 px-2">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedOrder.items.map((item, idx) => (
                                    <tr key={idx} className="border-b hover:bg-[#fff8f2] transition">
                                        <td className="py-2 px-2 flex justify-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-10 h-10 object-cover rounded-md"
                                            />
                                        </td>
                                        <td className="py-2 px-2 text-secondary">{item.name}</td>
                                        <td className="py-2 px-2 text-secondary">{item.quantity}</td>
                                        <td className="py-2 px-2 text-secondary">{item.price.toFixed(2)}</td>
                                        <td className="py-2 px-2 text-secondary">
                                            {(item.price * item.quantity).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Total */}
                <div className="mt-4 flex justify-end">
                    <p className="text-xl font-bold text-accent">
                        Total: LKR {selectedOrder.total.toFixed(2)}
                    </p>
                </div>

                {/* Action Buttons (optional) */}
                <div className="flex justify-end gap-3 mt-4">
                    <select 
                        defaultValue={selectedOrder.status}
                        onChange={(e)=>setStatus(e.target.value)}
                        className="w-full 
                            bg-primary
                            border border-secondary/40
                            rounded-lg
                            px-3 py-2 
                            text-secondary
                            focus:outline-none
                            focus:ring-2 focus:ring-accent
                            hover:border-accent
                            transition" name="" id="">
                        <option value="processing">Processing</option>
                        <option value="shiped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                        <option value="pending">Pending</option>
                    </select>
                    <button
                        onClick={refresh}
                        className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                    >
                        Refresh
                    </button>
                    <button
                        onClick={()=>{
                            const token = localStorage.getItem("token");
                            axios.put(
                                `${import.meta.env.VITE_API_URL}/api/orders/status/${selectedOrder.orderID}`,
                                {status : status},
                                {headers: {Authorization: `Bearer ${token}`}}
                            )
                            .then(()=>{
                                toast.success("Order status updated");
                                closeModal();
                                refresh();
                            })
                            .catch((err)=>{
                                console.error(err);
                                toast.error("Failed to update order status")
                            })
                        }}
                        className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-[#2d3239] transition"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
