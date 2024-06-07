export const revalidate = 60; 

import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { Pagination } from "@/components/Pagination";
import { Title } from "@/components/Title";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";


interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const { gender } = params;

    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });


    if (products.length === 0) {
        redirect(`/gender/${gender}`);
    }

    const labels: Record<string, string> = {
        'men': 'Hombres',
        'women': 'Mujeres',
        'kid': 'Niños',
        'unisex': 'Todos'
    }
    // if (id === 'kids') {
    //     notFound();
    // }


    return (
        <div>
            <Title title={labels[gender]} subtitle="Categoria" classname="mb-2" />
            <ProductGrid products={products} />
            <Pagination  totalPages={totalPages} />
        </div>
    );
}