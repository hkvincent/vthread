import Footer from "./footer";
import Header from "./header";
import NavBar from "./navbar";
import SearchBar from "./SearchBar";
import DarkModeSwitch from "../components/ThemeSwicher";
import MySWRConfig from "../utils/MySWRConfig";
import { getJWTPayload } from "../utils/auth";
import { sql } from "@/db";
import SignInUp from "../components/SignInUp";

export default async function PrivateLayout({
    children, modal
}: {
    children: React.ReactNode,
    modal: React.ReactNode
}) {

    async function getUserProfile() {
        // get currently logged in user
        const jwtPayload = await getJWTPayload();

        if (!jwtPayload) return null;
        // fetch user data
        const res = await sql(
            "select id, username, avatar from users where id = $1",
            [jwtPayload.sub]
        );
        return res.rows[0];
    }

    const user = await getUserProfile();
    console.log("PrivateLayout" + { user });

    return (
        <MySWRConfig>
            <div className="flex flex-col min-h-screen max-w-md m-auto items-center justify-center ">
                <div className="flex w-full justify-between items-center px-5">
                    <DarkModeSwitch />
                    <SearchBar />
                </div>
                {user && <Header user={user} avatar={user.avatar} />}
                {user && <NavBar />}
                <main className="w-full p-5 dark:bg-slate-800 bg-slate-300 rounded-lg my-2">
                    {children}
                    {modal}
                </main>
                {!user && <div className=""><SignInUp /> </div>}
                <Footer />
            </div>
        </MySWRConfig>
    );
}