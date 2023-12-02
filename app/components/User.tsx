
import Link from "next/link";
import { useState } from "react";
import MyImage from "./MyImage";

function User({ user, href }: { user: UserI; href?: string }) {
    return (
        <div>
            <Link href={`/${href || user.username}`} className="flex flex-row items-center transition duration-300 ease-in-out hover:bg-gray-300 rounded-md p-2">
                <MyImage url={user.avatar} />
                <div>{user.username}</div>
            </Link>
        </div>
    );
}

export default User;