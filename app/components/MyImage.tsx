"use client";
import React, { useState } from 'react';
import Image from "next/image";

function MyImage({ url }: { url: string }) {

    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        console.log("image error");
        setImageError(true);
    };

    return (
        <div>
            {!imageError && url ? (
                <Image
                    src={url}
                    width={50}
                    height={50}
                    alt={url}
                    className="rounded-full mr-3"
                    onError={handleImageError}
                />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={url}
                    width={50}
                    height={50}
                    alt={url}
                    className="rounded-full mr-3"
                />
            )}
            {!url && (
                <div
                    style={{ width: 50, height: 50 }}
                    className="bg-slate-600 rounded-full mr-3"
                ></div>
            )}
        </div>
    );
}

export default MyImage;