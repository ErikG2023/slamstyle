"use client";
// settings.tsx
// settings.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settings } from '@/actions/settings';
import { toast } from 'react-toastify';
import { SettingFormInputs, SettingsSchema } from '@/schema';
import { error } from 'console';

const Settings = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SettingFormInputs>({
        resolver: zodResolver(SettingsSchema),
    });

    const onSubmit: SubmitHandler<SettingFormInputs> = async (values) => {
        // const result = await settings(values);
        try {
            const result = await settings(values);
            if (result.error) {
                toast.error(result.error);
            } else if (result.success) {
                toast.success(result.success);
            }
        } catch (error) {
            console.error("Error updating settings:", error);
            toast.error("Failed to update settings. Please try again later.");
        }
    };

    return (
        <div className="bg-white px-8 pb-8 rounded shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold mt-8 mb-4">Settings</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div> */}

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nombre</span>
                    </div>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <div className="label">
                        {errors.name && <span className="text-red-500 label-text-alt">{errors.name.message}</span>}

                    </div>
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <div className="label">
                        {errors.email && <span className="text-red-500 label-text-alt">{errors.email.message}</span>}

                    </div>
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Contraseña Actual</span>
                    </div>
                    <input
                        type="password"
                        id="password"
                        {...register('password')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <div className="label">
                        {errors.password && <span className="text-red-500 label-text-alt">{errors.password.message}</span>}

                    </div>
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nueva Contraseña</span>
                    </div>
                    <input
                        type="password"
                        id="newPassword"
                        {...register('newPassword')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <div className="label">
                        {errors.newPassword && <span className="text-red-500 label-text-alt">{errors.newPassword.message}</span>}

                    </div>
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nueva Contraseña</span>
                    </div>
                    <input
                        type="password"
                        id="newPassword"
                        {...register('newPassword')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <div className="label">
                        {errors.newPassword && <span className="text-red-500 label-text-alt">{errors.newPassword.message}</span>}

                    </div>
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Usuario</span>
                    </div>
                    <select className="select select-bordered" id="role" {...register('role')}>
                        <option>USER</option>
                        <option>ADMIN</option>
                    </select>
                    <div className="label">
                        {errors.role && <span className="text-red-500 label-text-alt">{errors.role.message}</span>}
                    </div>
                </label>

                <div className="form-control">
                    <label className="cursor-pointer label">
                        <span className="label-text">Two-Factor Authentication</span>
                        <input type="checkbox" className="toggle toggle-success" id="isTwoFactorEnabled" {...register('isTwoFactorEnabled')}/>
                    </label>
                </div>



                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 mt-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Update Settings
                </button>
            </form>
        </div>
    );
};

export default Settings;
