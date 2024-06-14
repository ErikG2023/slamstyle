'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Result = () => {
    const [transactionResult, setTransactionResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTransactionResult = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token_ws');

            if (token) {
                try {
                    const response = await axios.post('/api/webpay/getTransactionResult', { token });
                    const { responseData, updateResult } = response.data;
                    console.log("********************************");

                    console.log(updateResult);

                    if (responseData.response_code === 0) {
                        setTransactionResult('Pago aceptado');
                    } else {
                        setTransactionResult('Pago rechazado');
                    }

                    console.log('Update result:', updateResult);
                } catch (error) {
                    console.error('Error fetching transaction result:', error);
                    setTransactionResult('Error al verificar la transacción');
                } finally {
                    setLoading(false);
                }
            } else {
                setTransactionResult('No se encontró el token de la transacción');
                setLoading(false);
            }
        };

        getTransactionResult();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
                <h1 className="mb-4 text-2xl font-bold">Resultado de la Transacción</h1>
                {loading ? (
                    <>
                        <span className="loading loading-spinner loading-lg"></span>
                        <p>Verificando transacción...</p>
                    </>
                ) : (
                    <p>{transactionResult}</p>
                )}
            </div>
        </div>
    );
};

export default Result;
