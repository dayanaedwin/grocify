export const OrderDetailsShimmer = () => {
    return (
        <div className="flex flex-col overflow-y-auto py-12 px-32 space-y-4">
            <div className="w-full h-4 bg-gray-300 rounded animate-pulse" /> {/* Shimmer for header */}
            <div className="w-full h-20 bg-gray-300 rounded animate-pulse" /> {/* Shimmer for order details */}
            <div className="flex w-full space-x-8">
                <div className="w-2/3 space-y-4">
                    <div className="w-full h-12 bg-gray-300 rounded animate-pulse" /> {/* Shimmer for progress bar */}
                    {/* Shimmer for each product */}
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="w-full h-32 bg-gray-300 rounded animate-pulse" />
                    ))}
                </div>
                <div className="w-1/3 space-y-8">
                    <div className="w-full h-20 bg-gray-300 rounded animate-pulse" /> {/* Shimmer for delivery address */}
                    <div className="w-full h-32 bg-gray-300 rounded animate-pulse" /> {/* Shimmer for payment details */}
                </div>
            </div>
        </div>
    )
}