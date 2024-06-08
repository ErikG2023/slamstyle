"use client"

import { useCartStore } from "@/store/cart-store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react"


export const OrderSummary = () => {
    const [loaded, setloaded] = useState(false);
    const { itemsInCart, iva, subTotal, total } = useCartStore(state => state.getSumaryInformation())

    useEffect(() => {
        setloaded(true);
    }, []);

    if (!loaded) return <div className="flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="grid grid-cols-2">

            <span>N° Productos</span>
            <span className="text-right">{itemsInCart === 1 ? '1 articulo' : `${itemsInCart} articulos`}</span>

            <span>Subtotal</span>
            <span className="text-right"> {currencyFormat(subTotal)}</span>

            <span>Iva (19%)</span>
            <span className="text-right">{currencyFormat(iva)}</span>

            <span className="text-md md:text-2xl mt-5 font-semibold">Total a Pagar:</span>
            <span className="mt-5 text-md md:text-2xl text-right font-semibold"> {currencyFormat(total)}</span>

        </div>
    )
}
