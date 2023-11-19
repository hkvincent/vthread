"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { editPost } from "@/app/action/actions";
import { useFormState, useFormStatus } from "react-dom";
import LoadingSVG from "@/app/components/LoadingSVG";
const initialState = {
    message: null,
}
function Form({ post }: { post: PostI }) {
    const router = useRouter();
    const [content, setContent] = useState(post.content);
    const updateUserWithId = editPost.bind(null, post.id);
    const [state, formAction] = useFormState(updateUserWithId, initialState);
    const ref = useRef<HTMLFormElement>(null);


    return (
        <form ref={ref} action={async (formData) => {
            await formAction(formData);
            ref.current?.reset();
        }}>
            <textarea
                className="dark:bg-slate-600 dark:text-white bg-white text-black p-2 rounded-lg w-full my-2"
                placeholder="What is happening?"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                id="post"
                name="post" required
            />
            <SubmitButton />
        </form>
    );
}

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg" aria-disabled={pending} disabled={pending}
        >
            {pending ? <LoadingSVG /> : "Update"}
        </button>
    )
}

export default Form;