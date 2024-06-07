"use server";

import prisma from "@/lib/db";


export const getRegiones = async () => {
    try {
        const regiones = await prisma.region.findMany({
            select: {
                id: true,
                name: true
            }
        });
        
        return regiones;

    } catch (error) {
        console.error("Error al obtener las regiones:", error);
        throw new Error("Error al obtener las regiones");
    } finally {
        await prisma.$disconnect();
    }
};
