"use client"

import { useCartStore } from "@/store/cart-store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react"


export const OrderSummaryCheck = () => {
    const [loaded, setloaded] = useState(false);
    const {itemsInCart,iva,subTotal,total} = useCartStore(state => state.getSumaryInformation())

    useEffect(() => {
        setloaded(true);
    }, []);

    if (!loaded) return <p>Loading...</p>;

    return (
        <div className="grid grid-cols-2">

            <span>N° Productos</span>
            <span className="text-right">{itemsInCart === 1 ? '1 articulo.' : `${itemsInCart} articulos.`}</span>

            <span>Subtotal</span>
            <span className="text-right"> {currencyFormat(subTotal)}</span>

            <span>Iva (19%)</span>
            <span className="text-right">{currencyFormat(iva)}</span>

            <span className="text-2xl mt-5">Total:</span>
            <span className="mt-5 text-2xl text-right"> {currencyFormat(total)}</span>

        </div>
    )
}
