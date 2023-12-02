import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { get } from "lodash";
import { notFound } from "next/navigation";
import useSWR, { mutate } from "swr";
import FollowButton from "./FollowButton";

export default async function UserPageHeader({ username }: { username: string }) {

    async function getUser(username: string) {
        const statement =
            "select id, username, avatar from users where username ilike $1";
        const values = [username];
        return (await sql(statement, values)).rows[0];
    }

    async function getFollow(dataUser: any) {
        if (dataUser === undefined) return;
        const jwtPayload = await getJWTPayload();
        // console.log({ jwtPayload });
        if (!jwtPayload) return null;
        const res = await sql(
            "select * from follows where user_id = $1 and follower_id = $2",
            [dataUser.id, jwtPayload.sub]
        );
        return res.rows[0]
    }
    const dataUser = await getUser(username);
    const dataFollow = await getFollow(dataUser);

    if (dataUser === undefined) {
        notFound();
    }
    const jwtPayload = await getJWTPayload();
    return (
        <header className="w-full dark:bg-slate-800 bg-slate-300 p-2 rounded-lg flex flex-row justify-between">
            <h1 className="text-lg font-bold">{username}</h1>
            {jwtPayload && <FollowButton follow={dataFollow != null && dataFollow != undefined} willFollow={dataUser.id} />}
        </header>
    );
}