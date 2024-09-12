import { IProductDetails, sortOptions } from '../constants';
import { ProductCard } from './ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ProductCardShimmer } from '../shimmer-ui';

interface ProductListProps {
    products: IProductDetails[];
    sort: string;
    onChange: (value: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, sort, onChange }) => {

    const { status } = useSelector((state: RootState) => state.product);

    return (
        <div className='w-3/4 py-4'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>Products</h2>
                <select
                    value={sort}
                    onChange={(event) => onChange(event.target.value)}
                    className='p-2 border border-gray-300 rounded text-gray-700 text-sm'>
                    <option key='default' value='default' className='text-gray-700 text-sm' >Sort By</option>
                    {sortOptions.map((option: { key: string, value: string }) => (
                        <option key={option.key} value={option.key} className='text-gray-700 text-sm' >{option.value}</option>
                    ))}
                </select>
            </div>
            <div className='grid grid-cols-4 gap-4'>
                {status === 'loading' ?
                    [...Array(8)].map((_, index) => (
                        <ProductCardShimmer key={index} />
                    )) :
                    products.map((product: IProductDetails) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            </div>
        </div>
    );
}