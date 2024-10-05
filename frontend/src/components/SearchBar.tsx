import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { RouteConstants } from '../constants';
import { fetchProducts } from '../thunks';
import { IProductDetails } from '../slices';
import { IoIosClose, IoIosSearch } from 'react-icons/io';

let debounceTimeout: NodeJS.Timeout;

export const SearchBar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.product);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);    
    const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('search') || '';
    const [input, setInput] = useState(searchQuery);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim()) {
            setShowSuggestions(false);
            navigate(`${RouteConstants.products}?search=${input.trim()}`);
        }
    };

    const handleSuggestionClick = (product: IProductDetails) => {
        setInput('');
        setShowSuggestions(false);
        navigate(`${RouteConstants.products}/${product._id}`);
    };

    const handleDebouncedSearch = (value: string) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const filtered = filterProducts(value);
            setFilteredProducts(filtered);
            setShowSuggestions(true);
        }, 500);
    };

    const filterProducts = (searchTerm: string) => {
        return [...products].filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    useEffect(() => {
        if (input.trim()) {
            handleDebouncedSearch(input);
        } else {
            setFilteredProducts([]);
            setShowSuggestions(false);
        }
    }, [input]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="relative w-full max-w-md mx-auto">
            <IoIosSearch size={18} className='absolute left-3 top-2' />
            <input
                type="text"
                value={input}
                placeholder="Search products"
                className="w-full py-2 px-10 text-sm text-gray-700 bg-gray-100 focus:ring-0"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            {input.trim() && <IoIosClose size={20} className='absolute right-2 top-2 cursor-pointer' onClick={() => setInput('')} />}
            {showSuggestions && filteredProducts.length > 0 && (
                <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSuggestionClick(product)}
                        >
                            {product.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
