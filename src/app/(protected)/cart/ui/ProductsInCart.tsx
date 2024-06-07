"use client"

import { QuantitySelector } from "@/components/products/QuantitySelector";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export const ProductsInCart = () => {
    const [loaded, setloaded] = useState(false);
    const UpdateQuantityProduct = useCartStore(state => state.updateProductToCart);
    const RemoveProduct = useCartStore(state => state.removeProductToCart);
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
                            <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer" >
                                {product.title}
                            </Link>
                            <p className="text-xs">Talla: {product.size}</p>
                            <p className="text-xs">$ {product.price}</p>
                            <div className="flex gap-4">
                                <QuantitySelector quantity={product.quantity} onQuantityChanged={(quantity) => UpdateQuantityProduct(product, quantity)} />
                                <button
                                    onClick={() => RemoveProduct(product)}
                                >
                                    <FaTrash size={15} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
