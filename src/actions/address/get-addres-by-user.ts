"use server";

import prisma from "@/lib/db";

export const getAddressByUser = async (userId: string) => {
    try {
        const addresses = await prisma.address.findMany({
            where: {
                userId: userId,
            },
            include: {
                city: {
                    select: {
                        name: true,
                    },
                },
                region: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return addresses;
    } catch (error) {
        console.error("Error al obtener las direcciones:", error);
        throw new Error("Error al obtener las direcciones");
    } finally {
        await prisma.$disconnect();
    }
};
