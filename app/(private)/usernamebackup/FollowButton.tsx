"use client";
import { doFollow, doUnfollow } from '@/app/action/actions';
import LoadingSVG from '@/app/components/LoadingSVG';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
    message: null,
}
const FollowButton = ({ follow, willFollow }: { follow: boolean, willFollow: string }) => {
    // async function handleUnfollow() {
    //     const res = await fetch("/api/follows/" + user.id, {
    //         method: "DELETE",
    //     });
    //     if (res.ok) {
    //         mutate("/api/follows?user_id=" + user.id);
    //     }
    // }

    // async function handleFollow() {
    //     const res = await fetch("/api/follows", {
    //         method: "POST",
    //         body: JSON.stringify({ user_id: user.id }),
    //     });
    //     if (res.ok) {
    //         mutate("/api/follows?user_id=" + user.id);
    //     }
    // }
    const willFormAction = follow ? doUnfollow : doFollow;
    const [state, formAction] = useFormState(willFormAction, initialState);
    return (
        <form action={formAction}>
            <input type='hidden' name='userId' value={willFollow} />
            <SubmitButton follow={follow} />
        </form>
    );
};

function SubmitButton({ follow }: { follow: boolean }) {
    const { pending } = useFormStatus()

    return (
        <button
            className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg"
            aria-disabled={pending}
            disabled={pending}>
            {pending ? <LoadingSVG /> : (follow ? "Unfollow" : "Follow")}
        </button>
    )
}

export default FollowButton;