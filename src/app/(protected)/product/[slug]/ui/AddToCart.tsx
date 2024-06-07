"use client";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { SizeSelector } from "@/components/products/SizeSelector";
import type { CartProduct, ProductInterface, Size } from "@/interfaces";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
    product: ProductInterface;
}

export const AddToCart = ({ product }: Props) => {
    const addProductToCart = useCartStore(state => state.addProductToCart)

    const [size, setsize] = useState<Size | undefined>();
    const [quantity, setquantity] = useState<number>(1);
    const [posted, setposted] = useState(false)

    const addToCart = () => {
        setposted(true);
        if (!size) {
            toast.error("Para agregar seleccione una talla");
            return;
        }

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }
        addProductToCart(cartProduct);
        setposted(false);
        setquantity(1);
        setsize(undefined);
        toast.success("Añadido al carrito");

    };

    return (
        <div>
            {/* {
                posted && !size && (
                    <span className="mt-2 text-sm text-red-500 fade-in">Seleccione una talla</span>

                )
            } */}

            {/* SELECTOR TALLAS */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setsize}
            />

            {/* SELECTOR CANTIDAD */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setquantity}
            />

            {/* BOTON */}
            <button onClick={addToCart} className="btn-primary my-5">Agregar al carrito</button>
        </div>
    );
};
