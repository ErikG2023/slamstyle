"use server";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { updatePayOrderById } from "@/actions/order/updatePayOrderById";

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    try {
        const response = await axios.put(
            `https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`,
            {},
            {
                headers: {
                    "Tbk-Api-Key-Id": process.env.WEBPAY_COMMERCE_CODE,
                    "Tbk-Api-Key-Secret": process.env.WEBPAY_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        const pagado = response.data.response_code;
        const idOrder = response.data.buy_order;

        let result = null;
        if (pagado === 0) {
            result = await updatePayOrderById(idOrder,true);
        }

        return NextResponse.json({
            responseData: response.data,
            updateResult: result,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error fetching transaction result" },
            { status: 500 }
        );
    }
}
