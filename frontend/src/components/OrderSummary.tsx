import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { MdOutlineEdit } from 'react-icons/md';
import { GoPlus } from "react-icons/go";
import { isAddressEmpty } from '../helpers';

export const OrderSummary = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const { cart } = useSelector((state: RootState) => state.cart);
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const addAddress = () => {

    }

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + (item.quantity * item.productDetails.price), 0);
        setTotalPrice(total);
    }, [cart]);

    return (
        <div className='w-5/12 space-y-4 py-10'>
            <h6 className="text-md font-semibold">Order Summary</h6>
            <div className="flex flex-col border border-gray-30 rounded-md space-y-4 p-4">
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <h6 className="pb-2 text-sm font-semibold">Deliver to</h6>
                        {!isAddressEmpty(user?.address) && <button>
                            <MdOutlineEdit size={15} className="mb-1" />
                        </button>}
                    </div>
                    <p className='text-xs'>{user?.address?.street}</p>
                    <p className='text-xs'>{user?.address?.city}, {user?.address?.state}, {user?.address?.country}</p>
                    <p className='text-xs'>{user?.address?.pincode}</p>
                </div>
                <hr />
                <div className="">
                    <h6 className="pb-2 text-sm font-semibold">Products</h6>
                    {cart.map((product: any) => (
                        <div key={product._id} className='flex justify-between space-y-2'>
                            <p className="text-xs">{product.productDetails.name} x {product.quantity} </p>
                            <p className='text-xs font-semibold'>₹ {product.productDetails.price}</p>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="flex justify-between">
                    <h6 className='text-sm font-semibold'>Total</h6>
                    <p className='text-sm font-semibold'>₹ {totalPrice}</p>
                </div>
            </div>
            <button className='w-full border border-primary bg-primary text-white rounded-md py-2 font-semibold hover:text-primary hover:bg-white'>Order Now</button>
        </div>
    )
}