import { getDownloadURL, ref } from 'firebase/storage';
import { orderDateFilter, storage } from '../constants';
import { subMonths, differenceInDays } from 'date-fns';

const imageCache: { [key: string]: string } = {};

export const convertDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-IN', options);
}

export const handleStatusColor = (status: string) => {
    let className = ''
    switch (status) {
        case 'pending' || 'processing' || 'shipped':
            className = 'bg-orange-100 text-orange-500';
            break;
        case 'delivered':
            className = 'bg-green-100 text-green-500';
            break;
        case 'cancelled':
            className = 'bg-red-100 text-red-500';
            break;
        default:
            break;
    }
    return className;
}

export const handleStatusBgColor = (status: string) => {
    let className = ''
    switch (status) {
        case 'pending' || 'processing' || 'shipped':
            className = 'bg-orange-500';
            break;
        case 'delivered':
            className = 'bg-green-500';
            break;
        case 'cancelled':
            className = 'bg-red-500';
            break;
        default:
            break;
    }
    return className;
}

export const handleStatus = (status: string) => {
    let statusName = ''
    switch (status) {
        case 'pending' || 'processing' || 'shipped':
            statusName = 'In Progress';
            break;
        case 'delivered':
            statusName = 'Delivered';
            break;
        case 'cancelled':
            statusName = 'Cancelled';
            break;
        default:
            break;
    }
    return statusName;
}

export const getFirebaseImgURL = async (path: string) => {
    if (imageCache[path]) {
        return imageCache[path];
    }
    const storageRef = ref(storage, encodeURI(path));
    const url = await getDownloadURL(storageRef);
    imageCache[path] = url;
    return url;
}

export const isAddressEmpty = (address: any) => {
    return !address || Object.values(address).every(value => !value);
};

export const filterOrdersByDateRange = (orders: any[], selectedRange: number) => {
    const currentDate = new Date();

    switch (orderDateFilter[selectedRange].name) {
        case 'Last 30 days':
            return orders.filter(order => differenceInDays(currentDate, new Date(order.createdAt)) <= 30);
        case 'Last 3 months':
            return orders.filter(order => new Date(order.createdAt) >= subMonths(currentDate, 3));
        case '2024':
            return orders.filter(order => new Date(order.createdAt).getFullYear() === 2024);
        case 'Older':
            return orders.filter(order => new Date(order.createdAt).getFullYear() < 2024);
        case 'All':
        default:
            return orders;
    }
};