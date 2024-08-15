import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { RouteConstants } from '../constants';
import { useDispatch } from 'react-redux';
import { RegisterForm, signUp } from '../thunks';
import { AppDispatch } from '../store';

export const SignUp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email("Email is not valid"),
        password: Yup.string()
            .required('Password is required')
    });

    const { handleSubmit, register, formState: { errors, isSubmitting, isValid } } = useForm<RegisterForm>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data: RegisterForm) => {
        if (Object.values(errors).length > 0) {
            return;
        }
        try {
            await dispatch(signUp(data)).unwrap();
            navigate(RouteConstants.root);
        } catch (error) {
            console.log(error);
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
                        <p className={`text-red-700 text-sm ${errors?.name?.message ? 'block' : 'hidden'}`}>{errors?.name?.message}</p>
                    </div>

                    <div>
                        <h1 className='text-sm text-black font-medium'>Email</h1>
                        <input
                            {...register("email")}
                            type='email'
                            placeholder='Enter your email'
                            className='w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-700'
                        />
                        <p className={`text-red-700 text-sm ${errors?.email?.message ? 'block' : 'hidden'}`}>{errors?.email?.message}</p>
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
                        <p className={`text-red-700 text-sm ${errors?.password?.message ? 'block' : 'hidden'}`} >{errors?.password?.message}</p>
                    </div>
                    <button
                        disabled={!isValid}
                        className='w-full py-2 my-2 font-semibold text-base bg-primary text-white border rounded cursor-pointer focus:outline-none focus:ring disabled:opacity-50 disabled:cursor-not-allowed'
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
