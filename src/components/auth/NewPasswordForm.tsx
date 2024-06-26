"use client"
import React, { useState, useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { NewPasswordFormInputs, NewPasswordSchema } from '@/schema';
import { newPassword } from '@/actions/new-password';
import { useRouter, useSearchParams } from 'next/navigation';
import { showToast } from '../Toast';

const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<NewPasswordFormInputs>({
        resolver: zodResolver(NewPasswordSchema),
    });

    const onSubmit: SubmitHandler<NewPasswordFormInputs> = (values) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                        showToast("error", <p>{data.error}</p>);
                    } else {
                        setSuccess(data?.success || null);
                        showToast("success", <p>{data?.success}</p>);
                        setTimeout(() => {
                            router.push("/auth/login");
                        }, 1000);
                    }
                })
                .catch((error) => {
                    setError("Something went wrong");
                    showToast("error", <p>Algo salio mal</p>);
                });
        });
    };

    return (
        <div className="flex-1">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Template</h2>
                <p className="mt-3 text-gray-500 dark:text-gray-300">Crea una nueva contraseña</p>
            </div>

            <div className="mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Nueva contraseña</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                            placeholder="Tu nueva contraseña"
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                        />
                        {errors.password && <p className="mt-2 text-xs text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="mt-6">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Repetir nueva contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword')}
                            placeholder="Repite tu nueva contraseña"
                            className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                        />
                        {errors.confirmPassword && <p className="mt-2 text-xs text-red-500">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md focus:outline-none focus:ring focus:ring-opacity-50 ${isPending ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 focus:ring-blue-300'}`}
                            disabled={isPending}
                        >
                            {isPending ? 'Actualizando...' : 'Actualizar contraseña'}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">¿No tienes una cuenta? <a href="#" className="text-blue-500 focus:outline-none focus:underline hover:underline">Registrarse</a>.</p>
            </div>
        </div>
    );
};

export default NewPasswordForm;
