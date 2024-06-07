import { ProductInterface } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem";

interface Props{
    products : ProductInterface[];
}

export const ProductGrid = ({products}:Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 mb-10 md:px-4">
            {
                products.map(product =>(
                    <ProductGridItem key={product.slug} product={product} />
                ))
            }

        </div>
    )
}
