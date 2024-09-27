import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { Drawer } from "./Drawer";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { updatePassword } from '../thunks';
import { logout } from '../slices';

interface ChangePasswordProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .required('Current password is required'),
        newPassword: Yup.string()
            .required('New password is required')
            .min(8, 'New password must be at least 8 characters')
            .matches(/[A-Z]/, 'New password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'New password must contain at least one lowercase letter')
            .matches(/\d/, 'New password must contain at least one number')
            .matches(/[@$!%*?&#]/, 'New password must contain at least one special character'),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    });

    const { handleSubmit, register, reset, formState: { errors, isSubmitting, isValid } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: any) => {
        if (!isValid) return;

        await dispatch(updatePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        }));

        dispatch(logout());
        
        onClose();
    }

    return (
        <Drawer title='Change Password' isOpen={isOpen} onClose={onClose}>
            <form className="flex flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col flex-grow overflow-y-auto">
                    <label className="text-xs text-gray-500 mb-1" >Current Password</label>
                    <input
                        {...register('currentPassword')}
                        className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                    />
                    <p className={`text-red-700 text-sm ${errors?.currentPassword?.message ? 'block' : 'hidden'}`} >{errors?.currentPassword?.message}</p>

                    <label className="text-xs text-gray-500 my-1 mt-3" >New Password</label>
                    <input
                        {...register('newPassword')}
                        className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                    />
                    <p className={`text-red-700 text-sm ${errors?.newPassword?.message ? 'block' : 'hidden'}`} >{errors?.newPassword?.message}</p>

                    <label className="text-xs text-gray-500 my-1 mt-3" >Confirm Password</label>
                    <input
                        {...register('confirmPassword')}
                        className="text-sm bg-gray-50 text-black pt-2 pb-3 px-3 rounded-md"
                    />
                    <p className={`text-red-700 text-sm ${errors?.confirmPassword?.message ? 'block' : 'hidden'}`} >{errors?.confirmPassword?.message}</p>
                </div>
                <button type="submit" disabled={isSubmitting} className="flex justify-center items-center mt-4 bg-primary text-white font-semibold py-2 px-4 rounded border border-primary hover:bg-white hover:text-primary">
                    Update Password
                </button>
            </form>
        </Drawer >
    )
}