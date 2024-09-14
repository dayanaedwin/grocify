export const CartItemsShimmer = () => {
    return (
        <>
            {Array(3).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse space-y-2 p-4 border rounded-lg">
                    <div className="flex space-x-2">
                        <div className="bg-gray-300 w-20 h-20 rounded"></div>
                        <div className="flex flex-col justify-between w-full">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}