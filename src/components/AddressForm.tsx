"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { AddressData } from "@/interfaces/address.interface";
import { getRegiones } from "@/actions/address/get-regiones";
import { getCiudadesByRegionId } from "@/actions/address/get-ciudad-by-region";
import { saveAddress } from "@/actions/address/save-addres";
import { Title } from "./Title";
import { showToast } from "./Toast";

// Definir el esquema de validación con Zod
const schema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    region: z.string().min(1, "La región es requerida"),
    comuna: z.string().min(1, "La comuna es requerida"),
    postal: z.string().min(1, "El codigo postal es requerido"),
    direccion: z.string().min(1, "La dirección es requerida"),
});

interface Ciudad {
    id: string;
    name: string;
}


// Define el tipo para los datos del formulario
type FormValues = z.infer<typeof schema>;

export const AddressForm = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue, // Obtén setValue del hook useForm
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema), // Utiliza el resolver de Zod
    });

    const [loading, setLoading] = useState(false);
    // Define estados para almacenar regiones, ciudades y la región seleccionada
    const [regiones, setRegiones] = useState<{ id: string; name: string }[]>([]);
    const [ciudades, setCiudades] = useState<Ciudad[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<string>("");

    // Hook useEffect para cargar las regiones al cargar el componente
    useEffect(() => {
        const fetchRegiones = async () => {
            try {
                const data = await getRegiones(); // Obtiene las regiones desde el server action
                setRegiones(data); // Actualiza el estado de regiones con los datos obtenidos
                console.log({ data });

            } catch (error) {
                console.error("Error al obtener las regiones:", error);
            }
        };

        fetchRegiones(); // Llama a la función para obtener las regiones al cargar el componente
    }, []);



    // Función para obtener las ciudades de una región
    const fetchCiudades = async (regionId: string) => {
        try {
            // Obtener las ciudades correspondientes
            const data: Ciudad[] = await getCiudadesByRegionId(regionId);

            // Actualizar el estado con los datos obtenidos
            setCiudades(data);
        } catch (error) {
            console.error('Error al obtener las ciudades:', error);
        }
    };

    // Manejador de eventos para cuando se selecciona una región
    const handleRegionChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const regionId = e.target.value; // Obtiene el ID de la región seleccionada
        setSelectedRegion(regionId); // Actualiza el estado de la región seleccionada
        if (regionId) {
            // Llama a la función para obtener las ciudades de la región seleccionada
            await fetchCiudades(regionId);
            // Actualiza manualmente el valor del campo "region" en el formulario
            setValue("region", regionId);
        } else {
            setCiudades([]); // Si no se selecciona ninguna región, vacía la lista de ciudades
        }
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            setLoading(true);
            // Lógica para enviar el formulario

            // Agregar session.user.id a los datos
            const addressData: AddressData = {
                userId: session?.user.id as string,
                name: data.name,
                regionId: data.region,
                cityId: data.comuna,
                postalCode: data.postal,
                address: data.direccion,
            };

            const resp = await saveAddress(addressData);
            console.log(resp);
            if (resp.status) {
                // toast.success(resp.message);
                showToast("success",<p>{resp.message}</p>)
                router.push("/checkout/address");
            }
        } catch (error) {
            setLoading(false);
            console.error("Network Error:", error);
            // toast.error("Its seems something is wrong with your Network");
            showToast("error",<p>Its seems something is wrong with your Network</p>)
        }
    };

    return (
        <div className="w-full  xl:w-[1000px] px-10 pb-10 mx-auto bg-white sm:p-16">
            <Title title="Dirección de entrega" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Nombre Dirección
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Casa Nueva"
                        {...register("name")}
                    />
                    <div className="inset-y-0 right-0 flex items-center pr-3">
                        {errors.name && (
                            <span className="text-red-500 text-xs">{errors.name.message}</span>
                        )}
                    </div>
                </div>
                <div className="grid gap-6 mb-6 lg:grid-cols-3">
                    <div>
                        <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Región
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            id="region"
                            value={selectedRegion} // Establece el valor seleccionado como la región actual
                            onChange={handleRegionChange} // Maneja el cambio de región
                        >
                            <option value="">[ Seleccione ]</option>
                            {/* Mapea las regiones para generar opciones en el select */}
                            {regiones.map((region) => (
                                <option key={region.id} value={region.id}>
                                    {region.name}
                                </option>
                            ))}
                        </select>
                        <div className="inset-y-0 right-0 flex items-center pr-3">
                            {errors.region && (
                                // <span className="text-red-500 text-xs">{errors.region.message}</span>
                                <span className="text-red-500 text-xs">La región es requerida.</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="last_name"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Comuna
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            id="comuna"
                            {...register("comuna")} // Registro del campo comuna
                        >
                            <option value="">[ Seleccione ]</option>
                            {/* Mapea las ciudades para generar opciones en el select */}
                            {ciudades.map((ciudad) => (
                                <option key={ciudad.id} value={ciudad.id}>
                                    {ciudad.name}
                                </option>
                            ))}
                        </select>
                        <div className="inset-y-0 right-0 flex items-center pr-3">
                            {errors.comuna && (
                                <span className="text-red-500 text-xs">{errors.comuna.message}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="postal"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Codigo Postal
                        </label>
                        <input
                            type="text"
                            id="postal"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="4569843"
                            {...register("postal")}
                        />
                        <div className="inset-y-0 right-0 flex items-center pr-3">
                            {errors.postal && (
                                <span className="text-red-500 text-xs">{errors.postal.message}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="direccion"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Direccion ( Calle y N°)
                    </label>
                    <input
                        type="text"
                        id="direccion"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Las Acacias 3"
                        {...register("direccion")}
                    />
                    <div className="inset-y-0 right-0 flex items-center pr-3">
                        {errors.direccion && (
                            <span className="text-red-500 text-xs">{errors.direccion.message}</span>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="comentario"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Comentarios
                    </label>
                    <textarea
                        id="comentario"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Casa porton blanco..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};
