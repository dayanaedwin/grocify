import { CiTrash } from 'react-icons/ci';
import { fetchCartItems, ICartItem, updateCart } from '../thunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { unwrapResult } from '@reduxjs/toolkit';

interface CartItemsProps {
    item: ICartItem,
}

export const CartItem: React.FC<CartItemsProps> = ({ item }) => {
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

    return (
        <div className='bg-gray-50 space-y-2 cursor-pointer'>
            <div className='flex space-x-2'>
                <img src={item.imageUrls ? item.imageUrls[0] : ''} alt={item.productDetails.name} className='w-1/4' />
                <div className="flex justify-between items-center w-full px-2">
                    <div className='flex-column items-center py-2 text-sm'>
                        <h6 className='font-semibold'>{item.productDetails.name}</h6>
                        <p className='text-gray-400'>1 {item.productDetails.uom}</p>
                        <p className='font-semibold'>₹ {item.productDetails.price}</p>
                    </div>
                    <div className='space-y-2 flex flex-col p-2'>
                        <div className='flex items-center bg-primary text-white rounded space-x-3 px-4 text-center font-semibold'>
                            <button className='text-lg' onClick={() => updateCartQuantity(item.quantity, item._id, '-')} >-</button>
                            <h6 className='text-sm py-1'>{item.quantity}</h6>
                            <button className='text-lg' onClick={() => updateCartQuantity(item.quantity, item._id, '+')} >+</button>
                        </div>
                        {/* <button className='flex justify-center'>
                            <CiTrash size={18} />
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}