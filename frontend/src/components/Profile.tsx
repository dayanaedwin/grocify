import { MdOutlineEdit } from "react-icons/md"
import { RiKey2Line } from "react-icons/ri"
import { Breadcrumb } from "./Breadcrumb"

export const Profile = () => {
    return (
        <div className="flex flex-col w-3/4 space-y-4">
            {/* <p className="text-xs text-gray-500">Breadcrumb for navigation - use a common component</p> */}
            <Breadcrumb />
            <div className="flex justify-between">
                <h6 className="text-lg font-semibold text-gray-700">Profile</h6>
                <div className="space-x-4 flex">
                    <button className="flex space-x-2 px-4 py-2 text-xs font-semibold text-white bg-primary rounded border border-primary hover:bg-white hover:text-primary">
                        <MdOutlineEdit size={15} className="me-1" />
                        Edit
                    </button>
                    <button className="flex space-x-2 px-4 py-2 text-xs font-semibold text-white bg-primary rounded border border-primary hover:bg-white hover:text-primary">
                        <RiKey2Line size={15} className="me-1" />
                        Change Password
                    </button>
                </div>
            </div>
            <h6 className='text-sm font-semibold'>Contact Information</h6>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 pe-16">
                <div className=''>
                    <h1 className='text-xs text-black font-medium'>Name</h1>
                    <input
                        type='email'
                        className='w-full px-3 py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                    />
                </div>
                <div className=''>
                    <h1 className='text-xs text-black font-medium'>Email</h1>
                    <input
                        type='email'
                        className='w-full px-3 py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                    />
                </div>
                <div className=''>
                    <h1 className='text-xs text-black font-medium'>Phone</h1>
                    <input
                        type='email'
                        className='w-full px-3 py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                    />
                </div>
            </div>
            <h6 className='text-sm font-semibold'>Address</h6>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 pe-16">
                <div className=''>
                    <h1 className='text-xs text-black font-medium'>Street</h1>
                    <input
                        type='email'
                        className='w-full px-3 py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                    />
                </div>
                <div className=''>
                    <h1 className='text-xs text-black font-medium'>City</h1>
                    <input
                        type='email'
                        className='w-full px-3 py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                    />
                </div>
                <div className=''>
                    <h1 className='text-xs text-black font-medium'>State</h1>
                    <input
                        type='email'
                        className='w-full px-3 py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                    />
                </div>
                <div className=''>
                    <h1 className='text-xs text-black font-medium'>Country</h1>
                    <input
                        type='email'
                        className='w-full px-3 py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                    />
                </div>
                <div className=''>
                    <h1 className='text-xs text-black font-medium'>Pincode</h1>
                    <input
                        type='email'
                        className='w-full px-3 py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                    />
                </div>
            </div>
        </div>
    )
}