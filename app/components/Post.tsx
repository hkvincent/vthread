"use client";
import Link from "next/link";
import MyImage from "./MyImage";
import { useFormState, useFormStatus } from "react-dom";
import LoadingSVG from "./LoadingSVG";
import { deletePost } from "../action/actions";
import { useState } from "react";
const initialState = {
    message: null,
}
function Post({ post, showEditBtn }: { post: PostI; showEditBtn?: boolean }) {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const createdAt = new Date(post.created_at);
    const [state, setState] = useState({ showConfirm: false });
    const updateUserWithId = deletePost.bind(null, post.id);
    const [formState, formAction] = useFormState(updateUserWithId, initialState);

    function handleClick() {
        // const newState = Object.assign({}, state, {
        //   showConfirm: !state.showConfirm,
        // });
        setState({ ...state, showConfirm: !state.showConfirm });
    }

    // if (typeof window === 'undefined') {
    //     // This will run only on the server
    //     console.log("Server: The Thread page's Post");
    //   } else {
    //     // This will run only on the client
    //     console.log("Client: The Thread page's Post");
    //   }
    return (
        <div className="flex flex-row">
            <div>
                {post.avatar && (
                    <Link href={`/${post.username}`}>
                        <MyImage url={post.avatar} />
                    </Link>
                )}
                {!post.avatar && (
                    <div
                        className="bg-slate-600 rounded-full mr-3"
                        style={{ width: 50, height: 50 }}
                    ></div>
                )}
            </div>
            <div className="flex flex-col max-w-xs">
                <div className="font-bold">
                    <Link href={`/${post.user_id}`}>{post.username}</Link>
                </div>
                <div className="dark:text-slate-400 text-slate-600">
                    {createdAt.toLocaleDateString("en-us", options)}
                </div>
                <div>{post.content}</div>
            </div>
            {showEditBtn && (
                <div className="flex flex-col justify-start items-end flex-grow">
                    <button className="dark:bg-slate-900 bg-blue-400 p-2 rounded-lg mb-1">
                        <Link
                            href={`/profile/edit-post/${post.id}`}
                            className="dark:text-green-400 text-green-800"
                        >
                            Edit
                        </Link>
                    </button>

                    {!state.showConfirm && (
                        <button className="mt-1 dark:bg-slate-900 bg-red-400 p-2 rounded-lg" onClick={handleClick}>
                            Delete
                        </button>
                    )}

                    {state.showConfirm && (<form className="mt-1" action={formAction}>
                        <div>
                            <p>SURE?</p>
                            <div className="flex flex-row gap-2">
                                <SubmitButton />
                                <button className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg" onClick={handleClick}>
                                    No
                                </button>
                            </div>
                        </div>
                    </form>
                    )}
                </div>
            )}
        </div>
    );
}


function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className="dark:bg-slate-900 bg-red-400 p-2 rounded-lg" aria-disabled={pending} disabled={pending}
        >
            {pending ? <LoadingSVG /> : "Delete"}
        </button>
    )
}

export default Post;