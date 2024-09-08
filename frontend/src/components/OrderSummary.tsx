import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { MdOutlineEdit } from 'react-icons/md';
import { isAddressEmpty } from '../helpers';

interface IOrderSummary {
    orderInfo: any;
    currentStep: number;
    handleNext: () => void;
}

export const OrderSummary: React.FC<IOrderSummary> = ({ orderInfo, currentStep, handleNext }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const { cart } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    const handleStepNavigation = () => {
        if (currentStep === 3) {
            //navigate to order details page with orderId;
        } else {
            handleNext();
        }
    }

    useEffect(() => {
        const stepConditions: any = {
            1: !(orderInfo.products.length > 0),
            2: isAddressEmpty(orderInfo.deliveryAddress),
            3: !Boolean(orderInfo.paymentMode),
        };
        setDisabled(stepConditions[currentStep]);
    }, [currentStep, orderInfo.products.length, orderInfo.deliveryAddress, orderInfo.paymentMode]);

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + (item.quantity * item.productDetails.price), 0);
        setTotalPrice(total);
    }, [cart]);

    return (
        <div className='w-5/12 space-y-4 py-10'>
            <h6 className="text-md font-semibold">Order Summary</h6>
            <div className="flex flex-col border border-gray-30 rounded-md space-y-4 p-4">
                {!isAddressEmpty(orderInfo.deliveryAddress) &&
                    <>
                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <h6 className="pb-2 text-sm font-semibold">Deliver to</h6>
                                <button>
                                    <MdOutlineEdit size={15} className="mb-1" />
                                </button>
                            </div>
                            <p className='text-xs'>{orderInfo.deliveryAddress?.name}</p>
                            <p className='text-xs'>{orderInfo.deliveryAddress?.building}</p>
                            <p className='text-xs'>{orderInfo.deliveryAddress?.street}</p>
                            <p className='text-xs'>{orderInfo.deliveryAddress?.city}, {orderInfo.deliveryAddress?.state}, {orderInfo.deliveryAddress?.country}</p>
                            <p className='text-xs'>{orderInfo.deliveryAddress?.pincode}</p>
                            <p className='text-xs'>{orderInfo.deliveryAddress?.phone}</p>
                        </div>
                        <hr />
                    </>}
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
                {orderInfo.paymentMode &&
                    <div>
                        <hr />
                        <div className="flex justify-between pt-4">
                            <h6 className='text-sm font-semibold'>Payment Mode</h6>
                            <p className='text-sm font-semibold'>{orderInfo.paymentMode}</p>
                        </div>
                    </div>}
            </div>
            <button disabled={disabled} onClick={handleStepNavigation} className='w-full border border-primary bg-primary text-white rounded-md py-2 font-semibold hover:text-primary hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed'>{currentStep === 3 ? 'Order Now' : 'Proceed'}</button>
        </div>
    )
}