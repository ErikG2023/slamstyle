"use client"
import React, { useState, useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { ResetPasswordFormInputs, ResetPasswordSchema } from '@/schema';
import { reset } from '@/actions/reset';
import { showToast } from '../Toast';

const ResetPasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormInputs>({
        resolver: zodResolver(ResetPasswordSchema),
    });

    const onSubmit: SubmitHandler<ResetPasswordFormInputs> = data => {
        setError("");
        setSuccess("");

        startTransition(async () => {
            const response = await reset(data);
            if (response.error) {
                setError(response.error);
                showToast("error", <p>{response.error}</p>);
            } else {
                setSuccess(response.success || null);
                showToast("success", <p>{response.success}</p>);
            }
        });
    };

    return (
        <div className="flex-1">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Template</h2>
                <p className="mt-3 text-gray-500 dark:text-gray-300">Recupera tu contraseña</p>
            </div>

            <div className="mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
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
                        <button
                            type="submit"
                            className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md focus:outline-none focus:ring focus:ring-opacity-50 ${isPending ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 focus:ring-blue-300'}`}
                            disabled={isPending}
                        >
                            {isPending ? 'Enviando...' : 'Enviar enlace de recuperación'}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">¿No tienes una cuenta? <a href="#" className="text-blue-500 focus:outline-none focus:underline hover:underline">Registrarse</a>.</p>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
