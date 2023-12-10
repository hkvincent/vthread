import Footer from "./footer";
import Header from "./header";
import NavBar from "./navbar";
import SearchBar from "./SearchBar";
import DarkModeSwitch from "../components/ThemeSwicher";
import MySWRConfig from "../utils/MySWRConfig";
import { authOptions, getJWTPayload } from "../utils/auth";
import { sql } from "@/db";
import SignInUp, { SignInUpV0 } from "../components/SignInUp";
import { getServerSession } from "next-auth/next"

export default async function PrivateLayout({
    children, modal
}: {
    children: React.ReactNode,
    modal: React.ReactNode
}) {

    async function getUserProfile() {
        // get currently logged in user
        const session = await getServerSession(authOptions)
        if (!session) return null;
        // fetch user data
        const res = await sql(
            "select id, username, avatar from users where id = $1",
            [session.user.id]
        );
        return res.rows[0];
    }

    const user = await getUserProfile();
    const session = await getServerSession(authOptions)
    // check user.avatar is not null and not undefined and not empty string, using the user.avater otherwise use the session.picture
    if (user && user.avatar) {
        user.avatar = user.avatar;
    } else if (session && session.user && session.user.image) {
        user.avatar = session.user.image;
    } 

    return (
        <MySWRConfig>
            <div className="flex flex-col min-h-screen max-w-md m-auto items-center justify-center ">
                <div className="flex w-full justify-between items-center px-5">
                    <DarkModeSwitch />
                    <SearchBar />
                </div>
                <Header user={user} avatar={user?.avatar} />
                {user && <NavBar />}
                <main className="w-full p-5 dark:bg-slate-800 bg-slate-300 rounded-lg my-2">
                    {children}
                    {modal}
                </main>
                {!user && <div className=""><SignInUpV0 /> </div>}
                <Footer />
            </div>
        </MySWRConfig>
    );
}