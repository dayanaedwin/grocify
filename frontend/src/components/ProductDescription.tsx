import { IProductDetails } from "../constants"


interface ProductDescriptionProps {
    product: IProductDetails
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
    console.log(product)
    return (
        <div className='w-1/2 px-20 space-y-2'>
            <div className="py-10 space-y-2">
                <h2 className='text-2xl font-bold'>{`${product.name} (1 ${product.uom})`}</h2>
                <p className='text-sm text-gray-500'>{product.seller}</p>
                <p>Rating {product.rating}</p>
                <p className='text-2xl font-semibold'>{product.currency} {product.price}</p>
                <p className={`text-md font-semibold ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>{`${product.stock > 0 ? 'In Stock' : 'Out of Stock'}`}</p>
                <p className='text-md text-gray-700'>{product.description}</p>
            </div>
            <button className='bg-primary text-white font-semibold py-2 px-4 rounded border border-primary hover:bg-white hover:text-primary'>Add to Cart</button>
        </div>
    )
}