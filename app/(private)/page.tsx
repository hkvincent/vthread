import Post from "@/app/components/Post";
import { sql } from "@/db";

async function getData() {
    const res = await sql(
        `select p.*, u.avatar, u.username from posts p inner join users u
    on p.user_id = u.id order by created_at desc limit 10`
    );
    return res.rows;
}

export default async function PublicFeed() {
    const posts = await getData();
    return (
        <main>
            <div className="flex flex-row justify-between mb-8">
                <p>VThread</p>
                <p>Recent Posts</p>
            </div>
            <div>
                {posts.map((post) => {
                    return <Post post={post} key={post.id} />;
                })}
            </div>
        </main>
    );
}
