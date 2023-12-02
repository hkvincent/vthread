"use client";

import LoadingSVG from "@/app/components/LoadingSVG";
import type { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function AvatarUploadPage() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const router = useRouter();
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-auto py-10 ">
            <div className="p-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Upload Your Avatar</h1>
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        const file = inputFileRef.current?.files?.[0];
                        if (file) {
                            setUploading(true);
                            const response = await fetch(
                                `/api/avatar/upload?filename=${file.name}`,
                                {
                                    method: "POST",
                                    body: file,
                                }
                            );
                            setUploading(false);
                            if (response.ok) {
                                const newBlob = (await response.json()) as PutBlobResult;
                                // revalidatePath("/account");
                                router.refresh();
                                router.push("/account");
                                // setBlob(newBlob); // If you want to display the blob URL, uncomment this line.
                            } else {
                                // Handle the error according to your needs.
                            }
                        }
                    }}
                >
                    <div className="mb-4">
                        {avatarPreview && (
                            <img src={avatarPreview} alt="Avatar Preview" className="mb-4 w-24 h-24 rounded-full" />
                        )}
                        <input
                            name="file"
                            ref={inputFileRef}
                            type="file"
                            required
                            onChange={handleFileChange}
                            className="text-sm file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100
                            mb-2"
                        />
                    </div>
                    {uploading && (
                        <div className="mb-4 ml-4">
                            <LoadingSVG />
                        </div>
                    )}
                    {!uploading &&
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            Upload
                        </button>}
                </form>
                {blob && (
                    <div className="mt-4">
                        Blob url: <a href={blob.url} className="text-indigo-600 hover:underline">{blob.url}</a>
                    </div>
                )}
            </div>
        </div>
    );
}
