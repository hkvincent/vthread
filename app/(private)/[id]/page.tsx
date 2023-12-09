import PostContainer from "@/app/components/PostContainer";
import UserPageHeader from "./UserPageHeader";
import { sql } from "@/db";
import { getJWTPayload } from "@/app/utils/auth";

export default async function UserPage({ params }: { params: { id: string } }) {
    async function getUser(username: string) {
        const statement =
            "select id, username, avatar from users where id = $1";
        const values = [username];
        return (await sql(statement, values)).rows[0];
    }

    const dataUser = await getUser(params.id);

    return (
        <div>
            <UserPageHeader user={dataUser} />
            <PostContainer username={dataUser.username} />
        </div>
    );
}