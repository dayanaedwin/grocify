

interface PaymentDetailsProps {
    products: any
    totalPrice: number
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({products, totalPrice}) => {
    return(
        <div className="bg-red-100 border border-red-100 rounded-md p-4 text-xs space-y-2">
            {products.map((product: any) => (
                <div key={product.id} className="flex justify-between items-center">
                    <p className="text-xs font-normal">{product.productDetails.name}</p>
                    <p className="text-xs">₹ {product.price}</p>
                </div>
            ))}
            <hr className="border-white border"/>
            <div className="flex justify-between items-center">
                    <p className="text-sm">Total</p>
                    <p>₹ {totalPrice}</p>
                </div>
        </div>
    )
}