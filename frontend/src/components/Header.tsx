import { IoCartOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { RouteConstants } from "../constants";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CartDrawer, AccountMenu, MobileMenu } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { SearchBar } from "./SearchBar";
import { fetchCartItems } from "../thunks";

export const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user } = useSelector((state: RootState) => state.user);
    const { cart } = useSelector((state: RootState) => state.cart);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };


    //function to close the dropdown if the user clicks outside of the dropdown
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        dispatch(fetchCartItems());
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white py-4 md:py-6 px-4 md:px-8 lg:px-32">
            <nav className="container flex justify-between items-center relative">
                <div className="flex items-center md:w-full">
                    <Link to={RouteConstants.root}>
                        <h1 className='w-full text-primary font-bold text-2xl md:text-3xl' ><i>grocify</i></h1>
                    </Link>
                </div>

                <div className="flex items-center md:w-full">
                    <SearchBar />
                </div>

                {/* Cart & Account Buttons for Larger Screens */}
                <div className="hidden md:flex items-center justify-end w-full space-x-4">
                    <button
                        className='relative flex justify-center items-center font-medium text-sm text-[#608e48] rounded focus:outline-none focus:ring-0'
                        onClick={toggleDrawer}
                    >
                        <IoCartOutline size={25} className="me-1 mt-1" />
                        {cart.length > 0 && (
                            <span className="absolute text-white text-xs -top-1 -right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </button>
                    <button
                        type='submit'
                        className='flex justify-center items-center font-medium text-sm text-[#608e48] rounded focus:outline-none focus:ring-0'
                        onClick={toggleDropdown}
                    >
                        {user?.name}
                        <TiArrowSortedDown size={18} className="ms-1" />
                    </button>
                    <AccountMenu isOpen={isDropdownOpen} dropdownRef={dropdownRef} toggleDropdown={toggleDropdown} />
                </div>

                {/* Mobile Menu Toggle Button */}
                <MobileMenu
                    isMobileMenuOpen={isMobileMenuOpen}
                    toggleMobileMenu={toggleMobileMenu}
                    toggleDropdown={toggleDropdown}
                    toggleDrawer={toggleDrawer}
                />
            </nav>
            <CartDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
        </header>
    );
};