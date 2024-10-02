import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { RouteConstants } from '../constants';
import { fetchProducts } from '../thunks';

let debounceTimeout: NodeJS.Timeout;

export const SearchBar: React.FC = () => {
    const { products } = useSelector((state: RootState) => state.product);
    const [input, setInput] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const filterProducts = (searchTerm: string) => {
        const productList = [...products];
        return productList.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const handleDebouncedSearch = (value: string) => {
        clearTimeout(debounceTimeout);
        console.log(value)
        debounceTimeout = setTimeout(() => {
            const filtered = filterProducts(value);
            setFilteredProducts(filtered);
            setShowSuggestions(true);
        }, 300);
    };


    const handleSuggestionClick = (productName: string) => {
        setInput(productName);
        setShowSuggestions(false);
        navigate(RouteConstants.products);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setShowSuggestions(false);
            navigate(RouteConstants.products);
        }
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
    }, []);

    return (
        <div className="relative w-full max-w-md mx-auto">
            <input
                type="text"
                value={input}
                placeholder="Search products"
                className="w-full py-2 px-10 text-sm text-gray-700 bg-gray-100 focus:ring-0"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            {showSuggestions && filteredProducts.length > 0 && (
                <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSuggestionClick(product.name)}
                        >
                            {product.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
