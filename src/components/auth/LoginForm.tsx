"use client"

import React, { startTransition, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { LoginFormInputs, LoginSchema } from '@/schema';
import { Login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SocialButton from './SocialButton';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(LoginSchema),
    });
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ?
        "Email already in use with different provider!" : "";

    const onSubmit: SubmitHandler<LoginFormInputs> = values => {
        startTransition(() => {
            Login(values, callbackUrl).
                then((data) => {
                    if (data?.error) {
                        toast.error(data?.error, {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    } else if (data?.twoFactor) {
                        toast.success("Codigo enviado", {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        
                        setTwoFactor(data.twoFactor); // Guarda el estado para manejar el código de 2FA
                    } else if (data?.success) {
                        toast.success(data?.success, {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        if (data.redirectTo) {
                            // Redirige a la página deseada después del inicio de sesión
                            window.location.href = data.redirectTo
                        }
                    }
                })
                .catch(() => toast.error("Something went wrong", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }));
        });
    };

    const [twoFactor, setTwoFactor] = useState<boolean>(false); // Estado para manejar el flujo de 2FA

    return (
        <div className="flex-1">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Slam Style</h2>
                <p className="mt-3 text-gray-500 dark:text-gray-300">Inicia Session para acceder a tu cuenta</p>
            </div>

            <div className="mt-8">
                {!twoFactor ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email</label>
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
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Contraseña</label>
                                <Link href="/auth/reset" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Olvido su contraseña?</Link>
                            </div>

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
                            <button
                                type="submit"
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Ingresar
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="code" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Two-Factor Code</label>
                            <input
                                type="text"
                                id="code"
                                {...register('code')}
                                placeholder="Enter your two-factor code"
                                className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.code ? 'border-red-500' : 'border-gray-200'} rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                            />
                            {errors.code && <p className="mt-2 text-xs text-red-500">{errors.code.message}</p>}
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Verify Two-Factor Code
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-4 flex space-x-4">
                    <SocialButton />
                </div>

                <p className="mt-6 text-sm text-center text-gray-400">Aun no tienes cuenta? <Link href="/auth/register" className="text-blue-500 focus:outline-none focus:underline hover:underline">Crear</Link>.</p>
            </div>
        </div>
    );
}

export default LoginForm;
