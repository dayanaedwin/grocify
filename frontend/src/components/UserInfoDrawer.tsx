import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { Drawer } from './Drawer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { updateUserInfo, getLoggedUser } from '../thunks';

interface AddressDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
}

export const UserInfoDrawer: React.FC<AddressDrawerProps> = ({ isOpen, onClose, user }) => {
    const dispatch = useDispatch<AppDispatch>();
    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('This is required')
            .min(2, 'Name must be at least 2 characters long'),
        email: Yup.string()
            .required('Email is required')
            .email("Email is not valid"),
        phone: Yup.string()
            .required('This is required')
            .matches(/^\d+$/, 'Phone number must contain only digits')
            .length(10, 'Phone number must be exactly 10 digits'),
    });

    const { handleSubmit, register, reset, formState: { errors, isSubmitting, isValid } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: any) => {
        if (!isValid) return;
        const newUser = { ...user, ...data };
        
        try {
            await dispatch(updateUserInfo(newUser)).unwrap();
            await dispatch(getLoggedUser());
        } catch (error) {
            console.error('Failed to update cart item:', error);
        }
        onClose();
    }

    useEffect(() => {
        reset({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
        });
    }, [user, reset]);

    return (
        <Drawer title='Update Contact' isOpen={isOpen} onClose={onClose}>
            <form className="flex flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col flex-grow overflow-y-auto">
                    <label className="text-xs text-gray-500 mb-1" >Name</label>
                    <input
                        {...register('name')}
                        className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                    />
                    <p className={`text-red-700 text-sm ${errors?.name?.message ? 'block' : 'hidden'}`} >{errors?.name?.message}</p>

                    <label className="text-xs text-gray-500 my-1 mt-3" >Email</label>
                    <input
                        {...register('email')}
                        readOnly
                        className="text-sm bg-gray50 text-gray-600 pt-2 pb-3 px-3 rounded-md cursor-not-allowed"
                    />
                    <p className={`text-red-700 text-sm ${errors?.email?.message ? 'block' : 'hidden'}`} >{errors?.email?.message}</p>

                    <label className="text-xs text-gray-500 my-1 mt-3" >Phone</label>
                    <input
                        {...register('phone')}
                        className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                    />
                    <p className={`text-red-700 text-sm ${errors?.phone?.message ? 'block' : 'hidden'}`} >{errors?.phone?.message}</p>
                </div>
                <button type="submit" disabled={isSubmitting} className="flex justify-center items-center mt-4 bg-primary text-white font-semibold py-2 px-4 rounded border border-primary hover:bg-white hover:text-primary">
                    Update
                </button>
            </form>
        </Drawer>
    )
}