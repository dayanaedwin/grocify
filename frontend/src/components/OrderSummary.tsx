import { useState } from 'react';
import { orders } from "../constants";

export const OrderSummary = () => {
    const [order, setOrder] = useState(orders[0]);

    return (
        <div className='w-5/12 space-y-4 py-10'>
            <h6 className="text-md font-semibold">Order Summary</h6>
            <div className="flex flex-col border border-gray-30 rounded-md space-y-4 p-4">
                <div className="space-y-1">
                    <h6 className="pb-2 text-sm font-semibold">Deliver to</h6>
                    <p className='text-xs'>{order.deliveryAddress.street}</p>
                    <p className='text-xs'>{order.deliveryAddress.state}, {order.deliveryAddress.state}, {order.deliveryAddress.country}</p>
                    <p className='text-xs'>{order.deliveryAddress.pincode}</p>
                </div>
                <hr />
                <div className="">
                <h6 className="pb-2 text-sm font-semibold">Products</h6>
                {order.products.map((product: any) => (
                        <div key={product.id} className='flex justify-between space-y-2'>
                            <p className="text-xs">{product.productDetails.name} x {product.quantity} </p>
                            <p className='text-xs font-semibold'>₹ {product.productDetails.price}</p>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="flex justify-between">
                    <h6 className='text-sm font-semibold'>Total</h6>
                    <p className='text-sm font-semibold'>₹ {order.totalPrice}</p>
                </div>
            </div>
            <button className='w-full border border-primary bg-primary text-white rounded-md py-2 font-semibold hover:text-primary hover:bg-white'>Order Now</button>
        </div>
    )
}