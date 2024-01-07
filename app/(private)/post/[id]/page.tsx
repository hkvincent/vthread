import Post from "@/app/components/Post";
import { sql } from "@/db";
import { toInteger } from "lodash";

export default async function postPage({ params }: { params: { id: string } }) {
    async function getParticalPost(id: number) {
        // const jwtPayload = await getJWTPayload();
        const res = await sql("select p.*, u.avatar, u.username from posts p inner join users u  on p.user_id = u.id where p.id = $1", [
            params.id,
        ]);

        if (res.rowCount == 0) {
            return "";
        }
        return res.rows[0];

    }
    const data: PostI = await getParticalPost(toInteger(params.id));
    console.log(data);
    return (<div>
        <Post post={data} />
        <div className="flex flex-row justify-between mb-8">comment section</div>
    </div>)
}