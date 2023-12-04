"use client";
import { doSignout } from "@/app/action/actions";
import LoadingSVG from "@/app/components/LoadingSVG";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
const initialState = {
    message: null,
}
export default function SignOutForm() {
    // const router = useRouter();
    const [state, formAction] = useFormState(doSignout, initialState);
    // async function handleSignOut() {
    //     const res = await fetch("/api/logout");
    //     if (res.ok) {
    //         router.refresh();
    //         router.push("/");
    //     }
    // }

    return (
        <form action={formAction}>
            <SubmitButton />
        </form>
        // <button
        //     onClick={handleSignOut}
        //     className="dark:text-green-400 text-green-800 underline p-2 rounded-lg my-5"
        // >
        //     Sign Out
        // </button>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            className="dark:text-green-400 text-green-800 underline p-2 rounded-lg my-5"
            aria-disabled={pending}
            disabled={pending}>
            {pending ? <LoadingSVG /> : "Sign Out"}
        </button>
    )
}
