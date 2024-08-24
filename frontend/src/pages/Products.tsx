import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterBar, ProductList } from "../components";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../thunks";
import { useLocation, useNavigate } from "react-router-dom";

export const Products = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { products } = useSelector((state: RootState) => state.product);
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [filters, setFilters] = useState<{ category: null | string, price: null | string }>({ category: null, price: null });

	const handleCategoryChange = (category: string) => {
		const params = new URLSearchParams(location.search);
		if (category === 'All') {
			params.delete('category');
		} else {
			params.set('category', category);
		}
		navigate({ search: params.toString() });
	}

	useEffect(() => {
		const fetchAllProducts = async () => {
			dispatch(fetchProducts());
		}

		fetchAllProducts();
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const category = params.get('category')
		setFilters({ ...filters, category });
	}, [location.search]);

	useEffect(() => {
		if (filters.category) {
			const filtered = products.filter((product) => product.category === filters.category);
			setFilteredProducts(filtered);
		} else {
			setFilteredProducts(products);
		}
	}, [products, filters.category]);

	return (
		<div className='flex flex-grow overflow-y-auto bg-[#FAF9F8] pt-4 pb-6 px-32 justify-between' >
			<FilterBar handleCategoryChange={handleCategoryChange} />
			<hr />
			<ProductList products={filteredProducts} />
		</div>
	);
};