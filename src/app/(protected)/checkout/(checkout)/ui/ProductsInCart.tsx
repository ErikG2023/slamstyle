"use client"

import { useCartStore } from "@/store/cart-store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductsInCartCheck = () => {
    const [loaded, setloaded] = useState(false);
    const produtsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setloaded(true);

    }, []);

    if (!loaded) {
        return <div className="flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div>
            {
                produtsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image
                            src={`/products/${product.image}`}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="mr-5 rounded"
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                        />

                        <div>
                            <span >
                                {product.title} x {product.quantity}
                            </span>
                            <p className="text-xs">Talla: {product.size}</p>
                            <p className="text-xs">{currencyFormat(product.price * product.quantity)}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
