import { getOrderById } from "@/actions/order/get-order-by-id";
import { Title } from "@/components/Title";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FaRegCreditCard } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";



interface Props {
    params: {
        id: string;
    }
}

export default async function OrderByIdPage({ params }: Props) {
    const { id } = params;

    const { ok, order } = await getOrderById(id);

    if (!ok) {
        redirect("/");
    }
    // console.log(JSON.stringify(order));

    const addres = order!.address;


    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">
                <Title title={`Orden #${id}`} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* CARRITO */}
                    <div className="flex flex-col mt-5">
                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    'bg-red-500': !order?.isPaid,
                                    'bg-green-700': order?.isPaid,
                                }
                            )
                        }>
                            <IoCartOutline size={30} />
                            {/* <span className="mx-2">Pendiente de pago</span> */}
                            <span className="mx-2">{
                                order?.isPaid ? 'Pagada' : 'No Pagada'
                            }</span>
                        </div>

                        {/* ITEMS */}
                        {
                            order?.OrderItem.map(item => (
                                <div key={item.product.slug + '-' + item.size} className="flex mb-5">
                                    <Image
                                        src={`/products/${item.product.ProductImage[0].url}`}
                                        alt={item.product.title}
                                        width={100}
                                        height={100}
                                        className="mr-5 rounded"
                                        style={{
                                            width: '100px',
                                            height: '100px'
                                        }}
                                    />

                                    <div>
                                        <p>{item.product.title}</p>
                                        <p>{item.price} x {item.quantity}</p>
                                        <p>Subtotal : $ {item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* RESUMEN ORDEN */}

                    <div className="bg-white rounded-xl shadow-xl p-7">
                        <h2 className="text-2xl mb-2">Direccion de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">{addres.user.name}</p>
                            <p>{addres.address}</p>
                            <p>{addres.city.name}</p>
                        </div>

                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                        <h2 className="text-2xl mb-2">Resumen pedido</h2>

                        <div className="grid grid-cols-2">

                            <span>N° Productos</span>
                            <span className="text-right">{order?.itemsInOrder === 1 ? "1 artículo" : `${order?.itemsInOrder} artículos`}</span>

                            <span>Subtotal</span>
                            <span className="text-right">$ {order?.subTotal}</span>

                            <span>Iva</span>
                            <span className="text-right">{order?.iva} %</span>


                            <span className="text-xl md:text-2xl mt-5 font-semibold">Total a Pagar:</span>
                            <span className="mt-5 text-xl md:text-2xl text-right font-semibold"> {currencyFormat(order?.total as number)}</span>

                        </div>

                        <div className="mt-5 mb-2 w-full">

                            <button className="btn btn-block btn-accent text-white"><FaRegCreditCard size={15} />Pasarela de pago</button>

                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
}