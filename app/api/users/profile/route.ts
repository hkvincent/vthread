import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function GET(req: NextRequest) {
    // get currently logged in user
    const token = await getToken({ req });
    // fetch user data
    const res = await sql(
        "select id, username, avatar from users where id = $1",
        [token?.id]
    );
    const user = res.rows[0];
    // return user data
    return NextResponse.json({ data: user });
}