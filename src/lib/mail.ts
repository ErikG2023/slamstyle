
import {Resend} from "resend";

const resend = new Resend(
    process.env.RESEND_API_KEY
)

const url = process.env.NEXTAUTH_URL;


export const sendVerificationEmail = async(email:string,token:string) =>{
    const confirmLink = `${url}/auth/new-verification?token=${token}`;
    console.log(confirmLink);
    
    console.log("Sent mail from here")
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Confirm your email",
        html:`<p> Click <a href = "${confirmLink}"> here </a> to confirm email. </p>`
    })
}

export const sendTwoFactorEmail = async(email:string,token:string) => {
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"2FA Code",
        html:`<p>Your 2FA Code: ${token}</p>`
    })
}

export const sendPasswordResetEmail = async(email:string,token:string) => {
    const resetLink = `${url}/auth/new-password?token=${token}`
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Reset your password",
        html:`<p> Click <a href = "${resetLink}"> here </a> to confirm password. </p>`
    })
}