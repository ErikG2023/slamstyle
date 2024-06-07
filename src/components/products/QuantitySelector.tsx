"use client"
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({quantity, onQuantityChanged}:Props) => {

const onValueChanged = ( value: number) =>{
    if (quantity + value < 1) {
        return
    }
    else{
        onQuantityChanged(quantity + value);
    }

}

    return (
        <div className="flex my-3">
            <button onClick={() => onValueChanged(-1)}>
                <IoRemoveOutline size={20} />
            </button>

            <span className="w-16 mx-3 py-1 rounded-xl bg-gray-200/60 text-center">{quantity}</span>

            <button onClick={() => onValueChanged(+1)}>
                <IoAddOutline size={20} />
            </button>
        </div>
    )
}
