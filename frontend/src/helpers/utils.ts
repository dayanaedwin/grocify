import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../constants';

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
