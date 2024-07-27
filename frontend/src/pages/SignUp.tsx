import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Heading, Body } from '../components/elements';
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
                    <Heading level={1} color='secondary' className='text-4xl font-bold mb-4'><i>grocify</i></Heading>
                    <Body color='secondary' size='small' className='mb-4'><i>Freshness on the go!</i></Body>
                    <Body color='secondary' className='text-sm'>grocify offers the best selection of fresh produce, meats, and everyday essentials. Discover more and enjoy shopping like never before!</Body>
                </div>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center p-6 md:p-12'>
                <Heading level={2} color='primary' className='text-3xl font-bold mb-4'>Sign Up</Heading>
                <form className='w-full max-w-sm space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Heading level={1} color='black' className='block text-sm font-medium text-gray-700'>Name</Heading>
                        <input
                            {...register("name")}
                            placeholder='Enter your name'
                            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black'
                        />
                        {errors?.name?.message
                            && <Body
                                color='secondary'
                            >
                                {errors?.name?.message}
                            </Body>
                        }
                    </div>

                    <div>
                        <Heading level={1} color='black' className='block text-sm font-medium text-gray-700'>Email</Heading>
                        <input
                            {...register("email_id")}
                            type='email'
                            placeholder='Enter your email'
                            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black'
                        />
                        {errors?.email_id?.message
                            && <Body
                            >
                                {errors?.email_id?.message}
                            </Body>
                        }
                    </div>

                    <div>
                        <Heading level={1} color='black' className='block text-sm font-medium text-gray-700'>Password</Heading>
                        <input
                            {...register("password")}
                            type='password'
                            id='password'
                            placeholder='Enter your password'
                            className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black'
                        />
                        {errors?.password?.message
                            && <Body
                                color='secondary'
                            >
                                {errors?.password?.message}

                            </Body>
                        }
                    </div>

                    <Button
                        type='submit'
                        variant='primary'
                        size='medium'
                        className='w-full'
                        disabled={!isValid}
                    >
                        {isSubmitting
                            && <Body
                                className='spinner'
                            >
                            </Body>
                        }
                        Sign up
                    </Button>
                </form>
                <Body color='black' className='text-sm mt-2'>Already have an account?
                    <Link to={RouteConstants.login} className='text-blue-700'> Click here to login</Link>
                </Body>
            </div>
        </div>
    );
};
