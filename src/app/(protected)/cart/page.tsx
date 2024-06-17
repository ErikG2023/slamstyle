import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { Title } from "@/components/Title";

export default function CartPage() {

    // redirect('/empty');

    return (
        <div className="flex justify-center items-center mb-72 md:px-10 px-2">

            <div className="flex flex-col w-[1000px]">
                <Title title="Carrito" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* CARRITO */}
                    <div className="flex flex-col">
                        {/* <span className="text-xl mb-4">Agregar mas items</span> */}
                        <Link href="/" className="btn mb-7" >
                            Agregar mas Productos
                        </Link>

                        {/* ITEMS */}

                        <ProductsInCart />

                    </div>

                    {/* RESUMEN ORDEN */}

                    <div className=" rounded-xl md:p-7 h-fit">
                        <h2 className="text-2xl mb-2">Resumen pedido</h2>

                        <OrderSummary />

                        <div className="hidden md:flex mt-5 mb-2 md:w-full">
                            <Link href="/checkout/address" className="btn  border-none rounded-md bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase w-full">
                                Continuar
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="fixed bottom-0 left-0 right-0 md:hidden">
                                <Link href="/checkout/address" className="btn  border-none rounded-none bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase w-full">
                                    Continuar
                                </Link>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
}