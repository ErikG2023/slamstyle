
export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { Pagination } from "@/components/Pagination";
import { Title } from "@/components/Title";
import { ProductGrid } from "@/components/products/ProductGrid";
import ResponsiveImage from "@/components/products/ResponsiveImage ";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({ page });

  const images = [
    { src: '/banner/1.jpg', alt: 'Descripción de la imagen 1' },
    { src: '/banner/2.jpg', alt: 'Descripción de la imagen 2' },
    { src: '/banner/3.jpg', alt: 'Descripción de la imagen 3' },
    { src: '/banner/4.jpg', alt: 'Descripción de la imagen 4' },
  ];



  if (products.length === 0) {
    redirect('/')
  }


  return (
    <>
      <ResponsiveImage images={images} autoplayInterval={3000} />
      <Title title="Tienda" subtitle="Todos los productos" classname="mb-2" />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
