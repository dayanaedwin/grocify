import { useEffect, useState } from "react";
import { OrderSummary, Review } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Checkout = () => {
	const { cart } = useSelector((state: RootState) => state.cart);
	const [newOrder, setNewOrder] = useState({ products: [], deliveryAddress: {}, paymentMode: '' });
	const [currentStep, setCurrentStep] = useState<number>(1);

	const handleNext = () => {
		if (currentStep < 3) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const updateOrderInfo = (key: string, data: any) => {
		setNewOrder((prevState => ({ ...prevState, [key]: data })));
	}

	useEffect(() => {
		const products = cart.map((item: any) => (
			{
				productId: item.productDetails._id,
				quantity: item.quantity,
				price: item.productDetails.price,
				currency: item.productDetails.currency
			}
		));

		if (products) {
			updateOrderInfo('products', products);
		}
	}, []);

	return (
		<div className="flex px-32 space-x-20">
			<Review
				currentStep={currentStep}
				handleBack={handleBack}
				orderInfo={newOrder}
				updateOrderInfo={updateOrderInfo}
			/>
			<OrderSummary
				orderInfo={newOrder}
				currentStep={currentStep}
				handleNext={handleNext}
			/>
		</div>
	);
};

