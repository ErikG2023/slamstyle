import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { Title } from "@/components/Title";



export default function CartPage() {

    // redirect('/empty');

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">
                <Title title="Carrito" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* CARRITO */}
                    <div className="flex flex-col">
                        {/* <span className="text-xl mb-4">Agregar mas items</span> */}
                        <Link href="/" className="btn  mb-5" >
                        Agregar mas Productos
                        </Link>

                        {/* ITEMS */}

                        <ProductsInCart />
                        
                    </div>

                    {/* RESUMEN ORDEN */}

                    <div className=" rounded-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Resumen pedido</h2>

                        <OrderSummary />

                        <div className="mt-5 mb-2 w-full">
                            <Link href="/checkout/address" className="flex btn btn-primary justify-center">
                                Continuar
                            </Link>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
}