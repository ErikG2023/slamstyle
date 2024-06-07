import { Children } from "react";

export default function Layout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="flex justify-center h-screen">
                <div className="hidden bg-black lg:block lg:w-2/3">
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <h2 className="text-4xl font-bold text-white">Slam Style</h2>
                            <p className="max-w-xl mt-3 text-gray-300">
                                Descubre el tiempo en su forma mas elegante
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-3/6">
                    {children}
                </div>
            </div>
        </div>
    );
}