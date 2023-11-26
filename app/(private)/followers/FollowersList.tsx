import LoadingSVG from "@/app/components/LoadingSVG";
import User from "@/app/components/User";
import useSWR from "swr";

function FollowersList({ index }: { index: number }) {
    const { data: userData } = useSWR("/api/users/profile");
    const { data: followerData } = useSWR(
        () => "/api/users/" + userData.data.id + "/followers?page=" + index
    );

    if (!followerData) return <div className="flex flex-row justify-center items-center mb-4"><LoadingSVG /></div>;

    return (
        <ul>
            {followerData.data.map((user: UserI) => {
                return (
                    <li className="my-5" key={user.id}>
                        <User user={user} />
                    </li>
                );
            })}
        </ul>
    );
}

export default FollowersList;