"use client"

import { getStockBySlug } from '@/actions/products/get-stock-by-slug';
import { titleFont } from '@/config/fonts'
import { useEffect, useState } from 'react';

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

    const [Stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getStock();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getStock = async () => {
        const inStock = await getStockBySlug(slug);
        setStock(inStock);
        setIsLoading(false);

    }
    return (
        <div>
            {
                isLoading
                    ?
                    (
                        <h1 className={`${titleFont.className} antialiased font-bold text-md bg-gray-200 animate-pulse`}>
                            &nbsp;
                        </h1>

                    ) : (
                        <h1 className={`${titleFont.className} antialiased font-bold text-md`}>
                            Stock: {Stock}
                        </h1>
                    )
            }




        </div>
    )
}
