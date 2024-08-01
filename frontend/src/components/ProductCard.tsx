import React from 'react';
import { Link } from 'react-router-dom';
import { IProductDetails, RouteConstants } from '../constants';

interface ProductCardProps {
    product: IProductDetails
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Link to={`${RouteConstants.products}/${product._id}`} >
            <div key={product._id} className='border p-4 rounded h-66 flex flex-col space-y-0.5 cursor-pointer bg-white'>
                <img src={`data:image/png;base64,${product.images[0]}`} alt={product.name} className='w-full' />
                <div className='flex flex-col items-start w-full'>
                    <h3 className='text-lg font-semibold'>{product.name}</h3>
                    <p className='text-gray-700'>{product.currency} {product.price}</p>
                </div>
            </div>
        </Link >
    )
}