// Server Action
"use server";

import { AddressData } from "@/interfaces/address.interface";
import prisma from "@/lib/db";



export const saveAddress = async (data: AddressData) => {
    try {
        // Verifica que el userId exista en la tabla User
        const user = await prisma.user.findUnique({
            where: {
                id: data.userId,
            },
        });

        if (!user) {
            throw new Error(`El usuario con el ID ${data.userId} no existe`);
        }

        // Crea la dirección utilizando los datos proporcionados
        const address = await prisma.address.create({
            data: {
                name: data.name,
                address: data.address,
                postalCode: data.postalCode,
                cityId: data.cityId,
                regionId: data.regionId,
                userId: data.userId,
            },
        });

        return {
            status: true,
            message: "Dirección guardada correctamente",
            address,
        };
    } catch (error) {
        console.error("Error al guardar la dirección:", error);
        throw new Error("Error al guardar la dirección");
    } finally {
        await prisma.$disconnect();
    }
};
