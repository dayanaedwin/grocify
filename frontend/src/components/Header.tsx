import { IoCartOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";

export const Header = () => {
    return (
        <header className="bg-white py-6 px-10">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className='w-full text-primary font-bold text-3xl' ><i>grocify</i></h1>
                <div className="flex items-center w-full">
                    <input
                        type="search"
                        placeholder="Search"
                        className="w-full py-2 px-10 text-sm text-gray-700 bg-gray-100 focus:ring-0"
                    />
                </div>
                <div className="flex items-center justify-end w-full">
                    <button
                        className='mx-4 flex justify-center items-center font-medium text-sm text-gray-700 rounded focus:outline-none focus:ring-0 cursor-pointer'
                    >
                        <IoCartOutline size={20} className="me-1 mt-1" />
                        Cart
                    </button>
                    <button
                        type='submit'
                        className='ms-4 flex justify-center items-center font-medium text-sm text-gray-700 rounded focus:outline-none focus:ring-0 cursor-pointer'
                    >
                        Username
                        <TiArrowSortedDown size={18} className="ms-1" />
                    </button>
                </div>
            </nav>
        </header>
    );
};