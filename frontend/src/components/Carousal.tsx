import { Link } from 'react-router-dom';
import { IProductCategory, productsCategories } from '../constants';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from 'react';

export const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(1);
    const totalCards = productsCategories.length;

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
        }
    };

    const nextSlide = () => {
        if (currentIndex < totalCards - cardsToShow) {
            setCurrentIndex(prevIndex => Math.min(prevIndex + 1, totalCards - cardsToShow));
        }
    };

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth >= 1024) {
                setCardsToShow(5);
            } else if (window.innerWidth >= 768) {
                setCardsToShow(3);
            } else {
                setCardsToShow(1);
            }
        };

        updateCardsToShow();

        window.addEventListener('resize', updateCardsToShow);

        return () => {
            window.removeEventListener('resize', updateCardsToShow);
        };
    }, []);
    console.log(cardsToShow)
    return (
        <div className="relative px-12 md:px-12 lg:px-16">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(${-(currentIndex * (100 / cardsToShow))}%)` }}
                >
                    {productsCategories.map((category: IProductCategory) => (
                        <Link
                            key={category.key}
                            to={`/products?category=${category.title}`}
                            className={`flex-shrink-0 w-1/${cardsToShow} px-8 md:px-4 lg:px-4`}
                        >
                            <div className="bg-white border rounded-md shadow-md overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-48 md:h-32 object-cover"
                                />
                                <div className="p-2 text-center">
                                    <h3 className="text-sm font-semibold text-gray-500">{category.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {currentIndex > 0 && <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={() => prevSlide()}>
                <IoIosArrowBack />
            </button>}
            {(currentIndex < totalCards - cardsToShow) && <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={() => nextSlide()}>
                <IoIosArrowForward />
            </button>}
        </div>
    );
};
