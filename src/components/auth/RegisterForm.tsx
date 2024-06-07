"use client"
import React, { useState, useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { RegisterFormInputs, RegisterSchema } from '@/schema';
import { Register } from '@/actions/register';
import clsx from 'clsx';
import SocialButton from './SocialButton';
import Link from 'next/link';

const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit: SubmitHandler<RegisterFormInputs> = async data => {
        setError("");
        setSuccess("");

        startTransition(async () => {
            const response = await Register(data);
            if (response.error) {
                setError(response.error);
                toast.error(response.error, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                setSuccess(response.success || null);
                toast.success(response.success, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        });
    };

    return (
        <div className="flex-1">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Slam Style</h2>
                <p className="mt-3 text-gray-500 dark:text-gray-300">Crea tu cuenta</p>
            </div>

            <div className="mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="firstName" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Nombre</label>
                        <input
                            type="text"
                            id="firstName"
                            {...register('firstName')}
                            placeholder="Tu nombre"
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                        />
                        {errors.firstName && <p className="mt-2 text-xs text-red-500">{errors.firstName.message}</p>}
                    </div>

                    <div className="mt-6">
                        <label htmlFor="lastName" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Apellido</label>
                        <input
                            type="text"
                            id="lastName"
                            {...register('lastName')}
                            placeholder="Tu apellido"
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                        />
                        {errors.lastName && <p className="mt-2 text-xs text-red-500">{errors.lastName.message}</p>}
                    </div>

                    <div className="mt-6">
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Correo</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                            placeholder="example@example.com"
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                        />
                        {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="mt-6">
                        <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                            placeholder="Tu contraseña"
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                        />
                        {errors.password && <p className="mt-2 text-xs text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="mt-6">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Repetir Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword')}
                            placeholder="Repite tu contraseña"
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                        />
                        {errors.confirmPassword && <p className="mt-2 text-xs text-red-500">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className={clsx(
                                "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md focus:outline-none focus:ring focus:ring-opacity-50",
                                {
                                    "bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 focus:ring-blue-300": !isPending,
                                    "bg-gray-500 cursor-not-allowed": isPending,
                                }
                            )}
                            disabled={isPending}
                        >
                            {isPending ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </div>
                </form>
                <div className="mt-4 flex space-x-4">
                    <SocialButton />
                </div>

                <p className="mt-6 text-sm text-center text-gray-400">¿Ya tienes una cuenta? <Link href="/auth/login" className="text-blue-500 focus:outline-none focus:underline hover:underline">Iniciar sesión</Link>.</p>
            </div>
        </div>
    );
}

export default RegisterForm;
