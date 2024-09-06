import { OrderSummary, Review } from "../components";

export const Checkout = () => {
	
	return (
		<div className="flex px-32 space-x-20">
			<Review />
			<OrderSummary />
		</div>
	);
};

