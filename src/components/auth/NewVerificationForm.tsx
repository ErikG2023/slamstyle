"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { NewVerification } from '@/actions/new-verification';
import { LuCheckCircle2, LuXCircle } from 'react-icons/lu';
import Link from 'next/link';

const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true); // Estado de carga inicializado en true

    useEffect(() => {
        const verifyToken = async () => {

            if (!token) {
                setError("Missing Token");
                setLoading(false); // Detener carga si falta el token
                return;
            }

            try {
                const data = await NewVerification(token);
                console.log("Verification response:", data);
                setSuccess(data.success);
                setError(data.error);
            } catch (err) {
                console.log("Error during verification");
                setError("Something went wrong");
            } finally {
                console.log("Verification completed");
                setLoading(false); // Detener carga al completar la acción
            }
        };

        verifyToken();
    }, [token]); // Ejecutar solo una vez al montar el componente

    return (
        <div className="flex-1">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700">Template</h2>
                <p className="mt-3 text-gray-500 dark:text-gray-300">Confirm your verification</p>
            </div>

            <div className="mt-8 text-center">
                {loading && (
                    <div className="text-gray-500 dark:text-gray-300">Cargando...</div>
                )}

                {!loading && success && (
                    <>
                        <div className="flex items-center justify-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                            <LuCheckCircle2 size={20} className="mr-2" /> {success}
                        </div>
                        <div className="mt-8 text-center">
                            <Link href="/auth/login" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Login
                            </Link>
                        </div>
                    </>
                )}

                {!loading && error && (
                    <>
                        <div className="flex items-center justify-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                            <LuXCircle size={20} className="mr-2" /> {error}
                        </div>
                        <div className="mt-8 text-center">
                            <Link href="/auth/login" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Login
                            </Link>
                        </div>
                    </>
                )}
            </div>


        </div>
    );
};

export default NewVerificationForm;
