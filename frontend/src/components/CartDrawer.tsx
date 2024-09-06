import { useEffect } from 'react';
import { RouteConstants } from '../constants';
import { CartItem } from './CartItem';
import { IoChevronForward, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, ICartItem } from '../thunks';
import { AppDispatch, RootState } from '../store';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { cart } = useSelector((state: RootState) => state.cart);

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

    return (
        <div className={`fixed inset-0 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed inset-0 ${isOpen ? 'bg-black opacity-50' : ''}`} onClick={() => onClose()}></div>
            <div className={`fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg p-6 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} duration-300 ease-in-out flex flex-col`}>
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-semibold mb-4">Cart</h2>
                    <button onClick={onClose} className='absolute right-4 top-4 p-2 text-black font-bold'>
                        <IoClose size={25} />
                    </button>
                </div>
                <ul className="space-y-5 flex-grow overflow-y-auto">
                    {cart.map((item: ICartItem) => (
                        <li key={item._id}>
                            <CartItem item={item} />
                        </li>
                    ))}
                </ul>
                <button onClick={navigateToCheckout} className="flex justify-center items-center mt-4 bg-primary text-white font-semibold py-2 px-4 rounded border border-primary hover:bg-white hover:text-primary">
                    {`${(cart && cart.length > 0) ? 'Proceed to Checkout' : 'Continue Shopping'}`}
                    <IoChevronForward className='mt-1 ms-1 font-bold text-xl' />
                </button>
            </div>
        </div>
    );
};