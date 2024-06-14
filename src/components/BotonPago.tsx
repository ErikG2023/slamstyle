"use client"
import axios from "axios";
import { useState } from "react";
import { FaRegCreditCard } from "react-icons/fa"

interface Props {
    amount: number;
    buy_order: string;
    session_id: string;
}

export const BotonPago = ({ amount, buy_order, session_id }: Props) => {
    const [loading, setLoading] = useState(false);



    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/webpay/initiateTransaction', {
                amount,
                returnUrl: `${window.location.origin}/result`,
                buyOrder: buy_order,
                sessionId: session_id
            });

            const { token, url } = response.data;

            if (url && token) {
                window.location.href = `${url}?token_ws=${token}`;
            }
        } catch (error) {
            console.error('Error initiating transaction:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <button onClick={handlePayment} disabled={loading} className="btn btn-block btn-accent text-white"><FaRegCreditCard size={15} />Pagar</button>
        </>
    )
}