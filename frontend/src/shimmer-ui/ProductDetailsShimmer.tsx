
export const ProductDetailsShimmer = () => {
    return (
        <div className="flex flex-grow overflow-y-auto py-12 px-32">
            {/* Image Gallery Shimmer */}
            <div className="w-1/2 flex justify-around space-x-6">
                <div className="flex flex-col space-y-2 justify-around items-center">
                    <div className=" h-8 w-8 p-2 mb-2 rounded-full bg-gray-300 animate-pulse"></div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-20 h-20 bg-gray-300 rounded-md animate-pulse"></div>
                    ))}
                    <div className="h-8 w-8 p-2 mb-2 rounded-full bg-gray-300 animate-pulse"></div>
                </div>
                <div className="w-full h-80 mt-8 bg-gray-300 rounded-md animate-pulse"></div>
            </div>

            {/* Product Description Shimmer */}
            <div className="w-1/2 px-20 space-y-4 flex flex-col justify-between">
                <div className="py-10 space-y-4">
                    <div className="w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="w-1/4 h-5 bg-gray-300 rounded-md animate-pulse"></div>

                    <div className="w-1/3 h-10 bg-gray-300 rounded-md animate-pulse mt-4"></div>

                    <div className="w-1/5 h-5 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="w-full h-16 bg-gray-300 rounded-md animate-pulse"></div>
                </div>

                {/* Add to Cart Button Shimmer */}
                <div className="w-1/2 h-10 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
        </div>
    );
};
