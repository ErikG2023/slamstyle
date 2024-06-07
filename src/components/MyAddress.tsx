"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AddressWithCityAndRegion } from "@/interfaces/address.interface";
import { getAddressByUser } from "@/actions/address/get-addres-by-user";
import clsx from "clsx";
import { IoAddCircle, IoCheckmarkCircleSharp, IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAddressStore } from "@/store/address-store";
import { Title } from "./Title";

export const MyAddress = () => {
    const router = useRouter();
    const [address, setAddress] = useState<AddressWithCityAndRegion[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const { data: session } = useSession();
    const setSelectedAddressZus = useAddressStore((state) => state.setSelectedAddress);

    useEffect(() => {
        const fetchAddresByUser = async () => {
            try {
                const userid = session?.user.id;
                const data = await getAddressByUser(userid as string);
                setAddress(data);
            } catch (error) {
                console.error("Error al obtener las regiones:", error);
            }
        };

        fetchAddresByUser();
    }, [session?.user.id]);

    const handleRadioChange = (id: string) => {
        setSelectedAddress(id);
    };

    const handleContinueClick = () => {
        if (selectedAddress) {
            const addressF = address.find((address) => address.id === selectedAddress);

            if (addressF) {
                setSelectedAddressZus(addressF); // Actualiza el estado en el store de Zustand
                
                router.push("/checkout");
            } else {
                console.error("No se encontró ninguna dirección con el ID seleccionado.");
            }
        }
    };

    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72  sm:px-10">
            <div className="grid grid-cols-1 gap-2 p-4 w-full xl:w-[800px]">
                <Title title="Mis Direcciones" subtitle="Dirección de entrega" />
                <Link href="/checkout/address/new-address" className="group relative py-2 mb-4 w-full sm:w-48 overflow-hidden rounded-lg bg-green-500 text-sm  text-white">
                    <div className="flex justify-center gap-2 items-center">
                        <IoAddCircle size={20} className="ml-1" />
                        <p>Nueva dirección</p>
                    </div>
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                </Link>
                {address.map((item, index) => (
                    <label key={index}>
                        <input type="radio" value={item.id} className="peer hidden" name="direccion" onChange={() => handleRadioChange(item.id)} />
                        <div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500">
                            <div>
                                <div className="flex items-center">
                                    <IoHomeOutline size={15} className="mr-2 mb-1" />
                                    <span className="font-bold text-gray-700 mb-1">{item.name}</span>
                                </div>
                                <p className="ml-1">Direccion: {item.address}</p>
                                <p className="ml-1">Comuna: {item.city.name}</p>
                                <p className="ml-1">Region: {item.region.name}</p>
                            </div>
                            <IoCheckmarkCircleSharp width={9} height={9} className="w-9 h-9 text-blue-600 invisible group-[.peer:checked+&]:visible" />
                        </div>
                    </label>
                ))}
                <button
                    className={clsx("my-5", {
                        "bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded transition-all": selectedAddress,
                        "bg-gray-300  text-white py-2 px-4 rounded transition-all cursor-not-allowed": !selectedAddress,
                    })}
                    disabled={selectedAddress === null}
                    onClick={handleContinueClick}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};
