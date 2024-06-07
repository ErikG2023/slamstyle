import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { Suspense } from "react"

const NewPassword = () => {
    return (
        <div>
            <Suspense fallback={<div>Cargando...</div>}>
                <NewPasswordForm />
            </Suspense>
        </div>
    )
}
export default NewPassword