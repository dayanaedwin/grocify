import { useDispatch, useSelector } from "react-redux"
import { IProductDetails } from "../constants"
import { Rating } from "./Rating"
import { AppDispatch, RootState } from "../store"
import { addToCart, updateCart } from "../thunks"


interface ProductDescriptionProps {
    product: IProductDetails
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { cart } = useSelector((state: RootState) => state.cart);
    const cartItem = cart.find((item) => item.productDetails._id === product._id);

    const handleAddToCart = () => {
        dispatch(addToCart({ productId: product._id, quantity: 1 }));
    }

    const handleUpdateCartQuantity = (quantity: number, operation: string) => {
        const newQuantity = operation === "+" ? quantity + 1 : quantity - 1;
        if (newQuantity > 0) {
            dispatch(updateCart({ id: product._id, quantity: newQuantity }));
        }
    };

    return (
        <div className='w-1/2 px-20 space-y-2 flex flex-col justify-between'>
            <div className="py-10 space-y-2">
                <h2 className='text-2xl font-bold'>{`${product.name} (1 ${product.uom})`}</h2>
                <p className='text-sm text-gray-500'>{product.seller}</p>
                <Rating rating={product.rating} />
                <div className="">
                    <p className='text-2xl font-semibold'>₹ {product.price}</p>
                    <p className="text-sm text-gray-500">(inclusive of all taxes)</p>
                </div>
                <p className={`text-md font-semibold ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>{`${product.stock > 0 ? 'In Stock' : 'Out of Stock'}`}</p>
                <p className='text-md text-gray-700'>{product.description}</p>
            </div>
            <div className="w-full m-0">
                {cartItem ? (
                    <div className="flex items-center justify-center space-x-4 bg-primary text-white rounded border border-primary hover:bg-white hover:text-primary">
                        <button
                            className='text-lg font-bold py-1 px-4 rounded'
                            onClick={() => handleUpdateCartQuantity(cartItem.quantity, "-")}
                        >
                            -
                        </button>
                        <span className='font-semibold text-lgtext-center'>{cartItem.quantity}</span>
                        <button
                            className='text-lg font-bold py-1 px-4 rounded'
                            onClick={() => handleUpdateCartQuantity(cartItem.quantity, "+")}
                        >
                            +
                        </button>
                    </div>
                ) : (<button
                    className='w-full bg-primary text-white font-semibold py-2 px-14 rounded border border-primary hover:bg-white hover:text-primary'
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>)}
            </div>
        </div>
    )
}