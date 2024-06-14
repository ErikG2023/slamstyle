"use server"
import prisma from "@/lib/db";

export const updatePayOrderById = async (id: string, isPaid: boolean) => {
    try {
        const updateData: { isPaid: boolean; paidAt?: Date } = { isPaid };

        if (isPaid) {
            updateData.paidAt = new Date();
        } 
        // else {
        //     updateData.paidAt = null;
        // }

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: updateData,
        });

        return {
            ok: true,
            order: updatedOrder,
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error al actualizar el estado de pago del pedido",
        };
    }
};
