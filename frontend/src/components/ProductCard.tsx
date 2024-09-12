import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { RouteConstants } from '../constants';
import { IProductDetails } from '../slices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addToCart } from '../thunks';

interface ProductCardProps {
    product: IProductDetails
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { cart } = useSelector((state: RootState) => state.cart);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleAddToCart = (productId: string) => {
        dispatch(addToCart({ productId, quantity: 1 }));
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
                <div className="flex items-center justify-between w-full">
                    <p className='text-gray-700 text-sm font-semibold'>₹ {product.price}</p>
                    <button
                        className='text-primary text-sm font-semibold py-1 px-4 rounded border border-primary hover:bg-white hover:text-primary'
                        onClick={() => handleAddToCart(product._id)}
                    >
                        <HiOutlineShoppingCart />
                    </button>
                </div>
            </div>
        </div>

    )
}