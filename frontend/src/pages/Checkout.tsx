import { useState } from "react";
import { OrderSummary, Review } from "../components";

export const Checkout = () => {
	const [deliveryAddress, setDeliveryAddress] = useState<any>({});
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [selectedPaymentMode, setSelectedPaymentMode] = useState<string>('');

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

    const handlePaymentModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPaymentMode(event.target.value);
    };

	return (
		<div className="flex px-32 space-x-20">
			<Review selectedPaymentMode={selectedPaymentMode} handlePaymentModeChange={handlePaymentModeChange} currentStep={currentStep} handleBack={handleBack} deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress} />
			<OrderSummary paymentMode={selectedPaymentMode} currentStep={currentStep} handleNext={handleNext} deliveryAddress={deliveryAddress} />
		</div>
	);
};

