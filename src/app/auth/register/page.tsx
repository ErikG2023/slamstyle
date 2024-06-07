import RegisterForm from '@/components/auth/RegisterForm'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <>
            <Suspense fallback={<div>Cargando...</div>}>
                <RegisterForm />
            </Suspense>
        </>
    )
}

export default page