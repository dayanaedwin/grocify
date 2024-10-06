import { Fragment, useEffect, useState } from "react";
import { deliveryStatus, IDeliveryStatus, IOrderDateFilter, orderDateFilter, RouteConstants } from "../constants";
import { convertDate, filterOrdersByDateRange, handleStatus, handleStatusBgColor, handleStatusColor } from "../helpers";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { getAllOrders } from "../thunks";
import { OrderListShimmer } from "../shimmer-ui";
import { Breadcrumb } from "./Breadcrumb";

export const OrderList = () => {
    const [selected, setSelected] = useState({ status: 0, dateRange: 0 });
    const { orders, status } = useSelector((state: RootState) => state.order);
    const [orderList, setOrderList] = useState(orders);
    const dispatch = useDispatch<AppDispatch>();

    const handleSelected = (key: keyof typeof selected, index: number) => {
        setSelected((prev) => ({ ...prev, [key]: index }));
    };

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    useEffect(() => {
        const selectedStatus = deliveryStatus[selected.status].status;
        const statusFilteredOrders = selectedStatus.includes("all")
            ? orders
            : orders.filter(order => selectedStatus.includes(order.orderStatus));

        setOrderList(filterOrdersByDateRange(statusFilteredOrders, selected.dateRange));
    }, [orders, selected.dateRange, selected.status]);

    return (
        <Fragment>
            {status === 'loading' ?
                <OrderListShimmer /> :
                <div className="w-3/4 space-y-4">
                    <div className="flex">
                        <Breadcrumb />
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
                            <select
                                value={selected.dateRange}
                                onChange={(e) => handleSelected('dateRange', Number(e.target.value))}
                                className="rounded-full border bg-gray-100 text-gray-500 px-2 py-1 text-xs">
                                {orderDateFilter.map((item: IOrderDateFilter, index: number) => (
                                    <option key={item.key} value={index}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {orderList?.map((order: any, index: number) => (
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
                                        <div className="relative">
                                            <img
                                                src={order.products[0].productId.imageUrls ? order.products[0].productId.imageUrls[0] : ''}
                                                alt={order.products[0].productId.name}
                                                className='w-16 rounded-lg'
                                            />
                                            {order.products.length > 1 &&
                                                <div className="absolute bottom-0 right-0 text-white text-xs rounded-br-md pe-1 font-semibold bg-black opacity-60">
                                                    <p >+{order.products.length - 1}</p>

                                                </div>
                                            }
                                        </div>

                                        <div className="space-y-1">
                                            <h6 className="text-primary font-semibold text-sm">Order ID: {order._id}</h6>
                                            <p className="text-xs font-semibold text-gray-700">{`${order.products[0].productId.name} ${order.products.length > 1 ? `& ${order.products.length - 1} more items` : ''}`}</p>
                                            <p className="text-sm font-semibold text-black">₹ {order.totalPrice}</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-primary"><IoIosArrowForward size={20} /></button>
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </Fragment>

    )
}