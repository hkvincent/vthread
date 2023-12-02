import useSWR from "swr";
import Post from "./Post";
import { useEffect, useState } from "react";
import LoadingSVG from "./LoadingSVG";

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
    const [post, setPost] = useState<PostI[]>([])
    const [isLoading, setIsLoading] = useState(true)


    // async useEffect to fetch data from api and set it to post state.
    useEffect(() => {
        async function fetchMyAPI() {
            const response = await fetch("/api/posts?page=" + index + "&username=" + username)
            const data = await response.json()
            setIsLoading(false);
            setPost(data.data)
        }
        fetchMyAPI()
    }, [index, numberOfPosts, username])

    // const { data, error, isLoading } = useSWR(
    //     () => "/api/posts?page=" + index + "&username=" + username
    // );


    // if (error) return <div>failed to load</div>;
    if (isLoading) return <div className="flex flex-row justify-center items-center"><LoadingSVG /></div>;
    if (!post || post.length === 0) return <div className="flex flex-row justify-center items-center">No Posts</div>
    return (
        <ul>
            {post.map((post: PostI) => {
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