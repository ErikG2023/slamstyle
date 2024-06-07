"use server"

import { RegisterSchema } from "@/schema"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/data/user"
import db from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/token"


export const Register = async(values:z.infer<typeof RegisterSchema>) =>{
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return{
            error:"Invalid Fields"
        }
    }
    const {firstName,lastName,email,password,confirmPassword} = validatedFields.data;

    if(confirmPassword!==password){
        return{
            error:"Invalid Credentials"
        }
    }

    // Simulación de tiempo de procesamiento con setTimeout
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 segundos de retraso

    const hashedPassword = await bcrypt.hash(password,10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword,10);   


    //buscar email en bd
    const existingUser = await getUserByEmail(email);
    if(existingUser){
        return{
            error:"Email Already exists"
        }
    }


    await db.user.create({
        data:{
            name:firstName + " " + lastName,
            email,
            password:hashedPassword,
            confirm_password:hashedConfirmPassword,
        }
    })

    const verificationToken = await generateVerificationToken(email);

    //sending verification email
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )


    return {
        success: "Confirmation email sent"
    }   


}