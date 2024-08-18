import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { RouteConstants } from '../constants';
import { IProductDetails } from '../slices';

interface ProductCardProps {
    product: IProductDetails
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Link to={`${RouteConstants.products}/${product._id}`} >
            <div key={product._id} className='border p-4 rounded h-66 flex flex-col space-y-0.5 cursor-pointer bg-white shadow-md'>
                <img src={product.imageUrls ? product.imageUrls[0] : ''} alt={product.name} className='w-full' />
                <div className='flex flex-col items-start w-full'>
                    <h3 className='text-md font-normal'>{product.name}</h3>
                    <div className="flex items-center justify-between w-full">
                        <p className='text-gray-700 text-sm font-semibold'>₹ {product.price}</p>
                        <button className='bg-whiite text-primary text-sm font-semibold py-1 px-4 rounded border border-primary hover:bg-white hover:text-primary'>
                            <HiOutlineShoppingCart />
                        </button>
                    </div>
                </div>
            </div>
        </Link >
    )
}