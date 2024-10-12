import { Fragment } from "react";
import { HiX, HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { RouteConstants } from "../constants";
import { Drawer } from "./Drawer";

interface MobileMenuProps {
    isMobileMenuOpen: boolean;
    toggleDrawer: () => void;
    toggleDropdown: () => void;
    toggleMobileMenu: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isMobileMenuOpen, toggleDrawer, toggleDropdown, toggleMobileMenu }) => {
    return (
        <Fragment>
            <div className="md:hidden">
                <button className="flex items-center text-primary" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                </button>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <Drawer title='' isOpen={isMobileMenuOpen} onClose={toggleMobileMenu}>
                        <div className="flex flex-col justify-center items-start space-y-4">
                            <Link
                                to={RouteConstants.profile}
                                className="block px-4 py-2 text-gray-700 font-semibold hover:bg-gray-100"
                                onClick={toggleDropdown}
                            >
                                Profile
                            </Link>
                            <button className="block px-4 py-2 text-gray-700 font-semibold hover:bg-gray-100" onClick={toggleDrawer}>
                                Cart
                            </button>
                            <Link
                                to={RouteConstants.orders}
                                className="block px-4 py-2 text-gray-700 font-semibold hover:bg-gray-100"
                                onClick={toggleDropdown}
                            >
                                Orders
                            </Link>
                            <button
                                className="block px-4 py-2 text-gray-700 font-semibold hover:bg-gray-100"
                            // onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </Drawer>
                )}
            </div>
        </Fragment>
    )
}