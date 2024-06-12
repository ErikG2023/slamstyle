
"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";

export const NavbarComponent = () => {
    const { status } = useSession();
    const user = useCurrentUser();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const { itemsInCart, iva, subTotal, total } = useCartStore(state => state.getSumaryInformation())

    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        setLoaded(true)
    }, [])

    const onClick = async () => {
        await logout();
        // router.push("/")
        // router.refresh;
        window.location.href = "/";
    };



    return (
        <div className="navbar bg-base-100">
            {/* MOVIL */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="/gender/men">Hombres</Link></li>
                        <li><Link href="/gender/women">Mujeres</Link></li>
                        <li><Link href="/gender/kid">Niños</Link></li>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-xl">SlamStyle</Link>
            </div>
            {/* DESKTOP */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/gender/men">Hombres</Link></li>
                    <li><Link href="/gender/women">Mujeres</Link></li>
                    <li><Link href="/gender/kid">Niños</Link></li>
                    {/* <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li> */}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex-none">

                    {/* ICONO CARRITO */}
                    <div className="dropdown dropdown-end" onClick={toggleDropdown}>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            {loaded && (
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="badge badge-info badge-sm indicator-item text-white">{totalItemsInCart === 0 ? '0' : `${totalItemsInCart}`}</span>
                                </div>
                            )}
                        </div>
                        {loaded && totalItemsInCart > 0 && isDropdownOpen && (
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body">
                                    <span className="font-bold text-lg">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>
                                    <span className="text-info">Subtotal: ${subTotal}</span>
                                    <div className="card-actions">
                                        <Link href="/cart">
                                            <button className="btn btn-sm bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white w-full" onClick={closeDropdown}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                Ver Carrito
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="top-2 btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <div className="flex flex-col items-center justify-center py-2">
                                {
                                    status === "loading" && (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="skeleton h-4 w-36"></div>
                                            <div className="skeleton h-4 w-36"></div>
                                        </div>
                                    )
                                }

                                {
                                    status === "authenticated" && (
                                        <div className="">
                                            <p className="text-sm text-center font-bold">{user?.name}</p>
                                            <p className="text-sm font-light">{user?.email}</p>
                                        </div>
                                    )
                                }

                            </div>
                            {
                                status === "authenticated" && (
                                    <>
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </a>
                                        </li>
                                        <li>
                                            <Link href="/orders">ordenes</Link>
                                        </li>
                                        <li>
                                            <a onClick={onClick} className="justify-between">
                                                Logout
                                                <span ><MdLogout /></span>
                                            </a>
                                        </li>
                                    </>
                                )
                            }

                            {
                                status === "unauthenticated" && (
                                    <>
                                        <li>
                                            <Link href="/auth/login" className="justify-between">
                                                Login
                                                <span ><MdLogout /></span>
                                            </Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
