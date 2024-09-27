import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser, updateUserInfo } from '../thunks';
import { useEffect } from 'react';
import { Drawer } from './Drawer';

interface AddressDrawerProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    selectedIndex: any;
    setSelectedIndex: React.Dispatch<any>;
}

export const AddressDrawer: React.FC<AddressDrawerProps> = ({ title, isOpen, onClose, selectedIndex, setSelectedIndex }) => {
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('This is required')
            .min(2, 'Name must be at least 2 characters long'),
        phone: Yup.string()
            .required('This is required')
            .matches(/^\d+$/, 'Phone number must contain only digits')
            .length(10, 'Phone number must be exactly 10 digits'),
        building: Yup.string()
            .required('This is required')
            .min(1, 'Building must be at least 1 character long'),
        street: Yup.string()
            .required('This is required')
            .min(2, 'Street must be at least 2 characters long'),
        city: Yup.string()
            .required('This is required')
            .min(2, 'City must be at least 2 characters long'),
        state: Yup.string()
            .required('This is required')
            .min(2, 'State must be at least 2 characters long'),
        country: Yup.string()
            .required('This is required')
            .min(2, 'Country must be at least 2 characters long'),
        pincode: Yup.string()
            .required('This is required')
            .matches(/^\d+$/, 'Pincode must contain only digits')
            .length(6, 'Pincode must be exactly 6 digits'),
        isDefault: Yup.boolean()
    });

    const { handleSubmit, register, reset, formState: { errors, isSubmitting, isValid } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: any) => {
        if (!isValid) return;
        let addresses = (user && user.addresses) ? [...user?.addresses] : [];

        if (selectedIndex >= 0 && addresses[selectedIndex]) {
            addresses[selectedIndex] = { ...addresses[selectedIndex], ...data };
        } else {
            addresses.push(data);
        }

        const newUser = { ...user, addresses };

        try {
            await dispatch(updateUserInfo(newUser)).unwrap();
            await dispatch(getLoggedUser());
        } catch (error) {
            console.error('Failed to update cart item:', error);
        }
        onClose();
    }

    useEffect(() => {
        if (selectedIndex !== undefined && selectedIndex > -1 && user?.addresses && user?.addresses[selectedIndex]) {
            const selectedAddress = user.addresses[selectedIndex];
            reset({
                name: selectedAddress.name || '',
                phone: selectedAddress.phone || '',
                building: selectedAddress.building || '',
                street: selectedAddress.street || '',
                city: selectedAddress.city || '',
                state: selectedAddress.state || '',
                country: selectedAddress.country || '',
                pincode: selectedAddress.pincode || '',
                isDefault: selectedAddress.isDefault || false,
            });
        } else {
            reset({
                name: '',
                phone: '',
                building: '',
                street: '',
                city: '',
                state: '',
                country: '',
                pincode: '',
                isDefault: false,
            });
        }
    }, [selectedIndex, reset]);

    return (
        <Drawer title={title} isOpen={isOpen} onClose={onClose}>
            <form className="flex flex-col overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
                <label className="text-xs text-gray-500 mb-1" >Name</label>
                <input
                    {...register('name')}
                    className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                />
                <p className={`text-red-700 text-sm ${errors?.name?.message ? 'block' : 'hidden'}`} >{errors?.name?.message}</p>

                <label className="text-xs text-gray-500 my-1 mt-3" >Phone</label>
                <input
                    {...register('phone')}
                    className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                />
                <p className={`text-red-700 text-sm ${errors?.phone?.message ? 'block' : 'hidden'}`} >{errors?.phone?.message}</p>

                <label className="text-xs text-gray-500 my-1 mt-3" >House / Flat / Office No.</label>
                <input
                    {...register('building')}
                    className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                />
                <p className={`text-red-700 text-sm ${errors?.building?.message ? 'block' : 'hidden'}`} >{errors?.building?.message}</p>

                <label className="text-xs text-gray-500 my-1 mt-3" >Street</label>
                <input
                    {...register('street')}
                    className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                />
                <p className={`text-red-700 text-sm ${errors?.street?.message ? 'block' : 'hidden'}`} >{errors?.street?.message}</p>

                <label className="text-xs text-gray-500 my-1 mt-3" >City</label>
                <input
                    {...register('city')}
                    className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                />
                <p className={`text-red-700 text-sm ${errors?.city?.message ? 'block' : 'hidden'}`} >{errors?.city?.message}</p>

                <label className="text-xs text-gray-500 my-1 mt-3" >State</label>
                <input
                    {...register('state')}
                    className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                />
                <p className={`text-red-700 text-sm ${errors?.state?.message ? 'block' : 'hidden'}`} >{errors?.state?.message}</p>

                <label className="text-xs text-gray-500 my-1 mt-3" >Country</label>
                <input
                    {...register('country')}
                    className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                />
                <p className={`text-red-700 text-sm ${errors?.country?.message ? 'block' : 'hidden'}`} >{errors?.country?.message}</p>

                <label className="text-xs text-gray-500 my-1 mt-3" >Pincode</label>
                <input
                    {...register('pincode')}
                    className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                />
                <p className={`text-red-700 text-sm ${errors?.pincode?.message ? 'block' : 'hidden'}`} >{errors?.pincode?.message}</p>

                <div className="flex items-center mt-3">
                    <input
                        type="checkbox"
                        {...register('isDefault')}
                        className="mr-2"
                    />
                    <label className="text-sm text-gray-500">Set as default address</label>
                </div>

                <button type="submit" disabled={isSubmitting} className="flex justify-center items-center mt-4 bg-primary text-white font-semibold py-2 px-4 rounded border border-primary hover:bg-white hover:text-primary">
                    Ship to this Address
                </button>
            </form>
        </Drawer>
    )
}