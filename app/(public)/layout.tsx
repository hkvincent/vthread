import DarkModeSwitch from "../components/ThemeSwicher";
import MyThemeProvider from "../context/MyThemeProvider";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen max-w-md items-center justify-center m-auto">
            <DarkModeSwitch />
            {children}
        </main>
    );
}