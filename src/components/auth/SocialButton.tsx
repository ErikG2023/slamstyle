"use client"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SocialButton = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
const onClick = (providers:"google" | "github") => {
    signIn(providers,{
        callbackUrl:callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
}
    return (
        <>
            <button
                type="button"
                className="flex items-center justify-center w-full px-4 py-2 mt-4 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-5 w-5 mr-2" />
            </button>

            <button
                type="button"
                className="flex items-center justify-center w-full px-4 py-2 mt-4 text-white bg-gray-800 border border-gray-300 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={()=>onClick("github")}
            >
                <FaGithub className="h-5 w-5 mr-2" />
            </button>
        </>
    );
};

export default SocialButton;