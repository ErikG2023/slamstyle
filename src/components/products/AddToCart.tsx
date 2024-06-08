"use client"
import { CartProduct, ProductInterface, Size } from "@/interfaces";
import { SizeSelector } from "./SizeSelector";
import { useState } from "react";
import { QuantitySelector } from "./QuantitySelector";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/cart-store";

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
            toast.error("Para agregar seleccione una talla", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
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
        toast.success("Añadido al carrito", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    };
    return (
        <>
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setsize}
            />

            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setquantity}
            />

            <small className="text-black mb-16">{product.description}</small>

            <div className="relative">
                <div className="flex gap-0.5 mt-8 md:mt-0 hidden md:flex">
                    <button onClick={addToCart} className="btn border-none rounded-none bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase w-full md:max-w-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        Agregar al carrito
                    </button>
                </div>
                <div className="fixed bottom-0 left-0 right-0 md:hidden">
                    <button onClick={addToCart} className="btn border-none rounded-none bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </>
    )
}