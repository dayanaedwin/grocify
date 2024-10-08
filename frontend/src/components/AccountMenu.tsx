import React, { RefObject } from "react"
import { RouteConstants } from "../constants"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { logout } from "../slices";
import { AppDispatch } from "../store";

interface AccountMenuProps {
    isOpen: boolean;
    dropdownRef: RefObject<HTMLDivElement>,
    toggleDropdown: () => void
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ isOpen, dropdownRef, toggleDropdown }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        toggleDropdown();
        dispatch(logout());
    }

    return (
        <React.Fragment>
            {isOpen && (
                <div ref={dropdownRef} className="absolute right-22 top-12 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg text-start">
                    <Link
                        to={RouteConstants.profile}
                        className="block px-4 py-2 text-gray-700 text-sm font-semibold hover:bg-gray-100"
                        onClick={toggleDropdown}
                    >
                        Profile
                    </Link>
                    <Link
                        to={RouteConstants.orders}
                        className="block px-4 py-2 text-gray-700 text-sm font-semibold hover:bg-gray-100"
                        onClick={toggleDropdown}
                    >
                        Orders
                    </Link>
                    <button
                        className="block w-full text-left px-4 py-2 text-gray-700 text-sm font-semibold hover:bg-gray-100"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </React.Fragment>
    )
}