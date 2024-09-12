import React from 'react';

export const ProductCardShimmer= () => {
    return (
        <div className="border p-4 rounded h-66 flex flex-col space-y-1 bg-white shadow-md animate-pulse">
            <div className="w-full h-36 bg-gray-300 rounded-sm"></div>
            <div className="flex flex-col items-start w-full space-y-2 mt-2">
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                <div className="flex items-center justify-between w-full">
                    <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                    <div className="w-8 h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    );
};
