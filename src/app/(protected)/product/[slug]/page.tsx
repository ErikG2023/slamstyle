export const revalidate = 604800;

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { ThumbsGallery } from "@/components/products/ThumbsGallery";
import { StockLabel } from "@/components/products/StockLabel";
import { AddToCart } from "@/components/products/AddToCart";

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug;

    // fetch data
    const product = await getProductBySlug(slug);


    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            images: [`/producs/${product?.images[1]}`],
        },
    }
}


interface Props {
    params: {
        slug: string;
    }
}
export default async function ProductPage({ params }: Props) {

    const { slug } = params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <>
            <main className="grid place-items-center bg-gray-100 lg:px-10 2xl:px-36">
                <section className="flex flex-col md:flex-row gap-11 py-10">
                    <div className="text-indigo-500 flex flex-col justify-between">
                        <ThumbsGallery images={product.images} />
                    </div>
                    <div className="text-indigo-500 flex flex-col px-5 md:px-1">
                        <small className="uppercase"><StockLabel slug={product.slug} /></small>
                        <h3 className="uppercase text-black text-2xl font-medium">{product.title}</h3>
                        <h3 className="text-2xl font-semibold mb-7">${product.price}</h3>
                        
                        <AddToCart product={product} />
                    </div>
                </section>
            </main>

        </>
    );
}