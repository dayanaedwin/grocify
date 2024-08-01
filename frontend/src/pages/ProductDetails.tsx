import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../constants";
import { ProductImageGallery, ProductDescription } from "../components";

export const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(products[0]);

	return (
		<div className='flex flex-grow overflow-y-auto py-12' >
			<ProductImageGallery images={product.images} productName={product.name} />
			<ProductDescription product={product} />
		</div>
	);
};
