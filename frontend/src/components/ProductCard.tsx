import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteConstants } from '../constants';
import { IProductDetails } from '../slices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addToCart, fetchCartItems, updateCart } from '../thunks';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface ProductCardProps {
    product: IProductDetails
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { cart } = useSelector((state: RootState) => state.cart);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const isInCart = cart.find(item => item.productDetails._id === product._id)

    const handleAddToCart = (productId: string) => {
        dispatch(addToCart({ productId, quantity: 1 }));
    }

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
        <div key={product._id} className='border p-4 rounded h-66 flex flex-col space-y-0.5 bg-white shadow-md'>
            <Link to={`${RouteConstants.products}/${product._id}`} >
                {product.imageUrls &&
                    <img
                        src={product.imageUrls[0]}
                        alt={product.name}
                        className='w-full cursor-pointer'
                        onLoad={() => setIsImageLoaded(true)}
                    />}
                {!isImageLoaded && <div className="w-full h-36 bg-gray-300 rounded-sm animate-pulse"></div>}
            </Link >
            <div className='flex flex-col items-start w-full'>
                <h3 className='text-md font-normal'>{product.name}</h3>
                <div className="flex items-center justify-between w-full pt-1 space-x-2">
                    <p className='text-gray-700 text-sm font-semibold w-full'>₹ {product.price}</p>
                    {isInCart ?
                        <div className="flex justify-around items-center w-full text-xs font-semibold text-white bg-primary py-1 rounded border border-primary">
                            <button className="text-md font-bold" onClick={() => updateCartQuantity(isInCart.quantity, isInCart._id, '-')} >
                                <FiMinus />
                            </button>
                            <span className=''>{isInCart.quantity}</span>
                            <button className="text-md font-bold" onClick={() => updateCartQuantity(isInCart.quantity, isInCart._id, '+')} >
                                <FiPlus />
                            </button>
                        </div> :
                        <button
                            className={`flex justify-around items-center w-full text-xs font-semibold py-1 rounded border hover:text-white ${product.stock > 0 ? 'text-primary border-primary hover:bg-primary' : ' text-red-500 border-red-500 hover:bg-red-500 disabled:cursor-not-allowed'} `}
                            onClick={() => handleAddToCart(product._id)}
                        >
                            {product.stock > 0 ? 'Add' : 'Out of Stock'}
                        </button>
                    }
                </div>
            </div>
        </div>

    )
}