import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { IProductDetails } from "../constants";
import { AppDispatch, RootState } from "../store";
import { addToCart } from "../thunks";
import { Rating } from "./Rating";
import { Breadcrumb } from "./Breadcrumb";
import { CartDrawer } from "./CartDrawer";


interface ProductDescriptionProps {
    product: IProductDetails
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { cart } = useSelector((state: RootState) => state.cart);
    const cartItem = cart.find((item) => item.productDetails._id === product._id);

    const handleAddToCart = async () => {
        await dispatch(addToCart({ productId: product._id, quantity: 1 }));
        setIsOpen(true);
    }

    return (
        <Fragment>
            <div className='w-1/2 px-20 space-y-2 flex flex-col justify-between'>
                <div className="py-10 space-y-2">
                    <Breadcrumb title={product.name} />
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
                        <button
                            className='flex justify-center items-center w-full bg-primary text-white font-semibold py-2 px-14 rounded border border-primary hover:bg-white hover:text-primary'
                            onClick={() => setIsOpen(true)}
                        >
                            Go to Cart
                            <IoIosArrowForward size={18} className="ms-2 mt-1 font-bold" />
                        </button>
                    ) : (<button
                        className={`w-full font-semibold py-2 px-14 rounded border ${product.stock > 0 ? 'bg-primary text-white border-primary hover:bg-white hover:text-primary' : 'bg-white border-red-500 text-red-500 cursor-not-allowed'}`}
                        onClick={handleAddToCart}
                    >
                        {product.stock > 0 ? 'Add' : 'Out of Stock'}
                    </button>)}
                </div>
            </div>
            {isOpen && <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />}
        </Fragment>
    )
}