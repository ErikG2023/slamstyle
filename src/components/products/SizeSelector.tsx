import type { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];

    onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {
    return (
        <div className="">
            <small className="uppercase">Tallas disponibles</small>

            <div className="flex flex-wrap md:flex-nowrap gap-1 mb-4 mt-2">
                {availableSizes.map(size => (
                    <button
                        key={size}
                        onClick={() => onSizeChanged(size)}
                        className={clsx(
                            'grid place-items-center border px-3 py-2 hover:bg-indigo-500 hover:text-white focus:outline-none transition-all duration-300',
                            {
                                "bg-indigo-500 text-white": size === selectedSize,
                                "": size !== selectedSize,
                            }
                        )}>
                        <small>{size}</small>
                    </button>
                ))}
            </div>
        </div>
    )
}
