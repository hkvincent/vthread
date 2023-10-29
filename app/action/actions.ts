'use server'

import { getJWTPayload } from "../utils/auth";
import { sql } from "@/db";

export async function editPost(page: number) {
    // ...
    const limit = 10;
    const offset = page * 10;
    const jwtPayload = await getJWTPayload();
    const res = await sql(
        `select p.*, u.username, u.avatar from posts p 
    inner join users u on p.user_id = u.id where user_id in 
    (select user_id from follows where follower_id = $1) 
    order by created_at desc limit $2 offset $3;`,
        [jwtPayload.sub, limit, offset]
    );

}