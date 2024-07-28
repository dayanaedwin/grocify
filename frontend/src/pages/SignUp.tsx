import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { RouteConstants } from '../constants';

interface IFormValues {
    email_id: string;
    password: string;
}

export const SignUp = () => {
    const [isVisible, setIsVisible] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        email_id: Yup.string()
            .required('Email is required')
            .email("Email is not valid")
            .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Email is not valid'),
        password: Yup.string()
            .required('Password is required')
    });

    const { handleSubmit, register, formState } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit = async (values: IFormValues) => {
        console.log(errors)
        if (Object.values(errors).length > 0) {
            return;
        }
    }

    return (
        <div className='flex min-h-screen'>
            <div className='hidden md:flex flex-1 bg-green-700 text-white justify-center items-center p-10'>
                <div className='text-center'>
                    <h1 className='text-4xl text-white font-bold mb-4'><i>grocify</i></h1>
                    <p className='text-white text-sm mb-4'><i>Freshness on the go!</i></p>
                    <p className='text-white text-sm'>grocify offers the best selection of fresh produce, meats, and everyday essentials. Discover more and enjoy shopping like never before!</p>
                </div>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center p-6 md:p-12'>
                <h1 className='text-3xl text-primary font-bold mb-4'>Sign Up</h1>
                <form className='w-full max-w-sm space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h1 className='text-sm text-black font-medium'>Name</h1>
                        <input
                            {...register("name")}
                            placeholder='Enter your name'
							className='w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                        />
                        {errors?.name?.message
                            && <p className='text-red-700 text-sm'>{errors?.name?.message}</p>
                        }
                    </div>

                    <div>
                        <h1 className='text-sm text-black font-medium'>Email</h1>
                        <input
                            {...register("email_id")}
                            type='email'
                            placeholder='Enter your email'
							className='w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                        />
                        {errors?.email_id?.message
                            && <p className='text-red-700 text-sm'>{errors?.email_id?.message}</p>
                        }
                    </div>

                    <div>
                        <h1 className='text-sm text-black font-medium'>Password</h1>
                        <input
                            {...register("password")}
                            type='password'
                            id='password'
                            placeholder='Enter your password'
							className='w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                        />
                        {errors?.password?.message
                            && <p className='text-red-700 text-sm'>{errors?.password?.message}</p>
                        }
                    </div>
                    <button
                        type='submit'
                        disabled={!isValid}
						className='w-full py-2 my-2 font-semibold text-base bg-primary text-white border rounded cursor-pointer focus:outline-none hover:bg-white hover:text-primary hover:border-primary focus:ring focus:ring-black'

                    >
                        Sign Up
                    </button>
                </form>
                <p className='text-black text-sm mt-2'>Already have an account?
                    <Link to={RouteConstants.login} className='text-blue-700'> Click here to login</Link>
                </p>
            </div>
        </div>
    );
};
