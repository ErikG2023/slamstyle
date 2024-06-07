"use server"
import prisma from "@/lib/db";
// import { sleep } from "@/utils";

export const getStockBySlug = async (slug: string): Promise<number> => {
    try {
        // await sleep(3);
        const stock = await prisma.product.findFirst({
            where: {
                slug: slug,
            },
            select:{inStock:true}
        });

        return stock?.inStock ?? 0;
    } catch (error) {
        throw new Error("Error 0");
    }
};
