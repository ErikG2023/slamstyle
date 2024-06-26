"use server";

import prisma from "@/lib/db";
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
    page = 1,
    take = 15,
    gender,
}: PaginationOptions) => {
    if (isNaN(Number(page))) page = 1;

    if (page < 1) page = 1;

    try {
        // OBTENER PRODUCTOS
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    },
                },
            },
            where: {
                gender: gender,
            },
        });

        // OBTENER EL TOTAL DE PAGINAS
        const totalCount = await prisma.product.count({
            where: {
                gender: gender,
            },
        });
        const totalPages = Math.ceil(totalCount / take);

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map((product) => ({
                ...product,
                images: product.ProductImage.map((image) => image.url),
            })),
        };
    } catch (error) {
        throw new Error("No se pudo cargar los productos");
    }
};
