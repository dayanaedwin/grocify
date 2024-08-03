import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { RouteConstants } from "../constants";
import { handleStatusColor, handleStatusBgColor, handleStatus, convertDate } from "../helpers";

export const OrderCard = (order: any) => {
    return (
        <Link id={order._id} to={`${RouteConstants.orders_root}/${order._id}`} className="p-4 border border-gray-300 rounded-lg flex justify-between cursor-pointer hover:shadow-lg" >
            <div className="space-y-2">
                <div className="flex space-x-2 text-gray-500 text-sm">
                    <div className={`flex justify-center items-center space-x-1 px-2 py-0 rounded-full text-center m-0 ${handleStatusColor(order.orderStatus)}`}>
                        <div className={`w-2 h-2 pb-1 rounded-full ${handleStatusBgColor(order.orderStatus)}`}></div>
                        <p className='py-1 pb-2 text-xs font-semibold'>{handleStatus(order.orderStatus)}</p>
                    </div>
                    <p className=""> | </p>
                    <p className="text-gray-500 text-xs">{convertDate(order.createdAt)}</p>
                </div>
                <div className="flex space-x-4">
                    <img src={`data:image/png;base64,${order.products[0].productDetails.images[0]}`} alt={order.products[0].productDetails.name} className='w-16 rounded-lg' />
                    <div className="space-y-1">
                        <h6 className="text-primary font-semibold text-sm">Order ID: {order._id}</h6>
                        <p className="text-xs font-semibold text-gray-700">{order.products[0].productDetails.name}</p>
                        <p className="text-sm font-semibold text-black">₹ {order.products[0].productDetails.price}</p>
                    </div>
                </div>
            </div>
            <button className="text-primary"><IoIosArrowForward size={20} /></button>
        </Link>
    )
}