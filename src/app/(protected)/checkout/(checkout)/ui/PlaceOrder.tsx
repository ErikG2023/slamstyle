"use client"
import { OrderSummaryCheck } from "./OrderSummary";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAddressStore } from "@/store/address-store";
import { useCartStore } from "@/store/cart-store";
import { placeOrder } from "@/actions/order/place-order";

export const PlaceOrder = () => {
    const router = useRouter();
    // Obtenemos el valor de selectedAddress utilizando useAddressStore
    const selectedAddress = useAddressStore((state) => state.selectedAddress);
    const clearLocalStorage = useAddressStore(state => state.clearLocalStorage);
    const [loaded, setloaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const { data: session } = useSession();

    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);

    useEffect(() => {
        setloaded(true)
    }, []);

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true);

        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }))

        // SERVER ACTION
        const userId = session?.user.id;
        const addresId = selectedAddress?.id;

        console.log({ productsToOrder, userId, addresId });


        const res = await placeOrder(productsToOrder, userId as string, addresId);

        console.log({ res });

        if (!res.ok) {
            // toast.error(res.message);
            setIsPlacingOrder(false)
            return;
        }

        // toast.success("Pedido realizado con exito");
        clearCart();
        // borrar addressStore
        useAddressStore.setState({ selectedAddress: null });
        clearLocalStorage();

        router.replace('orders/' + res.orden?.id);


    }

    if (!loaded) {
        return <p>Cargando...</p>
    }
    return (
        <div>
            <div className="p-7">
                <h2 className="text-2xl mb-2">Direccion de entrega</h2>
                {selectedAddress && (
                    <div className="mb-10">
                        <p>{selectedAddress.region.name}</p>
                        <p>{selectedAddress.city.name}</p>
                        <p>{selectedAddress.address}</p>
                    </div>
                )}

                <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                <h2 className="text-2xl mb-2">Resumen pedido</h2>

                <OrderSummaryCheck />

                <div className="relative">
                    <div className="gap-0.5 mt-8 md:mt-8 hidden md:flex">
                        <button onClick={onPlaceOrder} className={clsx(
                            {
                                'btn border-none rounded-md bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase w-full md:max-w-md': !isPlacingOrder,
                                'btn btn-disabled w-full': isPlacingOrder,
                            }
                        )}>
                            Finalizar Pedido
                        </button>
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 md:hidden">
                        <button onClick={onPlaceOrder} className="btn  border-none rounded-none bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase w-full">
                            Finalizar Pedido
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
