import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";


// export async function middleware(request: NextRequest) {
//     const pathname = request.nextUrl.pathname;

//     const authenticatedAPIRoutes = [
//         pathname.startsWith("/api/users"),
//         pathname.startsWith("/api/posts"),
//         pathname.startsWith("/api/follows"),
//         pathname.startsWith("/api/admin"),
//         // pathname.startsWith("/api/search"),
//     ];

//     const authenticatedCronRoutes = [pathname.startsWith("/api/cron")];

//     const routeToHomeIfLoggedIn = ["/","", "signin", "signup"];

//     if (routeToHomeIfLoggedIn.includes(pathname.replace("/", ""))) {
//         const cookie = request.cookies.get("jwt-token");
//         if (cookie && cookie?.value) {
//             return NextResponse.redirect(new URL('/feed', request.url));
//         }
//     }

//     if (authenticatedAPIRoutes.includes(true)) {
//         const cookie = request.cookies.get("jwt-token");

//         if (!cookie || !cookie?.value) {
//             return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
//         }

//         try {
//             const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
//             await jwtVerify(cookie.value, secret);
//         } catch (error) {
//             console.error(error);
//             return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
//         }
//     }

//     if (authenticatedCronRoutes.includes(true)) {
//         const key = request.nextUrl.searchParams.get("cron_api_key");
//         const isAuthenticated = key === process.env.CRON_API_KEY;
//         if (!isAuthenticated) {
//             return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
//         }
//     }
// }


// role based authorization
export default withAuth(
    async function middleware(req) {
        const url = req.nextUrl.pathname;
        const userRole = req?.nextauth?.token;
        // cors
        // if (url?.includes("/api")) {
        //     NextResponse.next().headers.append("Access-Control-Allow-Origin", "*");
        // }

        // if (url?.includes("/admin") && userRole !== "admin") {
        //     return NextResponse.redirect(new URL("/", req.url));
        // }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                console.log({token});
                return !!token; // Ensure to return a boolean value
            },
        },
    }
);

export const config = {
    matcher: ["/api/users/:path*",
        "/api/posts/:path*",
        "/api/follows/:path*",
        "/api/admin/:path*",
        "/api/search/:path*",
        "/api/cron/:path*",
        "/feed/:path*",
        "/account/:path*",
        "/followers/:path*",
        "/following/:path*",
        "/profile/:path*"]
};