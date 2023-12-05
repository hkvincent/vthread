import Link from 'next/link';
import React from 'react';
import { Button } from "@/components/ui/button"

const SignInUp = () => {
    return (
        <div className="flex flex-row justify-between items-center ">
            <div>
                <Link
                    href="/signin"
                    className="dark:bg-slate-900 bg-slate-400 p-3  rounded-lg block"
                >
                    Sign In
                </Link>
            </div>
            <div>
                <Link
                    href="/signup"
                    className="dark:bg-slate-900 bg-slate-400 p-3 rounded-lg block"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};


export function SignInUpV0() {
    return (
        <div className="flex justify-center space-x-4">
            <Button className="transition-colors duration-200 hover:bg-blue-700" variant="outline">
                <Link href="/signin">Login</Link>
            </Button>
            <Button className="transition-colors duration-200 hover:bg-green-700" variant="outline">
                <Link
                    href="/signup"> Sign up</Link>
            </Button>
        </div>
    )
}


export default SignInUp;