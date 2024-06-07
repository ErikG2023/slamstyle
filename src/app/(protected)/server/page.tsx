"use"
import UserInfo from "@/components/user/UserInfo";
import { CurrentUser } from "@/lib/auth";


const ServerPage = async () => {
    const user = await CurrentUser();
    return (
        <>
            <UserInfo user={user} label="Server Component 🖥️"/>

        </>
    );
}

export default ServerPage;