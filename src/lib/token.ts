import {v4 as uuidv4 }from "uuid";
import db from "@/lib/db";
import { getVerificationTokenByEmail } from "@/actions/verification-token";
import { getTwoFactorTokenfromEmail } from "@/data/two-factor-token";
import crypto from "crypto";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";


export const generatePasswordResetToken = async(email:string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getPasswordResetTokenByEmail(email);
    if(existingToken){
        await db.passwordResetToken.delete({
            where:{
                id:existingToken.id
            }
        })
    }
    const passwordReset = await db.passwordResetToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return passwordReset;
}

export const generateVerificationToken = async(email:string) =>{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);


    if(existingToken){
        await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
        })
    }


    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    }) 
    return verificationToken;
}

export const getVerificationTokenByToken = async(token:string) =>{
    
    try{
    const verificationToken = await db.verificationToken.findUnique({
        where:{
            token
        }
    })
    return verificationToken;
    }
    catch{
        return null;
    }
}

export const generateTwoFactorToken = async(email:string) => {
    const token = crypto.randomInt(100_000,1_000_000).toString();
    const expires = new Date(new Date().getTime() + 5*60*1000)
    //it turns the time of expiration to 5 minute 
    const existingToken = await getTwoFactorTokenfromEmail(email);
    if(existingToken){
        await db.twoFactorToken.delete({
            where:{
                id:existingToken.id
            }
        })
    }
    
    const twoFactorToken = db.twoFactorToken.create({
        data:{
            email,
            token,
            expires
        }
    })

    return twoFactorToken;
}