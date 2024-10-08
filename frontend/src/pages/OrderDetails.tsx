import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { AddressCard, PaymentDetails, DeliveryItemCard, StaticStepProgressBar, Breadcrumb } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getOrderById } from "../thunks";
import { convertDate } from "../helpers";
import { OrderDetailsShimmer } from "../shimmer-ui";


export const OrderDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const { order, status } = useSelector((state: RootState) => state.order)

	useEffect(() => {
		if (id) {
			dispatch(getOrderById(id));
		}
	}, [dispatch, id]);

	return (
		<Fragment>
			{status === 'loading' ?
				<OrderDetailsShimmer /> :
				<div className='flex flex-col overflow-y-auto py-12 px-32 space-y-4'>
					<Breadcrumb />
					<div className="bg-[#F6F6F6] flex rounded p-6 space-y-2 w-full">
						<div className="font-semibold space-y-2 text-gray-700 w-2/6">
							<h6 className="text-sm">Order ID: {order?._id}</h6>
							<p className="text-xs m-0">{order?.products?.length} items</p>
						</div>
						<div className="font-semibold space-y-2 text-sm text-gray-700 w-1/6">
							<h6 >₹ {order?.totalPrice}</h6>
						</div>
						<div className="text-sm space-y-2 font-semibold text-gray-700 w-1/6">
							{order?.createdAt && <h6>{convertDate(order?.createdAt)}</h6>}
						</div>
					</div>
					<div className="flex w-full space-x-8">
						<div className="space-y-4 w-2/3">
							<h3 className="text-lg font-semibold text-gray-700">Order Details</h3>
							{order?.orderStatus && <StaticStepProgressBar orderStatus={order?.orderStatus} />}
							{order?.products?.map((products: any) => (<DeliveryItemCard product={products} orderStatus={order?.orderStatus} orderId={order?._id} />))}
						</div>
						<div className="text-md text-gray-700 font-semibold space-y-8 w-1/3">
							{order?.deliveryAddress && (<div className="space-y-2">
								<h3>Delivery Address</h3>
								<AddressCard address={order?.deliveryAddress} />
							</div>)}
							<div className="space-y-2">
								<h3>Payment Details</h3>
								{order?.totalPrice && <PaymentDetails products={order?.products} totalPrice={order?.totalPrice} />}
							</div>
						</div>
					</div>
				</div>}
		</Fragment>
	);
};