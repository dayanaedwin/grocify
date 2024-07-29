import { IoPricetagsOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiFruitBowl } from "react-icons/gi";
import { TbShoppingCartDollar } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
import { IconType } from "react-icons";

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

export interface IProductCategory {
    key: number,
    title: string,
    image: any
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
    }];

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
