"use server";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { log } from "console";

export async function POST(req: NextRequest) {
    const { amount, returnUrl, buyOrder, sessionId } = await req.json();


    try {
        const response = await axios.post(
            "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions",
            {
                buy_order: buyOrder,
                session_id: sessionId,
                amount: amount,
                return_url: returnUrl,
            },
            {
                headers: {
                    "Tbk-Api-Key-Id": process.env.WEBPAY_COMMERCE_CODE,
                    "Tbk-Api-Key-Secret": process.env.WEBPAY_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        const { token, url } = response.data;
        
        

        return NextResponse.json({ token, url });
    } catch (error) {
        return NextResponse.json(
            { error: "Error initiating transaction" },
            { status: 500 }
        );
    }
}
