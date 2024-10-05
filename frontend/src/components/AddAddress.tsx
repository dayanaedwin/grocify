import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import { AddressDrawer } from "./AddressDrawer";

interface IAddAdress {
    deliveryAddress: any;
    updateOrderInfo: (key: string, data: any[]) => void;
}

export const AddAddress: React.FC<IAddAdress> = ({ deliveryAddress, updateOrderInfo }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
    const [drawerTitle, setDrawerTitle] = useState<string>('');
    const { user } = useSelector((state: RootState) => state.user);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const updateAddress = (index: number) => {
        setSelectedAddressIndex(index);
        setDrawerTitle('Edit Adress');
        setIsOpen(true);
    }

    const handleAddAdresss = () => {
        setSelectedAddressIndex(-1);
        setDrawerTitle('Add New Adress');
        setIsOpen(true);
    }

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <h6 className="text-lg font-semibold">Choose Address</h6>
                    <button className="text-primary text-xs px-2 py-1 font-semibold flex items-center border rounded-md" onClick={handleAddAdresss} >
                        <h1>Add</h1>
                        <FiPlus className="font-bold ms-1" />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {(user?.addresses && user?.addresses?.length > 0) && user?.addresses?.map((address: any, index: number) => (
                        <div className="font-semibold flex flex-col text-gray-500 border p-5 rounded-md">
                            <div className="flex">
                                <p className='text-xs text-black'>{address?.name}</p>
                                {address.default && <p className='text-xs text-black'>Default</p>}
                            </div>
                            <p className='text-xs'>{address?.building}</p>
                            <p className='text-xs'>{address?.street}</p>
                            <p className='text-xs'>{address?.city}, {address?.state}, {address?.country}</p>
                            <p className='text-xs'>{address?.pincode}</p>
                            <p className='text-xs'>Phone: {address?.phone}</p>
                            <div className="flex pt-2">
                                <button onClick={() => updateAddress(index)} className="text-xs border font-semibold text-gray-700 px-2 py-1 rounded-sm me-4">Edit</button>
                                <button onClick={() => updateOrderInfo('deliveryAddress', address)} className="text-xs text-primary border border-primary rounded-sm px-2 py-1 font-semibold">Deliver here</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AddressDrawer title={drawerTitle} isOpen={isOpen} onClose={toggleDrawer} selectedIndex={selectedAddressIndex} setSelectedIndex={setSelectedAddressIndex} />
        </>
    )
}