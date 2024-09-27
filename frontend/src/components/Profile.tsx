import { MdOutlineEdit } from "react-icons/md";
import { RiKey2Line } from "react-icons/ri";
import { Breadcrumb } from "./Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { AddressCard } from "./AddressCard";
import { Fragment, useState } from "react";
import { AddressDrawer } from "./AddressDrawer";
import { UserInfoDrawer } from "./UserInfoDrawer";

export const Profile = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUserDrawerOpen, setIsUserDrawerOpen] = useState<boolean>(false);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(-1);
    const [drawerTitle, setDrawerTitle] = useState<string>('');

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleEditUser = () => {
        setIsUserDrawerOpen(true);
    }

    const handleEditAdrress = (index: number) => {
        setSelectedAddressIndex(index);
        setIsOpen(true);
        setDrawerTitle('Edit Adress');
    }

    const handleAddAdresss = () => {
        setSelectedAddressIndex(-1);
        setIsOpen(true);
        setDrawerTitle('Add New Adress');
    }

    return (
        <Fragment>
            <div className="flex flex-col w-3/4 space-y-4">
                <Breadcrumb />
                <div className="flex justify-between">
                    <h6 className="text-lg font-semibold text-gray-700">Profile</h6>
                    <div className="space-x-4 flex">
                        <button className="flex space-x-2 px-4 py-2 text-xs font-semibold text-white bg-primary rounded border border-primary hover:bg-white hover:text-primary">
                            <RiKey2Line size={15} className="me-1" />
                            Change Password
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <h6 className='text-sm font-semibold'>Contact Information</h6>
                    <button onClick={handleEditUser} className="text-xs border border-primary font-semibold text-primary px-2 py-1 rounded-sm">Edit</button>
                </div>
                <div className='flex w-full'>
                    <p className='text-xs text-black font-medium pe-1 pt-1'>Name:</p>
                    <h1 className='w-full text-sm' >{user?.name}</h1>
                </div>
                <div className="flex">
                    <div className='flex w-1/2'>
                        <h1 className='text-xs text-black font-medium pe-1 pt-1'>Email:</h1>
                        <h1 className='w-full text-sm' >{user?.email}</h1>
                    </div>
                    <div className='flex w-1/2'>
                        <h1 className='text-xs text-black font-medium pe-1 pt-1'>Phone:</h1>
                        <h1 className='w-full text-sm' >{user?.phone ? user?.phone : ''}</h1>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <h6 className='text-sm font-semibold'>Addresses</h6>
                    <button onClick={handleAddAdresss} className="text-xs border border-primary font-semibold text-primary px-2 py-1 rounded-sm">Add New</button>
                </div>
                <div className="grid grid-cols-3 gap-x-3 gap-y-4">
                    {user?.addresses?.map((address: any, index: number) => (
                        <div className="font-semibold flex flex-col text-gray-500 border p-5 rounded-md">
                            <div className="flex justify-between items-center">
                                <p className='text-xs text-black'>{address?.name}</p>
                                {address.isDefault && <p className='text-xs text-blue-500 bg-blue-100 rounded-full px-3 py-1'>Default</p>}
                            </div>
                            <p className='text-xs'>{address?.building}</p>
                            <p className='text-xs'>{address?.street}</p>
                            <p className='text-xs'>{address?.city}, {address?.state}, {address?.country}</p>
                            <p className='text-xs'>{address?.pincode}</p>
                            <div className="flex justify-between">
                                <p className='text-xs'>Phone: {address?.phone}</p>
                                <button onClick={() => handleEditAdrress(index)} className="text-xs border font-semibold text-gray-700 px-2 py-1 rounded-sm">Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <UserInfoDrawer isOpen={isUserDrawerOpen} onClose={() => setIsUserDrawerOpen(!isUserDrawerOpen)} user={user} />
            <AddressDrawer title={drawerTitle} isOpen={isOpen} onClose={toggleDrawer} selectedIndex={selectedAddressIndex} setSelectedIndex={setSelectedAddressIndex} />
        </Fragment >
    )
}