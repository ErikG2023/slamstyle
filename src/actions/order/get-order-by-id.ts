import prisma from "@/lib/db";

export const getOrderById = async (id: string) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true,
                                    },
                                    take:1
                                },
                            },
                        },
                        
                    },
                },
                address:{
                    select :{
                        address:true,
                        city:true,
                        region:true,
                        name:true,
                        user:{
                            select:{
                                name:true
                            }
                        }
                    }
                }
            },
        });

        if (!order) {
            throw `${id} no existe`;
        }

        return {
            ok: true,
            order: order,
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error al obtener el pedido",
        };
    }
};
