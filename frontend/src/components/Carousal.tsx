import { Link } from 'react-router-dom';
import { IProductCategory, productsCategories } from '../constants';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from 'react';

export const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsToShow = 5;
    const totalCards = productsCategories.length;

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => Math.max(prevIndex - cardsToShow, 0));
        }
    };

    const nextSlide = () => {
        if (currentIndex < totalCards - cardsToShow) {
            setCurrentIndex(prevIndex => Math.min(prevIndex + cardsToShow, totalCards - cardsToShow));
        }
    };
    
    return (
        <div className="relative px-16">
            <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${-(currentIndex * (100 / cardsToShow))}%)` }}>
                    {productsCategories.map((category: IProductCategory) => (
                        <Link key={category.key} to={`/products/categories/${category.title}`} className="flex-shrink-0 w-1/5 p-6">
                            <div className="bg-white border rounded-md shadow-md overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-22 object-cover"
                                />
                                <div className="p-2 text-center">
                                    <h3 className="text-sm font-semibold text-gray-500">{category.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={() => prevSlide()}>
            <IoIosArrowBack />
            </button>
            <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={() => nextSlide()}>
                <IoIosArrowForward />
            </button>
        </div>
    );
};
