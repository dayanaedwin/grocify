import { IoPersonOutline, IoPricetagsOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiFruitBowl } from "react-icons/gi";
import { TbShoppingCartDollar } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
import { BsClipboardCheck } from "react-icons/bs";
import { IconType } from "react-icons";
import { RouteConstants } from "./routeConstants";

import vegetables from '../utils/images/vegetables.jpg';
import fruits from '../utils/images/fruits.jpg';
import grains from '../utils/images/grains.jpg';
import diary from '../utils/images/diary.jpg';
import bakery from '../utils/images/bakery.jpg';
import oils from '../utils/images/oils.jpg';
import nuts from '../utils/images/nuts.jpg';
import meat from '../utils/images/meat.jpg';
import seafood from '../utils/images/seafoods.jpg';
import beverages from '../utils/images/beverages.jpg';
import seeds from '../utils/images/seeds.jpg';
import condiments from '../utils/images/condiments.jpg';

export interface IAppFeature {
    id: number,
    title: string,
    icon: IconType,
    color: string,
}

export interface ISidebarItem {
    key: number,
    route: string
    icon: IconType,
    name: string
}

export interface IProductCategory {
    key: number,
    title: string,
    image: any
}

export interface IProductDetails {
    _id: string,
    name: string,
    description: string,
    images: string[],
    price: number,
    uom: string,
    currency: string,
    rating: number,
    category: string,
    stock: number,
    seller: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface ICartItem {
    _id: string,
    productDetails: IProductDetails,
    quantity: number,
    createdAt: string,
    updatedAt: string
}

export const features: IAppFeature[] = [
    {
        id: 1,
        title: 'Best Prices and Deals',
        icon: IoPricetagsOutline,
        color: '#EADE8B',
    },
    {
        id: 2,
        title: 'Free Shipping',
        icon: LiaShippingFastSolid,
        color: '#FBC4C0'
    },
    {
        id: 3,
        title: 'Get Fresh Products',
        icon: GiFruitBowl,
        color: '#CCB9DD'
    },
    {
        id: 4,
        title: 'Cash on Delivery',
        icon: TbShoppingCartDollar,
        color: '#CAE5BD'
    },
    {
        id: 5,
        title: 'Refundable',
        icon: RiRefund2Line,
        color: '#F1C794'
    }
];

export const accountSidebarItems: ISidebarItem[] = [
    {
        key: 1,
        route: RouteConstants.profile,
        icon: IoPersonOutline,
        name: 'Profile'
    },
    {
        key: 2,
        route: RouteConstants.orders,
        icon: BsClipboardCheck,
        name: 'Orders'
    }
]

export const paymentModes = [
    { value: 'UPI', label: 'UPI' },
    { value: 'Credit Card/Debit Card', label: 'Credit Card / Debit Card' },
    { value: 'Netbanking', label: 'Netbanking' },
    { value: 'Cash on Delivery', label: 'Cash on Delivery' },
];

export const productsCategories: IProductCategory[] = [
    {
        key: 1,
        title: 'Vegetables',
        image: vegetables,
    },
    {
        key: 2,
        title: 'Fruits',
        image: fruits,
    },
    {
        key: 3,
        title: 'Grains',
        image: grains,
    },
    {
        key: 4,
        title: 'Diary',
        image: diary,
    },
    {
        key: 5,
        title: 'Bakery',
        image: bakery,
    },
    {
        key: 6,
        title: 'Oils',
        image: oils,
    },
    {
        key: 7,
        title: 'Nuts',
        image: nuts,
    },
    {
        key: 8,
        title: 'Meat',
        image: meat,
    },
    {
        key: 9,
        title: 'Seafood',
        image: seafood,
    },
    {
        key: 10,
        title: 'Beverages',
        image: beverages,
    },
    {
        key: 11,
        title: 'Seeds',
        image: seeds,
    },
    {
        key: 12,
        title: 'Condiments',
        image: condiments,
    },
];

export const sortOptions: { key: string, value: string }[] = [
    {
        key: 'price-asc',
        value: 'Price: Low to High'
    },
    {
        key: 'price-desc',
        value: 'Price: High to Low'
    },
    {
        key: 'name-asc',
        value: 'Name: A-Z'
    },
    {
        key: 'name-desc',
        value: 'Name: Z-A'
    },
];

export interface IDeliveryStatus {
    key: number,
    text: string,
    status: string[]
}

export const deliveryStatus: IDeliveryStatus[] = [
    {
        key: 1,
        text: 'All',
        status: ['all'],
    },
    {
        key: 2,
        text: 'In Progress',
        status: ['pending', 'processing', 'shipped'],
    },
    {
        key: 3,
        text: 'Delivered',
        status: ['delivered'],
    },
    {
        key: 4,
        text: 'Cancelled',
        status: ['cancelled'],
    }
];

export interface IOrderDateFilter {
    key: number,
    name: string
}

export const orderDateFilter: IOrderDateFilter[] = [
    {
        key: 0,
        name: 'All'
    },
    {
        key: 1,
        name: 'Last 30 days',
    },
    {
        key: 2,
        name: 'Last 3 months',
    },
    {
        key: 3,
        name: '2024',
    },
    {
        key: 4,
        name: 'Older'
    }
];

export const progressSteps = [
    { key: 'placed', label: 'Order Placed' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' },
];

export const breadcrumbList: Record<string, string> = {
    '/': 'Home',
    '/products': 'Products',
    '/products/:id': 'Product Name',
    '/profile': 'Profile',
    '/orders': 'Orders',
    '/orders/:id': 'Order Details',
    '/checkout': 'Checkout'
};