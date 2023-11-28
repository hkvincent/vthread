import Link from 'next/link';
import React from 'react';

const SignInUp = () => {
    return (
        <div className="flex flex-row justify-between items-center ">
            <div>
                <Link
                    href="/signin"
                    className="dark:bg-slate-900 bg-slate-400 my-4 p-3 rounded-lg block"
                >
                    Sign In
                </Link>
            </div>
            <div>
                <Link
                    href="/signup"
                    className="dark:bg-slate-900 bg-slate-400 my-4 p-3 rounded-lg block"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default SignInUp;