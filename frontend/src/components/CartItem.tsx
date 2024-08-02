import { CiTrash } from 'react-icons/ci';
import { ICartItem } from '../constants';

interface CartItemsProps {
    item: ICartItem,
}

export const CartItem: React.FC<CartItemsProps> = ({ item: { _id, productDetails, quantity } }) => {
    return (
        <div className='bg-gray-50 space-y-2 cursor-pointer'>
            <div className='flex space-x-2'>
                <img src={`data:image/png;base64,${productDetails.images[0]}`} alt={productDetails.name} className='w-1/4' />
                <div className="flex justify-between items-center w-full px-2">
                    <div className='flex-column items-center py-2 text-sm'>
                        <h6 className='font-semibold'>{productDetails.name}</h6>
                        <p className='text-gray-400'>1 {productDetails.uom}</p>
                        <p className='font-semibold'>₹ {productDetails.price}</p>
                    </div>
                    <div className='space-y-2 flex flex-col p-2'>
                        <div className='flex items-center bg-primary text-white rounded space-x-3 px-4 text-center font-semibold'>
                            <button className='text-lg'>-</button>
                            <h6 className='text-sm py-1'>{quantity}</h6>
                            <button className='text-lg'>+</button>
                        </div>
                        <button className='flex justify-center'>
                            <CiTrash size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}