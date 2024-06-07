// store/zustand.ts
import { create } from "zustand";
import { AddressWithCityAndRegion } from "@/interfaces/address.interface";

// Define el tipo para el estado del store
interface AddressStore {
    selectedAddress: AddressWithCityAndRegion | null;
    setSelectedAddress: (address: AddressWithCityAndRegion | null) => void;
    clearLocalStorage: () => void; // Nueva función para borrar el almacenamiento local
}

// Crea el store
export const useAddressStore = create<AddressStore>((set) => {
    // Intenta obtener el valor de 'selectedAddress' de localStorage
    let initialSelectedAddress = null;
    if (typeof localStorage !== 'undefined') {
        try {
            initialSelectedAddress = JSON.parse(localStorage.getItem('selectedAddress') || 'null');
        } catch (error) {
            console.error('Error al obtener selectedAddress de localStorage:', error);
        }
    }

    return {
        selectedAddress: initialSelectedAddress,
        setSelectedAddress: (address) => {
            set({ selectedAddress: address });
            if (typeof localStorage !== 'undefined') {
                try {
                    localStorage.setItem('selectedAddress', JSON.stringify(address));
                } catch (error) {
                    console.error('Error al guardar selectedAddress en localStorage:', error);
                }
            }
        },
        clearLocalStorage: () => {
            if (typeof localStorage !== 'undefined') {
                try {
                    localStorage.removeItem('selectedAddress');
                } catch (error) {
                    console.error('Error al borrar selectedAddress de localStorage:', error);
                }
            }
        },
    };
});
