
interface ICartDrawer {
    isOpen: boolean;
    onClose: () => void
}

export const CartDrawer: React.FC<ICartDrawer> = ({ isOpen, onClose }) => {

    return (
        <div className={`fixed inset-0 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed inset-0 ${isOpen ? 'bg-black opacity-50' : ''}`} onClick={() => onClose()}></div>
            <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-4 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} duration-300 ease-in-out`}>
                <h2 className="text-xl font-bold mb-4">Your Cart</h2>
                {/* Cart items go here */}
                <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Close</button>
            </div>
        </div>
    );
};