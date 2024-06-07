import { initialData } from "./seed";
import prisma from "../lib/db";

async function main() {
    // BORRAR REGISTROS PREVIOS

    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.address.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.city.deleteMany();
    await prisma.region.deleteMany();

    const { categories, products, regiones } = initialData;
    // Insertar regiones y ciudades
    for (const regionData of regiones) {
        const { name: regionName, cities } = regionData;
        const createdRegion = await prisma.region.create({
            data: { name: regionName },
        });

        const citiesData = cities.map((cityName) => ({
            name: cityName,
            regionId: createdRegion.id,
        }));
        await prisma.city.createMany({
            data: citiesData,
        });
    }

    // CATEGORIAS
    const categoriesData = categories.map((category) => ({
        name: category,
    }));

    await prisma.category.createMany({
        data: categoriesData,
    });

    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLocaleLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);

    // PRODUCTOS

    products.forEach(async (product) => {
        const { type, images, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type],
            },
        });

        // IMAGES

        const imagesData = images.map((image) => ({
            url: image,
            productId: dbProduct.id,
        }));

        await prisma.productImage.createMany({
            data: imagesData,
        });
    });

    console.log("Seed ejecutado");
}

(() => {
    // if (process.env.NODE_ENV === 'production') return;

    main();
})();
