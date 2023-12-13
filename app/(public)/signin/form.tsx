"use client";
import LoadingSVG from "@/app/components/LoadingSVG";
import ModalContext from "@/app/context/ModalContext";
import { set } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useContext, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";
function Form() {
    const router = useRouter();
    const [username, setUsername] = useState<undefined | string>("");
    const [password, setPassword] = useState<undefined | string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { modal, setModal } = useContext(ModalContext)!;
    const searchParams = useSearchParams();
    const callbackUrl = "/feed";
    // async function handleSubmit(e: FormEvent) {
    //     setLoading(true);
    //     e.preventDefault();
    //     const res = await fetch("/api/login", {
    //         method: "POST",
    //         body: JSON.stringify({ username, password }),
    //     });
    //     setLoading(false);
    //     if (res.ok) {
    //         setModal({ shouldCloseModal: true });
    //         router.refresh();
    //         router.push("/feed");
    //     } else {
    //         setError("log in failed");
    //     }

    //     // revalidatePath('/');
    // }

    async function handleSubmit(e: FormEvent) {
        setLoading(true);
        e.preventDefault();
        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setLoading(false);
                toast.error(result.error);
            } else {

                setLoading(false);
                // setModal({ shouldCloseModal: true });
                router.back();
                // Wait for a moment to ensure the modal closes
                setTimeout(() => {
                    // Navigate to the '/feed' page
                    router.refresh();
                    router.push("/feed");
                }, 200); // Adjust the timeout duration as needed
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast.error("An error occurred. Try again.");
        }

    }


    return (
        // loading true using loading svg
        loading ? <LoadingSVG /> :
            <div className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300 rounded-lg">
                < form
                    onSubmit={handleSubmit}
                >
                    <div className="text-center">
                        <h3 className="font-semibold">Sign In</h3>
                    </div>
                    <div className="my-3">
                        <hr />
                    </div>
                    <div>
                        <div className="flex flex-col gap-2">
                            <label>Username</label>
                            <input
                                className="text-black p-3 border border-slate-700 rounded-lg"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                id="username"
                                placeholder="Username"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Password</label>
                        <input
                            className="text-black p-3 border border-slate-700 rounded-lg"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 dark:bg-slate-900 bg-slate-400 text-white p-3 rounded-lg"
                    >
                        Sign In
                    </button>
                    {
                        error && (
                            <div key={error} className="text-red-600 text-center">
                                {error}
                            </div>
                        )
                    }
                </form >
                <button
                    className="mt-4 dark:bg-slate-900 bg-slate-400 text-white p-3 rounded-lg"
                    onClick={
                        () => {
                            setLoading(true);
                            signIn("google", { callbackUrl: "/feed" });
                        }
                    }
                >
                    Sign in with Google
                </button>
            </div>
    );
}

export default Form;