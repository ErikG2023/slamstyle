
export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { Pagination } from "@/components/Pagination";
import { Title } from "@/components/Title";
import { ProductGrid } from "@/components/products/ProductGrid";
import ResponsiveBannerCarousel from "@/components/products/ResponsiveBannerCarousel";
import ResponsiveCarousel from "@/components/products/ResponsiveCarousel";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({ page });


  if (products.length === 0) {
    redirect('/')
  }


  return (
    <>
    {/* <ResponsiveCarousel /> */}
    <ResponsiveBannerCarousel />
      <Title title="Tienda" subtitle="Todos los productos" classname="mb-2" />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
