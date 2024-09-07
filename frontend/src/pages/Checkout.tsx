import { useState } from "react";
import { OrderSummary, Review } from "../components";

export const Checkout = () => {
	const [deliveryAddress, setDeliveryAddress] = useState<any>({});
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

	return (
		<div className="flex px-32 space-x-20">
			<Review currentStep={currentStep} handleNext={handleNext} handleBack={handleBack} deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress} />
			<OrderSummary currentStep={currentStep} deliveryAddress={deliveryAddress} />
		</div>
	);
};

