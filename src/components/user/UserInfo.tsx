import { ExtendedUser } from "@/next-auth"


interface UserInfoProps {
    user?: ExtendedUser
    label?: string
}

const UserInfo = ({
    user,
    label
}: UserInfoProps) => {
    return (
        <div className="w-[390px] md:w-[600px] backdrop-blur-sm ">
            <h2>{label}</h2>
            <div className="space-y-4">
                <div className="flex flex-row items-center justify-between border p-3 shadow-sm rounded-lg">
                    <span>UserID</span>
                    <p className="truncate text-xs max-w-[180px]
            font-mono p-1 bg-accent rounded-md cursor-pointer">{user?.id}</p>
                </div>
                <div className="flex flex-row items-center justify-between border p-3 shadow-sm rounded-lg">
                    <span>Name</span>
                    <p className="truncate text-xs max-w-[180px]
            font-mono p-1 bg-accent rounded-md cursor-pointer">{user?.name}</p>
                </div>
                <div className="flex flex-row items-center justify-between border p-3 shadow-sm rounded-lg">
                    <span>Role</span>
                    <p className="truncate text-xs max-w-[180px]
            font-mono p-1 bg-accent rounded-md cursor-pointer">{user?.role}</p>
                </div>
                <div className="flex flex-row items-center justify-between border p-3 shadow-sm rounded-lg">
                    <span>Email</span>
                    <p className="truncate text-xs max-w-[180px]
            font-mono p-1 bg-accent rounded-md cursor-pointer">{user?.email}</p>
                </div>
                <div className="flex flex-row items-center justify-between
            border p-3 shadow-sm rounded-lg">
                    <span>2FA Enabled</span>
                    <p className="truncate text-xs max-w-[200px]
            font-mono p-1 bg-accent rounded-md cursor-pointer">
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;