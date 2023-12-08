"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const LogoHeader = () => {
    const pathname = usePathname();
    return (
        <div>
            <Link href="/"
                className={
                    pathname == "/"
                        ? "dark:text-green-400 text-green-400"
                        : ""
                }> V-thread </Link>
        </div>
    );
};

export default LogoHeader;