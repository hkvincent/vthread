import PostContainer from "@/app/components/PostContainer";
import UserPageHeader from "./UserPageHeader";
import { sql } from "@/db";
import { getJWTPayload } from "@/app/utils/auth";

export default function UserPage({ params }: { params: { username: string } }) {
    return (
        <div>
            <UserPageHeader username={params.username} />
            <PostContainer username={params.username} />
        </div>
    );
}