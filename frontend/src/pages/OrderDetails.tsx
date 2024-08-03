import { useParams } from "react-router-dom";
import { orders } from "../constants";
import { useState } from "react";
import { AddressCard, PaymentDetails, DeliveryItemCard } from "../components";


export const OrderDetails = () => {
	const { id } = useParams();
	const [order, setOrder] = useState(orders[0]);

	return (
		<div className='flex flex-col overflow-y-auto py-12 px-32 space-y-4'>
			{/* Breadcrumb for navigation - use a common component */}
			<div className="bg-[#F6F6F6] flex rounded p-6 space-y-2 w-full">
				<div className="font-semibold space-y-2 text-gray-700 w-2/6">
					<h6 className="text-sm">Order ID: {order._id}</h6>
					<p className="text-xs m-0">{order.products?.length} items</p>
				</div>
				<div className="font-semibold space-y-2 text-sm text-gray-700 w-1/6">
					<h6 >₹ {order.totalPrice}</h6>
				</div>
				<div className="text-sm space-y-2 text-sm font-semibold text-gray-700 w-1/6">
					<h6>10 May 2021</h6>
				</div>
			</div>
			<div className="flex w-full space-x-8">
				<div className="space-y-4 w-2/3">
					<h3 className="text-lg font-semibold text-gray-700">Items Ordered</h3>
					{/* Order Status Progress Bar */}
					{order.products.map((products: any) => (<DeliveryItemCard product={products} />))}
				</div>
				<div className="text-md text-gray-700 font-semibold space-y-8 w-1/3">
					<div className="space-y-2">
						<h3>Delivery Address</h3>
						<AddressCard address={order.deliveryAddress} />
					</div>
					<div className="space-y-2">
						<h3>Payment Details</h3>
						<PaymentDetails products={order.products} totalPrice={order.totalPrice} />
					</div>
				</div>
			</div>
		</div>
	);
};