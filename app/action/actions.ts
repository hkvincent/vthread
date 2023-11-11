'use server'

import { revalidatePath } from "next/cache";
import { getJWTPayload } from "../utils/auth";
import { sql } from "@/db";

export async function editPost(formData: FormData) {


}

export async function addPost(prevState: any, formData: FormData) {
    const jwtPayload = await getJWTPayload();
    console.log({ formData });
    console.log(formData.get('post'));
    const res = await sql(
        "insert into posts (user_id, content) values ($1, $2) returning *",
        [jwtPayload.sub, formData.get('post')]
    );
    return revalidatePath('/profile');
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
    console.log({ formData });
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
    console.log({ formData });
    const jwtPayload = await getJWTPayload();
    const userId = formData.get('userId');

    await sql("delete from follows where user_id = $1 and follower_id = $2", [
        userId,
        jwtPayload.sub,
    ]);
    revalidatePath('/')
    return { message: ' remove follow' };;
}