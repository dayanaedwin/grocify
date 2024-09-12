import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductImageGallery, ProductDescription } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../thunks";
import { AppDispatch, RootState } from "../store";
import { ProductDetailsShimmer } from "../shimmer-ui";

export const ProductDetails = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const { product, status } = useSelector((state: RootState) => state.product);

	useEffect(() => {
		if (id) {
			dispatch(fetchProductById(id));
		}
	}, [dispatch, id]);

	return (
		<Fragment>
			{status === 'loading' ? (
				<ProductDetailsShimmer />
			) : (product && <div className='flex flex-grow overflow-y-auto py-12 px-32' >
				<ProductImageGallery images={product.imageUrls ? product.imageUrls : []} productName={product.name} />
				<ProductDescription product={product} />
			</div>
			)}
		</Fragment>

	);
};
