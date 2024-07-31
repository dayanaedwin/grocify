import React, { RefObject } from "react"
import { RouteConstants } from "../constants"
import { Link } from "react-router-dom"

interface AccountMenuProps {
    isOpen: boolean;
    dropdownRef: RefObject<HTMLDivElement>,
    toggleDropdown: () => void
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ isOpen, dropdownRef, toggleDropdown }) => {
    return (
        <React.Fragment>
            {isOpen && (
                <div ref={dropdownRef} className="absolute right-4 top-12 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg text-start">
                    <Link to={RouteConstants.orders} className="block px-4 py-2 text-gray-700 text-sm font-semibold hover:bg-gray-100">My Orders</Link>
                    <button
                        className="block w-full text-left px-4 py-2 text-gray-700 text-sm font-semibold hover:bg-gray-100"
                        onClick={toggleDropdown}
                    >
                        Logout
                    </button>
                </div>
            )}
        </React.Fragment>
    )
}