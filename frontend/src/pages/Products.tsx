import { FilterBar, ProductList } from "../components";
import { products } from "../constants";

export const Products = () => {

	return (
		<div className='flex flex-grow overflow-y-auto bg-[#FAF9F8] pt-4 pb-6' >
			<FilterBar />
			<ProductList products={products} />
		</div>
	);
};