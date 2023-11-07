import Image from "next/image";
import Link from "next/link";

export default function AvatarForm({ user }: { user: UserI }) {
    return (
        <div>
            {user.avatar && (
                <div>
                    <Image
                        src={user.avatar}
                        alt={user.avatar}
                        width={200}
                        height={200}
                        className="rounded-full m-auto my-5"
                    />
                </div>
            )}
            {!user.avatar && (
                <div
                    className="bg-slate-600 rounded-full m-auto my-5"
                    style={{ width: 200, height: 200 }}
                ></div>
            )}
            <Link
                href="/avatar/upload"
                className="dark:text-green-400 text-green-800 underline p-2 rounded-lg my-5"
            >
                Update Avatar
            </Link>
        </div>
    );
}