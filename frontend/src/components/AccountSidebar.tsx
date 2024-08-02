import { NavLink } from "react-router-dom";
import { accountSidebarItems, ISidebarItem, RouteConstants } from "../constants";

export const AccountSidebar = () => {
    const baseClass = 'text-gray-700 flex items-center space-x-2 text-md font-semibold rounded-md p-3 hover:text-primary hover:bg-[#F6F6F6]';

    return (
        <ul className="w-1/4 pe-10">
            {accountSidebarItems.map((item: ISidebarItem) => (
                <li key={item.key}>
                    <NavLink key={item.key}
                        to={item.route}
                        className={({ isActive }) => (isActive ? `active ${baseClass}` : baseClass)}
                    >
                        <item.icon size={23} />
                        <p>{item.name}</p>
                    </NavLink>
                </li>
            ))}
        </ul >
    )
}