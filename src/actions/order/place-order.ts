"use server";

import { Size } from "@/interfaces";
import { AddressData } from "@/interfaces/address.interface";
import prisma from "@/lib/db";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (
    productIds: ProductToOrder[],
    userId: string,
    addressId: string | undefined
) => {
    try {
        // console.log({productIds,userId,addressId});

        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds.map((product) => product.productId),
                },
            },
        });

        //calcular montos
        const itemsInOrder = productIds.reduce(
            (count, product) => count + product.quantity,
            0
        );

        //totales de iva, subtotal y total

        const { subtotal, iva, total } = productIds.reduce(
            (totals, item) => {
                const productQuantity = item.quantity;
                const product = products.find(
                    (product) => product.id === item.productId
                );

                if (!product) throw new Error(`${item.productId} no existe - 500`);

                const subtotal = product.price * productQuantity;

                totals.subtotal += subtotal;
                totals.iva += subtotal * 0.19;
                totals.total += subtotal * 1.19;

                return totals;
            },
            { subtotal: 0, iva: 0, total: 0 }
        );

        //crear la transaccion de la bd

        const prismaTx = await prisma.$transaction(async (tx) => {
            // 1 ACTUALIZAR EL STOCK DE LOS PRODUCTOS

            const updatedProductsPromises = products.map( async(product)=>{

                const productQuantity = productIds.filter(
                    (p) => p.productId === product.id
                ).reduce((acc,item) => item.quantity + acc , 0);

                if (productQuantity === 0) {
                    throw new Error(`${product.id} no tiene cantidad definida`);
                }

                return tx.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            });

            const updateProducts = await Promise.all( updatedProductsPromises );

            // VARIFICAR VALORES NEGATIVOS = NO HAY STOCK
            updateProducts.forEach( product => {
                if (product.inStock < 0) {
                    throw new Error(`${ product.title } no tiene stock suficiente.`);
                }
            })


            // 2 CREAR LA ORDEN - ENCABEZADO - DETALLES

            if (addressId) {
                const order = await tx.order.create({
                    data: {
                        userId: userId,
                        itemsInOrder: itemsInOrder,
                        subTotal: subtotal,
                        iva: iva,
                        total: total,
                        addressId: addressId,

                        OrderItem: {
                            createMany: {
                                data: productIds.map(p => ({
                                    quantity:p.quantity,
                                    size:p.size,
                                    productId:p.productId,
                                    price: products.find(product => product.id === p.productId)?.price ?? 0,
                                }))
                            },
                        },
                    },
                });

                return {
                    orden: order,
                    updatedProducts: updateProducts,
                };
            } else {
                throw new Error("No se proporcionó un addressId válido.");
            }
        });

        return {
            ok:true,
            orden: prismaTx.orden,
            prismaTx: prismaTx,
        }

    } catch (error:any) { 

        return {
            ok:false,
            message: error?.message,
        }
    }
};
