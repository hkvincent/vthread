import { getJWTPayload } from "@/app/utils/auth";
import Form from "./form";
import { sql } from "@/db";
// import DeleteBtn from "./delete-btn";

export default async function EditPost({ params }: { params: { id: number } }) {


    async function getParticalPost(id: number) {
        const jwtPayload = await getJWTPayload();
        const res = await sql("select * from posts where id = $1 and user_id = $2", [
            params.id,
            jwtPayload.sub,
        ]);

        if (res.rowCount == 0) {
            return "";
        }
        return res.rows[0];

    }


    const data: PostI = await getParticalPost(params.id)


    // const { data, error, isLoading } = useSWR("/api/posts/" + params.id);

    // if (error) return <div>failed to load</div>;
    // if (isLoading) return <div>loading...</div>;

    return (
        <div>
            <h2>Edit Post</h2>
            <div className="flex flex-col gap-10">
                <Form post={data} />
                {/* <DeleteBtn post={data.data} /> */}
            </div>
        </div>
    );
}

