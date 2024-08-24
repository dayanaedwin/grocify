import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { IProductCategory, productsCategories } from '../constants';
import { useState } from 'react';

interface FilterBarProps {
	handleCategoryChange: (value: string) => void;
	handlePriceChange: (value: number) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ handleCategoryChange, handlePriceChange }) => {
	const [isExpand, setIsExpand] = useState<{ category: boolean, price: boolean }>({ category: false, price: false });

	const handleIconExpand = (fieldName: keyof typeof isExpand) => {
		setIsExpand(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
	}

	return (
		<div className='w-1/5 py-4 space-y-4'>
			<h2 className='text-lg font-semibold mb-4'>Filters</h2>

			{/* Category Filter */}
			<div>
				<div className='flex justify-between items-center pb-2 text-gray-700'>
					<label className='text-sm font-semibold'>Category</label>
					<button
						className={`transition-transform ${isExpand.category ? 'rotate-180' : ''} transition-all duration-500 ease-in-out`}
						onClick={() => handleIconExpand('category')}>
						<MdKeyboardArrowDown size={20} />
					</button>
				</div>
				<select
					className={`w-full mt-1 p-2 border border-gray-300 rounded text-gray-700 text-sm ${isExpand.category ? 'block' : 'hidden'} transition-all duration-500 ease-in-out`}
					onChange={(event) => handleCategoryChange(event.target.value)}
				>
					<option key='all' className='text-gray-700 text-sm' >All</option>
					{productsCategories.map((item: IProductCategory) => (
						<option key={item.key} className='text-gray-700 text-sm' >{item.title}</option>
					))}
				</select>
			</div>

			{/* Price Filter */}
			<div >
				<div className='flex justify-between items-center pb-2  text-gray-700'>
					<label className='text-sm font-semibold'>Price</label>
					<button
						className={`transition-transform transform ${isExpand.price ? 'rotate-180' : ''} transition-all duration-500 ease-in-out`}
						onClick={() => handleIconExpand('price')}>
						<MdKeyboardArrowDown size={20} />
					</button>
				</div>
				<input 
				type='range' 
				className={`w-full mt-1 ${isExpand.price ? 'block' : 'hidden'}`} 
				min={10} 
                max={1000}
				onChange={(event) => handlePriceChange(parseFloat(event.target.value))}
				/>
			</div>
		</div>
	)
}