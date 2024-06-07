"use server";
import { LoginSchema } from "@/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenfromEmail } from "@/data/two-factor-token";
import db from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null
) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid Fields",
        };
    }

    
    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (
        !existingUser?.email ||
        !existingUser ||
        !existingUser.password ||
        !bcrypt.compareSync(password, existingUser.password)
    ) {
        return {
            error: "Invalid Credentials",
        };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );
        return {
            success: "Confirmation email sent!",
        };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        
        
        if (code) {
            
            const twoFactorToken = await getTwoFactorTokenfromEmail(
                existingUser.email
            );

            if (!twoFactorToken) {
                return {
                    error: "Invalid Code",
                };
            }

            if (twoFactorToken.token !== code) {
                return {
                    error: "Invalid Code",
                };
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();
            if (hasExpired) {
                return {
                    error: "Code has expired",
                };
            }

            //finally remove the 2FA code and create the new 2FA token
            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id,
                },
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            );

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id,
                    },
                });
            }

            //finally if we dont have any case we will create
            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            });
        } else {

            const twoFactorToken = await generateTwoFactorToken(existingUser.email);

            await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
            return { twoFactor: true };
        }
    }

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result.error) {
            throw new AuthError(result.error);
        }

        return {
            success: "Logged in successfully!",
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        };

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid Credentials",
                    };
                default:
                    return {
                        error: "Something went wrong",
                    };
            }
        }
        throw error;
    }
};
