export const OrderListShimmer: React.FC = () => {
    return (
        <div className="w-3/4 space-y-4 animate-pulse">
            <div className="flex">
                <div className="h-4 w-40 bg-gray-300 rounded"></div> {/* Placeholder for breadcrumb */}
            </div>
            <div className="flex justify-between">
                <div className="space-x-4 flex">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-6 w-24 bg-gray-300 rounded-full"></div>
                    ))}
                </div>
                <div className="h-6 w-24 bg-gray-300 rounded-full"></div> {/* Date filter dropdown */}
            </div>
            <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-lg flex justify-between">
                        <div className="space-y-2 w-3/4">
                            <div className="flex space-x-2 text-sm">
                                <div className="h-5 w-24 bg-gray-300 rounded-full"></div> {/* Order Status */}
                                <div className="h-5 w-1 bg-gray-300 rounded-full"></div> {/* Separator */}
                                <div className="h-5 w-20 bg-gray-300 rounded-full"></div> {/* Date */}
                            </div>
                            <div className="flex space-x-4">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gray-300 rounded-lg"></div> {/* Product image */}
                                </div>
                                <div className="space-y-2 w-full">
                                    <div className="h-4 w-32 bg-gray-300 rounded"></div> {/* Order ID */}
                                    <div className="h-4 w-40 bg-gray-300 rounded"></div> {/* Product description */}
                                    <div className="h-4 w-20 bg-gray-300 rounded"></div> {/* Price */}
                                </div>
                            </div>
                        </div>
                        <div className="h-5 w-5 bg-gray-300 rounded-full"></div> {/* Arrow icon */}
                    </div>
                ))}
            </div>
        </div>
    );
};
