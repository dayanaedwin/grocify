import { useEffect, useState } from 'react';
import { RouteConstants } from '../constants';
import { CartItem } from './CartItem';
import { IoChevronForward } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, ICartItem } from '../thunks';
import { AppDispatch, RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { CartItemsShimmer } from '../shimmer-ui';
import { Drawer } from './Drawer';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { cart, status } = useSelector((state: RootState) => state.cart);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigateToCheckout = () => {
        onClose();
        if (cart && cart.length > 0) {
            navigate(RouteConstants.checkout);
        }
    }

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchCartItems());
        }
    }, [isOpen]);

    useEffect(() => {
        if (status === 'succeeded') {
            const price = cart.reduce((acc, item) => acc + (item.productDetails.price * item.quantity), 0);
            setTotalPrice(price);
        }
    }, [status]);

    return (
        <Drawer title='Cart' isOpen={isOpen} onClose={onClose}>
            <ul className="space-y-5 flex-grow overflow-y-auto">
                {status === 'loading' ?
                    <CartItemsShimmer /> :
                    (cart.map((item: ICartItem) => (
                        <li key={item._id}>
                            <CartItem item={item} />
                        </li>
                    )))
                }
            </ul>
            <div className="flex justify-between items-center mt-4">
                {(cart && cart.length > 0) &&
                    <div className=''>
                        <h2 className='text-xl font-semibold text-primary'>₹{totalPrice}</h2>
                        <p className='text-xs text-gray-500'>Grand Total</p>
                    </div>}
                <button onClick={navigateToCheckout} className="flex justify-center items-center bg-primary text-white font-semibold py-2 px-4 rounded border border-primary hover:bg-white hover:text-primary">
                    {`${(cart && cart.length > 0) ? 'Proceed to Checkout' : 'Continue Shopping'}`}
                    <IoChevronForward className='mt-1 ms-1 font-bold text-xl' />
                </button>
            </div>
        </Drawer>
    );
};