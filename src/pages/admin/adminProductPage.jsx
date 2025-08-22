import axios from "axios"
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductPage(){
    
    const [products, setProducts] = useState([])

    useEffect(()=>{
        axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response)=>{
            console.log(response.data);
            setProducts(response.data);
        });
    }, []);

    return(
        <div className="w-full h-full p-6 bg-primary min-h-screen">
            
            <Link to="/admin/add-product" className="fixed right-[50px] bottom-[50px] text-5xl hover:text-accent">
                <CiCirclePlus />
            </Link>
            
            

            <h1 className="text-2xl font-bold text-secondary mb-6">
                Product Management
            </h1>

            <div className="overflow-x-auto shadow-md rounded-2xl bg-white">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="py-3 px-4">Image</th>
                            <th className="py-3 px-4">Product ID</th>
                            <th className="py-3 px-4">Product Name</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Labelled Price</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr 
                                key={item.productID} 
                                className={`border-b hover:bg-primary transition-colors ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                            >
                                <td className="py-3 px-4">
                                    <img 
                                        src={item.images[0]} 
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                    />
                                </td>
                                <td className="py-3 px-4 font-medium text-secondary">
                                    {item.productID}
                                </td>
                                <td className="py-3 px-4">{item.name}</td>
                                <td className="py-3 px-4 text-green-600 font-semibold">
                                    ${item.price}
                                </td>
                                <td className="py-3 px-4 line-through text-gray-500">
                                    ${item.labelledPrice}
                                </td>
                                <td className="py-3 px-4">{item.category}</td>
                                <td className="py-3 px-4">
                                    <div className="flex flex-row gap-4 justify-center items-center">
                                        <button className="p-2 rounded-full hover:bg-red-100 transition">
                                            <FaRegTrashCan className="text-red-500 hover:text-red-700 text-lg"/>
                                        </button>
                                        <button className="p-2 rounded-full hover:bg-accent/20 transition">
                                            <FaRegEdit className="text-accent hover:text-orange-700 text-lg"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
