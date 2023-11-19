import useSWR from "swr";
import Post from "./Post";

function PostList({
    index,
    username,
    showEditBtn,
    numberOfPosts,
}: {
    index: number;
    username: string;
    showEditBtn?: boolean;
    numberOfPosts?: number;
}) {
    console.log("PostList" +  numberOfPosts );
    const { data, error, isLoading } = useSWR(
        () => "/api/posts?page=" + index + "&username=" + username
    );


    if (error) return <div>failed to load</div>;
    if (isLoading || !data) return <div>loading...</div>;

    return (
        <ul>
            {data.data.map((post: PostI) => {
                return (
                    <li className="my-5" key={post.id}>
                        <Post post={post} showEditBtn={showEditBtn} />
                    </li>
                );
            })}
        </ul>
    );
}

export default PostList;