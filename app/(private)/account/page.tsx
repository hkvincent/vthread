import { authOptions, getJWTPayload } from "@/app/utils/auth";
import AvatarForm from "./AvatarForm";
import SignOutForm from "./SignoutForm";
import { sql } from "@/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"


export default async function AccountPage() {
    async function getUserProfile() {
        // get currently logged in user
        const session = await getServerSession(authOptions)
        // fetch user data
        const res = await sql(
            "select id, username, avatar from users where id = $1",
            [session.user.id]
        );
        return res.rows[0];
    }


    const user = await getUserProfile();
    const session = await getServerSession(authOptions);
    if (user && user.avatar) {
        user.avatar = user.avatar;
    } else if (session && session.user && session.user.image) {
        user.avatar = session.user.image;
    }
    if (!user) return null;
    return (
        <div>
            <h2>Account</h2>
            <AvatarForm user={user} />
            <SignOutForm />
        </div>
    );
}