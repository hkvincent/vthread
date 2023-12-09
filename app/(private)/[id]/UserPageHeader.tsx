import { authOptions, getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { get } from "lodash";
import { notFound } from "next/navigation";
import useSWR, { mutate } from "swr";
import FollowButton from "./FollowButton";
import { getServerSession } from "next-auth/next"

export default async function UserPageHeader({ user }: { user: any }) {

    async function getFollow(dataUser: any) {
        if (dataUser === undefined) return;
        const session = await getServerSession(authOptions)
        if (!session) return null;
        const res = await sql(
            "select * from follows where user_id = $1 and follower_id = $2",
            [dataUser.id, session.user.id]
        );
        return res.rows[0]
    }

    const dataFollow = await getFollow(user);

    if (user === undefined) {
        notFound();
    }
    const session = await getServerSession(authOptions)
    return (
        <header className="w-full dark:bg-slate-800 bg-slate-300 p-2 rounded-lg flex flex-row justify-between">
            <h1 className="text-lg font-bold">{user.username}</h1>
            {session && <FollowButton follow={dataFollow != null && dataFollow != undefined} willFollow={user.id} />}
        </header>
    );
}