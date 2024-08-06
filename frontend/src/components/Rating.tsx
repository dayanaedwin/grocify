import { useEffect, useState } from 'react';
import { MdOutlineStar, MdOutlineStarBorder, MdOutlineStarHalf } from "react-icons/md";

export const Rating = ({ rating }: { rating: number }) => {
    const [stars, setStars] = useState(Array(5).fill(0));

    useEffect(() => {
        const filledStars = stars.map((star: number, index: number) => {
            if (index + 1 < rating) {
                return 1;
            } else if ((index + 1 > rating) && (index < rating)) {
                return 0.5;
            } else {
                return 0;
            }
        });

        setStars(filledStars);
    }, []);

    return (
        <div className="flex space-x-1 text-yellow-500">
            {stars.map((item: number) => {
                return item == 0 ? <MdOutlineStarBorder /> : (item === 1 ? <MdOutlineStar /> : <MdOutlineStarHalf />)
            })}
        </div>
    )
}