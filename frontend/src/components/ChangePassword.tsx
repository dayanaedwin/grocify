import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

export const ChangePassword = () => {
    const validationSchema = Yup.object().shape({
        current_password: Yup.string()
            .required('Email is required')
            .email("Email is not valid")
            .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Email is not valid'),
        new_password: Yup.string()
            .required('Password is required'),
        confirm_password: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('new_password')], 'Passwords must match')
    });

    const { handleSubmit, register, formState } = useForm({
        resolver: yupResolver(validationSchema),
        reValidateMode: 'onChange',
    });
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit = async (values: any) => {
        console.log(errors.current_password, errors.new_password, errors.confirm_password);
        if (Object.values(errors).length > 0) {
            return;
        }
    }
    return (
        <div className="flex flex-col w-3/4 space-y-4">
            <p className="text-xs text-gray-500">Breadcrumb for navigation - use a common component</p>
            <h6 className="text-lg font-semibold text-gray-700">Change Password</h6>
            <form className="space-y-4">
                <div className='w-1/2'>
                    <h1 className='text-sm text-gray-700 font-medium'>Current Password</h1>
                    <input
                        {...register("current_password")}
                        type='password'
                        className='w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                    />
                    {errors?.current_password?.message
                        && <p className='text-red-700 text-sm'>
                            {errors?.current_password?.message}
                        </p>
                    }
                </div>

                <div className='w-1/2'>
                    <h1 className='text-sm text-gray-700 font-medium'>New Password</h1>
                    <input
                        {...register("new_password")}
                        type='password'
                        id='password'
                        className='w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                    />
                    {errors?.new_password?.message
                        && <p className='text-red-700 text-sm'>
                            {errors?.new_password?.message}
                        </p>
                    }
                </div>
                <div className='w-1/2'>
                    <h1 className='text-sm text-gray-700 font-medium'>Password</h1>
                    <input
                        {...register("confirm_password")}
                        type='password'
                        id='password'
                        className='w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                    />
                    {errors?.confirm_password?.message
                        && <p className='text-red-700 text-sm'>
                            {errors?.confirm_password?.message}
                        </p>
                    }
                </div>

                <button
                    type='submit'
                    disabled={!isValid}
                    className='w-1/2 py-2 my-2 font-semibold text-base bg-black text-white border rounded cursor-pointer focus:outline-none hover:bg-white hover:text-primary hover:border-primary focus:ring focus:ring-black'
                >
                    Change Password
                </button>
            </form>
        </div>
    )
}