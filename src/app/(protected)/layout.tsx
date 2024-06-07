import { NavbarComponent } from "@/components/Navbar";

const ProtectedLayout = ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <>
            {/* <div className="h-full w-full flex flex-col items-center justify-center gap-y-10 "> */}
            <NavbarComponent />
            {children}
            {/* </div> */}
        </>
    );
}

export default ProtectedLayout;