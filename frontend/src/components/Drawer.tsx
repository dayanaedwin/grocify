import { IoClose } from "react-icons/io5";

interface DrawerProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ title, isOpen, onClose, children }) => {
    return (
        <div className={`fixed inset-0 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed inset-0 ${isOpen ? 'bg-black opacity-50' : ''}`} onClick={() => onClose()}></div>
            <div className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-white shadow-lg p-6 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} duration-300 ease-in-out flex flex-col`}>
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-semibold mb-4">{title}</h2>
                    <button onClick={onClose} className='absolute right-4 top-4 p-2 text-black font-bold'>
                        <IoClose size={25} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}