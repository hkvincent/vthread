import { authOptions, getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { get } from "lodash";
import { notFound } from "next/navigation";
import useSWR, { mutate } from "swr";
import FollowButton from "./FollowButton";
import { getServerSession } from "next-auth/next"

export default async function UserPageHeader({ username }: { username: string }) {

    async function getUser(username: string) {
        const statement =
            "select id, username, avatar from users where username like $1";
        const values = [username];
        return (await sql(statement, values)).rows[0];
    }

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
    const dataUser = await getUser(username);

    const dataFollow = await getFollow(dataUser);

    if (dataUser === undefined) {
        notFound();
    }
    const session = await getServerSession(authOptions)
    return (
        <header className="w-full dark:bg-slate-800 bg-slate-300 p-2 rounded-lg flex flex-row justify-between">
            <h1 className="text-lg font-bold">{username}</h1>
            {session && <FollowButton follow={dataFollow != null && dataFollow != undefined} willFollow={dataUser.id} />}
        </header>
    );
}