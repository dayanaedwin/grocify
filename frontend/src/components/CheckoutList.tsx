import { MdDelete } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { updateCart, fetchCartItems } from "../thunks";
import { useEffect } from "react";

interface ICheckoutList {
    handleNext: () => void;
}

export const CheckoutList: React.FC<ICheckoutList> = ({ handleNext }) => {
    const { cart } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    const updateCartQuantity = async (quantity: number, id: string, operation: string) => {
        const updatedQuantity = operation === '-' ? quantity - 1 : quantity + 1;
        try {
            await dispatch(updateCart({ id, quantity: updatedQuantity })).unwrap();
            await dispatch(fetchCartItems());
        } catch (error) {
            console.error('Failed to update cart item:', error);
        }
    }

    useEffect(() => {
        dispatch(fetchCartItems());
    }, []);

    return (
        <div className="space-y-4">
            <h6 className="text-lg font-semibold">Review</h6>
            {cart.map((product: any) => (
                <div className="flex justify-between space-x-4 border border-gray-30 rounded-md p-4">
                    <div className="flex space-x-4">
                        <img
                            src={product.imageUrls ? product.imageUrls[0] : ''}
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
                            <button className="hover:text-primary" onClick={() => updateCartQuantity(product.quantity, product._id, '-')}><FiMinus /></button>
                            <p className="self-center text-black font-semibold">{product.quantity}</p>
                            <button className="hover:text-primary" onClick={() => updateCartQuantity(product.quantity, product._id, '+')}><FiPlus /></button>
                        </div>
                        <button className="self-center text-red-700"><MdDelete /></button>

                    </div>
                </div>
            ))}
        </div>
    )
}