import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import { orders } from "../constants";


export const CheckoutList = () => {
    const [checkoutList, setCheckoutList] = useState(orders[0]);

    return (
        <div className="space-y-4">
            <h6 className="text-lg font-semibold">Review</h6>
            {checkoutList.products.map((product: any) => (
                <div className="flex justify-between space-x-4 border border-gray-30 rounded-md p-4">
                    <div className="flex space-x-4">
                        <img
                            src={`data:image/png;base64,${product.productDetails.images[0]}`}
                            alt={product.productDetails.name}
                            className='h-20 rounded-lg object-cover'
                        />
                        <div className="flex flex-col space-y-2 content-center justify-center">
                            <div className="">
                                <p className="font-semibold text-sm">{product.productDetails.name}</p>
                                <p className="text-gray-500 text-xs">{product.productDetails.description}</p>
                            </div>
                            <p className="font-semibold text-xs">1 {product.productDetails.uom}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-4 text-gray-700">
                        <div className="flex space-x-2">
                            <button className="hover:text-primary"><FiMinus /></button>
                            <p className="self-center text-black font-semibold">{product.quantity}</p>
                            <button className="hover:text-primary"><FiPlus /></button>
                        </div>
                        <button className="self-center text-red-700"><MdDelete /></button>

                    </div>
                </div>
            ))}
        </div>
    )
}