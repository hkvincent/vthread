"use client";
import LoadingSVG from "@/app/components/LoadingSVG";
import ModalContext from "@/app/context/ModalContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect, useState } from "react";

function Form() {
    const router = useRouter();
    const [username, setUsername] = useState<undefined | string>("");
    const [password, setPassword] = useState<undefined | string>("");
    const [confirmPassword, setConfirmPassword] = useState<undefined | string>(
        ""
    );
    const [errors, setErrors] = useState<string[]>([]);
    const { modal, setModal } = useContext(ModalContext)!;
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        return () => {
            setPassword("");
            setConfirmPassword("");
            setErrors([]);
        }
    }, []);


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors([]);
        setLoading(true);
        if (password != confirmPassword) {
            setErrors(prevErrors => [...prevErrors, "Passwords do not match."]);
            return;
        }

        const res = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });
        setLoading(false);
        if (res.ok) {
            // setModal({ shouldCloseModal: true });
            window.location.href = "/signin";
        } else {
            const data = await res.json();
            setPassword("");
            setConfirmPassword("");
            // Handle the error response from the server
            if (data.error === "user already exists") {
                setErrors(["User already exists."]);
            } else {
                setErrors(["Sign up failed."]);
            }
        }
        // revalidatePath('/');
    }

    return (
        loading ? <LoadingSVG /> : <div className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300 rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="text-center">
                    <h3 className="font-semibold">Sign Up</h3>
                </div>
                <div className="my-3">
                    <hr />
                </div>
                <div>
                    <div className="flex flex-col gap-2">
                        <label>Username</label>
                        <input
                            className="text-black p-2 border border-slate-700 rounded-lg"
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
                        className="text-black p-2 border border-slate-700 rounded-lg"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Confirm Password</label>
                    <input
                        className="text-black p-2 border border-slate-700 rounded-lg"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        id="confirm-password"
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 dark:bg-slate-900 bg-slate-400 text-white p-3 rounded-lg"
                >
                    Sign Up
                </button>
                {errors.map((error) => {
                    return (
                        <div key={error} className="text-red-600">
                            {error}
                        </div>
                    );
                })}
            </form>
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