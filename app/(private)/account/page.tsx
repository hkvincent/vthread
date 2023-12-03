import { getJWTPayload } from "@/app/utils/auth";
import AvatarForm from "./AvatarForm";
import SignOutButton from "./SignoutBtn";
import { sql } from "@/db";
import { redirect } from "next/navigation";


export default async function AccountPage() {
    async function getUserProfile() {
        // get currently logged in user
        const jwtPayload = await getJWTPayload();
        if (!jwtPayload) return  redirect(`/`);
        // fetch user data
        const res = await sql(
            "select id, username, avatar from users where id = $1",
            [jwtPayload.sub]
        );
        return res.rows[0];
    }


    const user = await getUserProfile();
    if (!user) return null;
    return (
        <div>
            <h2>Account</h2>
            <AvatarForm user={user} />
            <SignOutButton />
        </div>
    );
}