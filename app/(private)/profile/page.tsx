import useSWR from "swr";
import Form from "./Form";
import PostContainer from "@/app/components/PostContainer";
import { authOptions, getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { getServerSession } from "next-auth/next"
export default async function Profile() {

    async function getPorfile() {
        // get currently logged in user
        const session = await getServerSession(authOptions)

        // fetch user data
        return await (await sql(
            "select id, username, avatar from users where id = $1",
            [session?.user.id]
        )).rows[0];;
    }


    async function getTotalProfile() {
        // get currently logged in user
        const session = await getServerSession(authOptions)

        // fetch user data
        return await (await sql(
            "select count(*) from posts where user_id = $1",
            [session?.user.id]
        )).rows[0];;
    }
    // const { data, error, isLoading } = useSWR("/api/users/profile");

    // if (error) return <div>failed to load</div>;
    // if (isLoading) return <div>loading...</div>;

    const user = await getPorfile();
    const total = await getTotalProfile();

    return (
        <main>
            <h2>Profile</h2>
            <Form />
            <PostContainer username={user.username} showEditBtn={true} numberOfPosts={total.count} />
        </main>
    );
}