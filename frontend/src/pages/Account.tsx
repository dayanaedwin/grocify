import { AccountSidebar } from "../components";

interface AccountProps {
	children: React.ReactNode;
}

export const Account:React.FC<AccountProps> = ({ children }) => {

	return (
		<div className='flex flex-grow overflow-y-auto py-12 px-32 justify-between'>
			<AccountSidebar />
			{children}
		</div>
	);
};
