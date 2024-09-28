export const ProfileShimmer = () => {
    return (
        <div className="flex flex-col w-3/4 space-y-4">
            {/* Profile Header */}
            <div className="flex justify-between">
                <div className="w-1/4 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Contact Information */}
            <div className="flex justify-between items-center">
                <div className="w-1/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Name */}
            <div className="flex w-full space-x-4">
                <div className="w-1/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Email and Phone */}
            <div className="flex space-x-4">
                <div className="w-1/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-1/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Address Section */}
            <div className="flex justify-between items-center">
                <div className="w-1/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Address List */}
            <div className="grid grid-cols-3 gap-3">
                {Array(3).fill(0).map((_, index) => (
                    <div key={index} className="p-5 border rounded-md space-y-2">
                        <div className="w-full h-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
