import { useEffect } from 'react';
import { sortOptions } from '../constants';
import { ProductCard } from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchProducts } from '../thunks';


export const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>();
	const { products } = useSelector((state: RootState) => state.product);

	useEffect(() => {
		const fetchAllProducts = async () => {
			dispatch(fetchProducts());
		}

		fetchAllProducts();
	}, []);

    console.log(products)

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
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}