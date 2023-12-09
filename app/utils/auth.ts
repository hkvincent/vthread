import { sql } from "@/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import NextAuth, { SessionStrategy } from "next-auth";
export async function getJWTPayload() {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt-token");
    if (!token || !token.value) return "";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload, protectedHeader } = await jwtVerify(token?.value!, secret);
    return payload;
}

export async function authorizeAdmin(func: Function) {
    const jwtPayload = await getJWTPayload();
    const res = await sql("select is_admin from users where id = $1", [
        jwtPayload.sub,
    ]);
    const data = res.rows[0];
    if (!data.is_admin) {
        return NextResponse.json({ error: "unauthorized" }, { status: 403 });
    }
    return func();
}

export const authOptions = {
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials!;
                const res = await sql(
                    "select * from users where username like $1",
                    [username]
                );
                if (res.rowCount == 0) {
                    console.log("Invalid email or password");
                    throw new Error("Invalid email or password");
                }
                const user = res.rows[0];
                if (!user) {
                    throw new Error("Invalid email or password");
                }
                if (!user.password) {
                    throw new Error("Please login via the method you used to signup");
                }
                const isPasswordMatched = await bcrypt.compare(password, user.password);
                if (!isPasswordMatched) {
                    throw new Error("Invalid email or password");
                }
                return user;
            },
        }),
    ],
    callbacks: {
        // save user if they login via social networks
        async signIn({ account, user }: { account: any, user: any }) {
            if (account.provider === "google") {
                const { name, id, email, image } = user;
                console.log("signIn callback", user);
                const res = await sql(
                    "select id, username, email from users where email = $1",
                    [email]
                );
                if (res.rowCount == 0) {
                    await sql("insert into users (username,email,avatar) values ($1,$2,$3)", [
                        name, email, image
                    ]);
                }
            }
            return true;
        },
        // add additiona user info to the session (jwt, session)
        jwt: async ({ token, account }: { token: any, account: any }) => {
            if (account) {
                let res;
                console.log("jwt callback", token, account);
                if (account.provider === "google") {
                    res = await sql(
                        "select id, username, email from users where email = $1",
                        [token.email]
                    );
                } else {
                    res = await sql(
                        "select id, username, email from users where id = $1",
                        [token.sub]
                    );
                }
                if (res?.rowCount > 0) {
                    const user = res.rows[0];
                    user.password = undefined;
                    token.user = user;
                    token.id = user.id;
                }
            }

            return token;
        },
        session: async ({ session, token }: { session: any, token: any }) => {
            // console.log("session callback", session, token);
            session.user = { ...session.user, ...token.user }; // jwt token.user is accessed here
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
};
