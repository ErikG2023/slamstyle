"use server"
import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";
import { getVerificationTokenByToken } from "@/lib/token";

export const NewVerification = async(token:string) =>{
    console.log("*********server action***********");
    
    console.log({token});
    
    const existingToken = await getVerificationTokenByToken(token);
    
    if(!existingToken){
        return{
            error:"Token doesn't exist"
        }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if(hasExpired){
    return{
        error:"Token has expired"
    }
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return{
            error:"Email doesnt exist"
        }
    }

    await db.user.update({
        where:{
            id:existingUser.id
        },
        data:{
            emailVerified: new Date(),
            email: existingToken.email
        }
    })
    
    await db.verificationToken.delete({
        where:{
        id:existingToken.id
        }
    })

    return{
        success:"Email verified"
    }
}