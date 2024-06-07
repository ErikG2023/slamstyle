"use server";

import prisma from "@/lib/db";


export const getCiudadesByRegionId = async (regionId:string) => {
    try {
        const ciudades = await prisma.city.findMany({
            where: {
                regionId: regionId
            },
            select: {
                id:true,
                name: true
            }
        });
        
        return ciudades;

    } catch (error) {
        console.error("Error al obtener las ciudades:", error);
        throw new Error("Error al obtener las ciudades");
    } finally {
        await prisma.$disconnect();
    }
};
