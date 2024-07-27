import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Heading, Body } from '../components/elements';
import { RouteConstants } from '../constants';
import { Link } from 'react-router-dom';

interface IFormValues {
	email_id: string;
	password: string;
}

export const Login = () => {

	const validationSchema = Yup.object().shape({
		email_id: Yup.string()
			.required('Email is required')
			.email("Email is not valid")
			.matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Email is not valid'),
		password: Yup.string()
			.required('Password is required')
	});

	const { handleSubmit, register, formState } = useForm({
		resolver: yupResolver(validationSchema),
		reValidateMode: 'onChange',
	});
	const { errors, isSubmitting, isValid } = formState;

	const onSubmit = async (values: IFormValues) => {
		console.log(errors.email_id, errors.password)
		if (Object.values(errors).length > 0) {
			return;
		}
	}

	return (
		<div className='flex min-h-screen'>
			<div className='hidden md:flex flex-1 bg-green-700 text-white justify-center items-center p-10'>
				<div className='text-center'>
					<Heading level={1} color='secondary' className='text-4xl font-bold mb-4'><i>grocify</i></Heading>
					<Body color='secondary' className='text-lg mb-4'><i>Freshness on the go!</i></Body>
					<p className='text-sm'>grocify offers the best selection of fresh produce, meats, and everyday essentials. Discover more and enjoy shopping like never before!</p>
				</div>
			</div>
			<div className='flex-1 flex flex-col justify-center items-center p-6 md:p-12'>
				<Heading level={1} color='primary' className='text-3xl font-bold mb-4'>Login</Heading>

				<form className='w-full max-w-sm space-y-4' onSubmit={handleSubmit(onSubmit)}>
					<div>
						<Heading level={1} color='black' className='block text-sm font-medium text-gray-700'>Email</Heading>
						<input
							{...register("email_id")}
							type='email'
							placeholder='Enter your email'
							className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black'
						/>
						{errors?.email_id?.message
							&& <Body color='danger' className='text-sm'>
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
							&& <Body color='danger' className='text-sm'>
								{errors?.password?.message}
							</Body>
						}
					</div>

					<Button
						type='submit'
						variant='primary'
						size='medium'
						className='w-full cursor-pointer'
						disabled={!isValid}
					>
						Login
					</Button>
				</form>
				<Body color='black' className='text-sm mt-2'>Don't have an account?
					<Link to={RouteConstants.login} className='text-blue-700'> Click here to sign up</Link>
				</Body>
			</div>
		</div>
	);
};
