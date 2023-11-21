"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePost } from "@/app/action/actions";
import { useFormState, useFormStatus } from "react-dom";
import LoadingSVG from "@/app/components/LoadingSVG";
const initialState = {
    message: null,
}
export default function DeleteBtn({ post }: { post: PostI }) {
    const router = useRouter();
    const [state, setState] = useState({ showConfirm: false });

    function handleClick() {
        // const newState = Object.assign({}, state, {
        //   showConfirm: !state.showConfirm,
        // });
        setState({ ...state, showConfirm: !state.showConfirm });
    }
    const updateUserWithId = deletePost.bind(null, post.id);
    const [formState, formAction] = useFormState(updateUserWithId, initialState);

    return (
        <div>
            {!state.showConfirm && (
                <button className="dark:bg-slate-900 bg-red-400 p-2 rounded-lg" onClick={handleClick}>
                    Delete Post
                </button>
            )}

            {state.showConfirm && (
                <form action={formAction}>
                    <div>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="flex flex-row gap-10">
                            <SubmitButton />
                            <button className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg" onClick={handleClick}>
                                No
                            </button>
                        </div>
                    </div>
                </form>
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
