import { Outlet } from "react-router-dom";
import { AccountSidebar } from "../components";

export const Account = () => {

	return (
		<div className='flex flex-grow overflow-y-auto py-12 px-32 justify-between'>
			<AccountSidebar />
			<Outlet />
		</div>
	);
};
