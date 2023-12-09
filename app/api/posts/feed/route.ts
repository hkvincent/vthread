import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page =
        (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;
    const limit = 10;
    const offset = page * 10;

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    console.log("GET",token);
    const res = await sql(
        `select p.*, u.username, u.avatar from posts p 
    inner join users u on p.user_id = u.id where user_id in 
    (select user_id from follows where follower_id = $1) 
    order by created_at desc limit $2 offset $3;`,
        [token?.id, limit, offset]
    );

    return NextResponse.json({ data: res.rows });
}