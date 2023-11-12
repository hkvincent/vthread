
import Link from "next/link";
import { useState } from "react";
import MyImage from "./MyImage";

function User({ user, href }: { user: UserI; href?: string }) {
    console.log(`user.avatar: ${user.avatar}`);

    return (
        <div>
            <Link href={`/${href || user.username}`} className="flex flex-row items-center">
                <MyImage url={user.avatar} />
                <div>{user.username}</div>
            </Link>
        </div>
    );
}

export default User;