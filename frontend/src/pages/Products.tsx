import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { FilterBar, ProductList } from "../components";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../thunks";

export const Products = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { products } = useSelector((state: RootState) => state.product);
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [sortOption, setSortOption] = useState<string>('default');
	const [searchParams, setSearchParams] = useSearchParams();

	const searchQuery = searchParams.get('search') || '';
	const categoryQuery = searchParams.get('category') || null;
	const priceQuery = searchParams.get('price') ? parseFloat(searchParams.get('price')!) : null;
	const sortQuery = searchParams.get('sort') || 'default';

	const handleCategoryChange = (category: string) => {
		updateURLParams('category', category === 'All' ? null : category);
	};

	const handlePriceChange = (price: number) => {
		updateURLParams('price', price === 0 ? null : price.toString());
	};

	const updateURLParams = (key: string, value: string | null) => {
		if (value) {
			searchParams.set(key, value);
		} else {
			searchParams.delete(key);
		}
		setSearchParams(searchParams);
	};

	const sortProducts = (products: any[], sortValue: string) => {
		const productsCopy = [...products];
		switch (sortValue) {
			case 'price-asc':
				return productsCopy.sort((a, b) => a.price - b.price);
			case 'price-desc':
				return productsCopy.sort((a, b) => b.price - a.price);
			case 'name-asc':
				return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
			case 'name-desc':
				return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
			default:
				return productsCopy;
		}
	};

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	useEffect(() => {
		let filtered = [...products];

		if (searchQuery) {
			filtered = filtered.filter(product =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.description.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		if (categoryQuery) {
			filtered = filtered.filter(product => product.category === categoryQuery);
		}

		if (priceQuery !== null) {
			filtered = filtered.filter(product => product.price <= priceQuery);
		}

		const sortedProducts = sortProducts(filtered, sortQuery);
		setFilteredProducts(sortedProducts);
	}, [products, searchQuery, categoryQuery, priceQuery, sortQuery]);

	return (
		<div className='flex flex-grow overflow-y-auto bg-[#FAF9F8] pt-4 pb-6 px-32 justify-between' >
			<FilterBar
				handleCategoryChange={handleCategoryChange}
				handlePriceChange={handlePriceChange}
				category={categoryQuery}
				price={priceQuery}
			/>
			<hr />
			<ProductList
				products={filteredProducts}
				sort={sortOption}
				onChange={(value) => setSortOption(value)}
			/>
		</div>
	);
};