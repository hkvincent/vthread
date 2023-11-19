'use server'

import { revalidatePath } from "next/cache";
import { getJWTPayload } from "../utils/auth";
import { sql } from "@/db";

export async function editPost(id: number, prevState: any, formData: FormData) {
    const jwtPayload = await getJWTPayload();
    const res = await sql(
        "select * from posts where user_id = $1 and id = $2",
        [jwtPayload.sub, id]
    );
    if (res.rowCount == 0) {
        return { message: 'not found' };
    }
    await sql(
        "update posts set content = $1 where user_id = $2 and id = $3",
        [formData.get('post'), jwtPayload.sub, id]
    );
    revalidatePath('/profile');
    return { message: 'update' };

}

export async function addPost(prevState: any, formData: FormData) {
    const jwtPayload = await getJWTPayload();
    const res = await sql(
        "insert into posts (user_id, content) values ($1, $2) returning *",
        [jwtPayload.sub, formData.get('post')]
    );
    revalidatePath('/profile');
    return { message: 'add' };
}

export async function deletePost(prevState: any, formData: FormData) {
    // const jwtPayload = await getJWTPayload();
    // const res = await sql(
    //     "delete from posts where user_id = $1 and id = $2",
    //     [jwtPayload.sub, postId]
    // );
    return revalidatePath('/profile');
}

export async function doFollow(prevState: any, formData: FormData) {
    console.log("doFollow");
    const jwtPayload = await getJWTPayload();
    const userId = formData.get('userId');

    const res = await sql(
        "select * from follows where user_id = $1 and follower_id = $2",
        [userId, jwtPayload.sub]
    );

    if (res.rowCount > 0) {
        revalidatePath('/');
        return { message: 'already following' };
    }

    await sql("insert into follows (user_id, follower_id) values ($1, $2)", [
        userId,
        jwtPayload.sub,
    ]);
    revalidatePath('/')
    return { message: ' follow' };;
}

export async function doUnfollow(prevState: any, formData: FormData) {
    console.log("doUnfollow");
    const jwtPayload = await getJWTPayload();
    const userId = formData.get('userId');

    await sql("delete from follows where user_id = $1 and follower_id = $2", [
        userId,
        jwtPayload.sub,
    ]);
    revalidatePath('/')
    return { message: ' remove follow' };;
}