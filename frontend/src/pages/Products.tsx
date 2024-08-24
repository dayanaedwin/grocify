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
	const [filters, setFilters] = useState<{ category: null | string, price: null | number }>({ category: null, price: null });

	const updateURLParams = (key: string, value: string | null) => {
        const params = new URLSearchParams(location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        navigate({ search: params.toString() });
    };

    const handleCategoryChange = (category: string) => {
        updateURLParams('category', category === 'All' ? null : category);
    };

    const handlePriceChange = (price: number) => {
        updateURLParams('price', price === 0 ? null : price.toString());
    };

	useEffect(() => {
		const fetchAllProducts = async () => {
			dispatch(fetchProducts());
		}

		fetchAllProducts();
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
        const category = params.get('category');
        const price = params.get('price') ? parseFloat(params.get('price')!) : null;
        setFilters({ category, price });
	}, [location.search]);

	useEffect(() => {
        let filtered = products;

        if (filters.category) {
            filtered = filtered.filter(product => product.category === filters.category);
        }

        if (filters.price !== null) {
            filtered = filtered.filter(product => product.price <= filters.price!);
        }

        setFilteredProducts(filtered);
    }, [products, filters.category, filters.price]);

	return (
		<div className='flex flex-grow overflow-y-auto bg-[#FAF9F8] pt-4 pb-6 px-32 justify-between' >
			<FilterBar
				handleCategoryChange={handleCategoryChange}
				handlePriceChange={handlePriceChange}
			/>
			<hr />
			<ProductList products={filteredProducts} />
		</div>
	);
};