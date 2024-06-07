import { AddressForm } from "@/components/AddressForm";

export default function NewAddressPage() {
    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72  sm:px-10">



            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">


                <AddressForm />

            </div>



        </div>
    );
}