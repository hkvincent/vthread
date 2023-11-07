import useSWR from "swr";
import Form from "./Form";
import PostContainer from "@/app/components/PostContainer";
import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";

export default async function Profile() {

    async function getPorfile() {
        // get currently logged in user
        const jwtPayload = await getJWTPayload();

        // fetch user data
        return await (await sql(
            "select id, username, avatar from users where id = $1",
            [jwtPayload.sub]
        )).rows[0];;
    }
    // const { data, error, isLoading } = useSWR("/api/users/profile");

    // if (error) return <div>failed to load</div>;
    // if (isLoading) return <div>loading...</div>;

    const user = await getPorfile();

    return (
        <main>
            <h2>Profile</h2>
            <Form />
            <PostContainer username={user.username} showEditBtn={true} />
        </main>
    );
}