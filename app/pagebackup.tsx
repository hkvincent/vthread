import Link from "next/link";
import DarkModeSwitch from "./components/ThemeSwicher";
import SignInUp from "./components/SignInUp";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-500 rounded-lg">
        <DarkModeSwitch />
        <div className="text-center my-4">
          <h1>Strings</h1>
        </div>
        <SignInUp />
        <div>
          <Link
            href="/thread"
            className="dark:bg-slate-900 bg-slate-400 my-4 p-3 rounded-lg block"
          >
            Thread
          </Link>
        </div>
      </div>
    </main>
  );
}