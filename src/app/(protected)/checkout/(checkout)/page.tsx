"use client"
import { ProductsInCartCheck } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";
import { Title } from "@/components/Title";


export default function CheckoutPage() {

    
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">
                <Title title="Verificar Orden" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* CARRITO */}
                    <div className="flex flex-col mt-5">
                        {/* ITEMS */}
                        <ProductsInCartCheck />
                    </div>

                    {/* RESUMEN ORDEN */}

                    <PlaceOrder />


                </div>
            </div>
        </div>
    );
}