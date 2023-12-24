"use client";
import { addPost } from "@/app/action/actions";
import LoadingSVG from "@/app/components/LoadingSVG";
import { FormEvent, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useSWRConfig } from "swr";


const initialState = {
    message: null,
}

function Form() {
    const { mutate } = useSWRConfig();
    const [post, setPost] = useState("");
    const [state, formAction] = useFormState(addPost, initialState)
    const ref = useRef<HTMLFormElement>(null);

    // async function handleSubmit(e: FormEvent) {
    //     e.preventDefault();

    //     const res = await fetch("/api/posts", {
    //         method: "POST",
    //         body: JSON.stringify({ content: post }),
    //     });

    //     if (res.ok) {
    //         setPost("");
    //         mutate((key) => typeof key === "string" && key.startsWith("/api/posts"));
    //     }
    // }

    return (
        <form ref={ref} action={async (formData) => {
            await formAction(formData);
            ref.current?.reset();
          }}>
            <textarea
                className="dark:bg-slate-600 dark:text-white bg-white text-black p-2 rounded-lg w-full my-2"
                placeholder="What is happening?"
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
            {pending ? <LoadingSVG /> : "POST"}
        </button>
    )
}

export default Form;