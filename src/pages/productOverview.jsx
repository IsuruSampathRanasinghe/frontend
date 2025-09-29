import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { Loader } from "../compnents/loader"
import ImageSlider from "../compnents/imageSlider"

export default function ProductOverview(){

    const params = useParams()

    const [status, setStatus] = useState("loading")
    const [product, setProduct] = useState(null)

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_API_URL + "/api/products/"+params.id).then(
                (res)=>{
                    setProduct(res.data)
                    setStatus("success")
                }
            ).catch(
                ()=>{
                    toast.error("Failed to fetch product details")
                    setStatus("error")
                }
            );
        }
    ,[]);

    return(  
        <div className="w-full h-[calc(100vh-100px)] text-secondary">
            {
                status == "loading" && <Loader/>
            }
            {
                status == "success" && (<div className="w-full h-full flex">
                    <div className="w-[50%] h-full flex justify-center items-center">
                        <ImageSlider images={product.images}/>
                    </div>
                    <div className="w-[50%] h-full flex flex-col items-start gap-4 p-10">
                        <span className="">{product.productID}</span>
                        <h1 className="text-2xl font-bold">{product.name}
                            {
                                product.altNames.map(
                                    (name,index)=>{
                                        return(
                                            <span key={index} className="text-sm font-normal text-secondary/70">{" | "+name}</span>
                                        )
                                    }
                                )
                            }
                        </h1>
                        <p className="mt-[30px] text-justify">{product.description}</p>
                        <span className="">Category : {product.category}</span>
                        {
                            product.labelledPrice > product.price ? (
                            <div className="flex gap-3 items-center">
                                <p className="text-lg text-secondary font-semibold line-through">LKR {product.labelledPrice.toFixed(2)}</p>
                                <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
                            </div>
                            ) : (
                                <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
                            )
                        }
                        <div className="w-full h-[40px] flex gap-4 mt-[60px]">
                            <button className="w-[50%] h-full bg-accent/100 text-white font-semibold hover:bg-accent/70">Add to cart</button>
                            <button className="w-[50%] h-full border border-accent text-accent font-semibold hover:bg-accent hover:text-white">Buy now</button>
                        </div>
                    </div>
                </div>)
            }
            {
                status == "error" && <h1 className="text-red-500">Faild to load product details</h1>
            }
        </div>
    )
}