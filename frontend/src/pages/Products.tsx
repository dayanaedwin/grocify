import { useEffect } from "react";
import { FilterBar, ProductList } from "../components";

export const Products = () => {

	return (
		<div className='flex flex-grow overflow-y-auto bg-[#FAF9F8] pt-4 pb-6 px-32 justify-between' >
			<FilterBar />
			<hr />
			<ProductList />
		</div>
	);
};