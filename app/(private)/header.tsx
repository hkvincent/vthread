import User from "../components/User";
import LogoHeader from "../components/LogoHeader";
export default function Header({ user, avatar }: { user: UserI, avatar: string }) {
    if (!user) return <div>failed to load</div>;
    return (
        <header className="flex flex-row w-full p-5 dark:bg-slate-800 bg-slate-300 rounded-lg my-2 justify-between items-center">
            <div>
                <h1 className="font-mono text-lg">
                    <LogoHeader />
                </h1>
            </div>
            <div>
                <User user={user} href="account" />
            </div>
        </header>
    );
}