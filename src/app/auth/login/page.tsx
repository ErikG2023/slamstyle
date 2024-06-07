import LoginForm from '@/components/auth/LoginForm'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <>
            <Suspense fallback={<div>Cargando...</div>}>
                <LoginForm />
            </Suspense >
        </>
    )
}

export default page