import React from 'react';
import { IProductDetails, sortOptions } from '../constants';
import { ProductCard } from './ProductCard';

interface ProductListProps {
    products: IProductDetails[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className='w-3/4 py-4'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>Products</h2>
                <select className='p-2 border border-gray-300 rounded text-gray-700 text-sm'>
                    <option key='default' value='default' className='text-gray-700 text-sm' >Sort By</option>
                    {sortOptions.map((option: { key: string, value: string }) => (
                        <option key={option.key} value={option.value} className='text-gray-700 text-sm' >{option.value}</option>
                    ))}
                </select>
            </div>
            <div className='grid grid-cols-4 gap-4'>
                {products.map((product) => (
                    <ProductCard product={product} />
                ))}
            </div>
        </div>
    );
}