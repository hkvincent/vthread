'use server'

import { revalidatePath } from "next/cache";
import { authOptions, getJWTPayload } from "../utils/auth";
import { sql } from "@/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next"

export async function editPost(id: number, prevState: any, formData: FormData) {
    const session = await getServerSession(authOptions)
    const res = await sql(
        "select * from posts where user_id = $1 and id = $2",
        [session.user.id, id]
    );
    if (res.rowCount == 0) {
        return { message: 'not found' };
    }
    await sql(
        "update posts set content = $1 where user_id = $2 and id = $3",
        [formData.get('post'), session.user.id, id]
    );
    revalidatePath('/profile');
    redirect(`/profile`);
}

export async function addPost(prevState: any, formData: FormData) {
    const session = await getServerSession(authOptions)
    const res = await sql(
        "insert into posts (user_id, content) values ($1, $2) returning *",
        [session.user.id, formData.get('post')]
    );
    revalidatePath('/profile');
    return { message: 'add' };
}

export async function deletePost(id: number, prevState: any, formData: FormData) {
    // console.log(`deletePost ${id}`);
    const session = await getServerSession(authOptions)
    const res = await sql("delete from posts where user_id = $1 and id = $2", [
        session.user.id,
        id,
    ]);
    if (res.rowCount != 1) {
        console.log(`fail to delete ${id}`);
        return { message: '' };
    }
    revalidatePath('/profile');
    redirect(`/profile`);
}

export async function doFollow(prevState: any, formData: FormData) {
    // console.log("doFollow");
    const session = await getServerSession(authOptions)
    const userId = formData.get('userId');

    const res = await sql(
        "select * from follows where user_id = $1 and follower_id = $2",
        [userId, session.user.id]
    );

    if (res.rowCount > 0) {
        revalidatePath('/');
        return { message: 'already following' };
    }

    await sql("insert into follows (user_id, follower_id) values ($1, $2)", [
        userId,
        session.user.id,
    ]);
    revalidatePath('/')
    return { message: ' follow' };;
}

export async function doUnfollow(prevState: any, formData: FormData) {
    // console.log("doUnfollow");
    const session = await getServerSession(authOptions)
    const userId = formData.get('userId');

    await sql("delete from follows where user_id = $1 and follower_id = $2", [
        userId,
        session.user.id
    ]);
    revalidatePath('/')
    return { message: ' remove follow' };;
}


export async function doSignout(prevState: any, formData: FormData) {
    // cookies().set("jwt-token", "");
    // revalidatePath('/')
    // redirect(`/`);
    // return { message: ' jwt clear' };
    signOut({ callbackUrl: "/" });
}