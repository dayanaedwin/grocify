import { useEffect, useState } from "react";
import { Modal, OrderSummary, Review } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { RouteConstants } from "../constants";

export const Checkout = () => {
	const navigate = useNavigate();
	const { cart } = useSelector((state: RootState) => state.cart);
	const [newOrder, setNewOrder] = useState({ products: [], deliveryAddress: {}, paymentMode: '' });
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [isVisible, setIsVisible] = useState(false);

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

	const handleShopMoreBtn = () => {
		setIsVisible(false);
		navigate(RouteConstants.products);
	}

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
	}, [cart]);

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
				setIsVisible={setIsVisible}
			/>
			{isVisible && (
                <Modal onClose={() => setIsVisible(false)}>
                    <div className="text-center p-5">
                        <h2 className="text-lg font-semibold mb-4">Order Placed Successfully!</h2>
                        <p className="text-sm mb-4">Your order has been placed and is being processed. You will receive an update soon.</p>
                        <button onClick={() => handleShopMoreBtn()} className="text-primary font-semibold border border-primary px-4 py-2 rounded-md">Shop More</button>
                    </div>
                </Modal>
            )}
		</div>
	);
};

