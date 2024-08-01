import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface ProductImageGalleryProps {
    images: string[];
    productName: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
    const [focusedImage, setFocusedImage] = useState<number>(images.length ? 0 : -1);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const cardsToShow = 4;
    const totalCards = images.length;

    const handleImageSelection = (index: number) => {
        setFocusedImage(index);
    }

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
        <div className='w-1/2 flex items-center justify-around space-x-6'>
            <div className='flex flex-col justify-between items-center w-full'>
                <button
                    className='shadow-lg bg-white border border-gray-200 text-black p-2 rounded-full mb-2'
                    onClick={prevSlide}
                >
                    <IoIosArrowUp />
                </button>
                <div className='relative w-full h-64 overflow-hidden'>
                    <div
                        className='flex flex-col items-center transition-transform duration-500 ease-in-out space-y-2'
                        style={{ transform: `translateY(-${currentIndex * (100 / cardsToShow)}%)` }}
                    >
                        {images.map((item: string, index: number) => (
                            <img
                                key={index}
                                src={`data:image/png;base64,${item}`}
                                alt={productName}
                                className='w-full w-20 h-20 object-cover cursor-pointer'
                                onMouseOver={() => handleImageSelection(index)}
                                onClick={() => handleImageSelection(index)}
                            />
                        ))}
                    </div>
                </div>
                <button
                    className='shadow-lg bg-white border border-gray-200 text-black p-2 mt-2 rounded-full'
                    onClick={nextSlide}
                >
                    <IoIosArrowDown />
                </button>
            </div>
            <img src={`data:image/png;base64,${images[focusedImage]}`} alt={productName} className="h-80 object-cover" />
        </div>
    )
}