
import useSWR from "swr";
import Post from "@/app/components/Post";
import LoadingSVG from "@/app/components/LoadingSVG";
import Link from "next/link";
function FeedList({ index }: { index: number }) {
    const { data, error, isLoading } = useSWR("/api/posts/feed?page=" + index);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div className="flex flex-row justify-center items-center mb-4"><LoadingSVG /></div>;;

    return (
        <ul>
            {data.data.map((post: PostI) => {
                return (
                    <Link key={post.id} href={`/post/${post.id}`}>
                        <li className="my-5" key={post.id}>
                            <Post post={post} />
                        </li>
                    </Link>
                );
            })}
        </ul>
    );
}

export default FeedList; 