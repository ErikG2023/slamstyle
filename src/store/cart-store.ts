import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];

    getTotalItems: () => number;
    getSumaryInformation: () => {
        subTotal: number;
        iva: number;
        total: number;
        itemsInCart: number;
    };

    addProductToCart: (product: CartProduct) => void;
    updateProductToCart: (product: CartProduct, quantity: number) => void;
    removeProductToCart: (product: CartProduct) => void;

    clearCart: () => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            // METHODS

            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            getSumaryInformation: () => {
                const { cart, getTotalItems } = get();
                const subTotal = cart.reduce(
                    (subtotal, product) => product.quantity * product.price + subtotal,
                    0
                );

                const iva = subTotal * 0.19;
                const total = subTotal + iva;
                // const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
                const itemsInCart = getTotalItems();

                return {
                    subTotal,
                    iva,
                    total,
                    itemsInCart,
                };
            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                // REVISAR SI EL PRODUCTO EXISTE EN EL CARRITO CON LA TALLA SELECCIONADA
                const productInCart = cart.some(
                    (item) => item.id === product.id && item.size === product.size
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // EL PRODUCTO YA EXISTE POR TALLA DEBO INCREMENTARLO
                const updateProduct = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity };
                    }

                    return item;
                });

                set({ cart: updateProduct });
            },

            updateProductToCart: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity };
                    }

                    return item;
                });

                set({ cart: updatedCartProducts });
            },

            removeProductToCart: (product: CartProduct) => {
                const { cart } = get();
                const updatedCartProducts = cart.filter(
                    (item) => item.id !== product.id || item.size !== product.size
                );
                set({ cart: updatedCartProducts });
            },

            clearCart: () => {
                set({ cart: [] });
            },
        }),
        {
            name: "shoping-cart",
        }
    )
);
