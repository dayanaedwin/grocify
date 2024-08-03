import { useState } from "react";
import { deliveryStatus, IDeliveryStatus, IOrderDateFilter, orderDateFilter, orders, RouteConstants } from "../constants";
import { convertDate, handleStatus, handleStatusBgColor, handleStatusColor } from "../helpers";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export const OrderList = () => {
    const [selected, setSelected] = useState({ status: 0, dateRange: 0 });

    const handleSelected = (key: keyof typeof selected, index: number) => {
        setSelected((prev) => ({ ...prev, [key]: index }));
    }

    return (
        <div className="w-3/4 space-y-4">
            <div className="flex">
                Breadcrumb for navigation - use a common component
            </div>
            <div className="flex justify-between">
                <div className="space-x-4">
                    {deliveryStatus.map((item: IDeliveryStatus, index: number) => (
                        <button
                            key={item.key}
                            className={`rounded-full border px-4 py-1 text-xs ${selected.status === index ? 'text-primary border-primary' : 'border-gray-300 text-gray-500'}`}
                            onClick={() => handleSelected('status', index)}
                        >
                            {item.text}
                        </button>
                    ))}
                </div>
                <div>
                    <select className="rounded-full border bg-gray-100 text-gray-500 px-2 py-1 text-xs">
                        {orderDateFilter.map((item: IOrderDateFilter, index: number) => (
                            <option key={item.key} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="space-y-4">
                {orders.map((order: any, index: number) => (
                    <Link key={order._id} to={`${RouteConstants.orders_root}/${order._id}`} className="p-4 border border-gray-300 rounded-lg flex justify-between cursor-pointer hover:shadow-lg" >
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
                ))}
            </div>
        </div>
    )
}