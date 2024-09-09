

interface DeliveryItemCardProps {
    product: any
}

export const DeliveryItemCard: React.FC<DeliveryItemCardProps> = ({ product }) => {
    return (
        <div className="border border-gray-300 rounded-md">
            <div className="flex justify-between items-center p-4">
                <div className="flex space-x-2 text-sm text-gray-700">
                    <img
                        src={product.imageUrls[0] ? product.imageUrls[0] : ''}
                        alt={product.productDetails.name}
                        className="w-16 object-cover rounded-md"
                    />
                    <div className="">
                        <p className="text-black font-semibold">{product.productDetails.name}</p>
                        <p className="text-xs">{product.productDetails.seller}</p>
                        <div className="flex space-x-4">
                            <p className="">Qty: <span className="font-semibold text-black">{product.quantity}</span></p>
                            <p>|</p>
                            <p className="">Price: <span className="font-semibold text-black">₹ {product.productDetails.price}</span></p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h2 className="text-md text-red-700 font-bold">₹ {product.productDetails.price * product.quantity}</h2>
                </div>
            </div>
            <div className="border-t py-2">
                <button className="text-red-700 text-sm font-semibold w-full">Cancel</button>
            </div>
        </div>
    )
}