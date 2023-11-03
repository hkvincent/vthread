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