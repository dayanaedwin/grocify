import { IoCartOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { RouteConstants } from "../constants";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { AccountMenu } from "./AccountMenu";

export const Header = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white py-6 px-12">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="flex items-center w-full">
                    <Link to={RouteConstants.root}>
                        <h1 className='w-full text-primary font-bold text-3xl' ><i>grocify</i></h1>
                    </Link>
                </div>
                <div className="flex items-center w-full">
                    <input
                        type="search"
                        placeholder="Search"
                        className="w-full py-2 px-10 text-sm text-gray-700 bg-gray-100 focus:ring-0"
                    />
                </div>
                <div className="flex items-center justify-end w-full">
                    <button
                        className='mx-4 flex justify-center items-center font-medium text-sm text-[#608e48] rounded focus:outline-none focus:ring-0'
                        onClick={toggleDrawer}
                    >
                        <IoCartOutline size={20} className="me-1 mt-1" />
                        Cart                        
                    </button>
                    <button
                        type='submit'
                        className='relative ms-4 flex justify-center items-center font-medium text-sm text-[#608e48] rounded focus:outline-none focus:ring-0'
                        onClick={toggleDropdown}
                    >
                        Username
                        <TiArrowSortedDown size={18} className="ms-1" />
                    </button>
                    <AccountMenu isOpen={isDropdownOpen} dropdownRef={dropdownRef} toggleDropdown={toggleDropdown} />
                </div>
            </nav>
            <CartDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
        </header>
    );
};