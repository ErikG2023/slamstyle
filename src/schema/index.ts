import { UserRole } from "@prisma/client";
import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Correo no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    code: z.optional(z.string()),
});

export type LoginFormInputs = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
    .object({
        firstName: z.string().min(1, "Nombre es requerido"),
        lastName: z.string().min(1, "Apellido es requerido"),
        email: z.string().email("Correo no es válido"),
        password: z
            .string()
            .min(6, "La contraseña debe tener al menos 6 caracteres"),
        confirmPassword: z
            .string()
            .min(6, "La confirmación de la contraseña es requerida"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export type RegisterFormInputs = z.infer<typeof RegisterSchema>;

export const ResetPasswordSchema = z.object({
    email: z.string().email("Correo no es válido"),
});

export type ResetPasswordFormInputs = z.infer<typeof ResetPasswordSchema>;

export const NewPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres.")
            .max(100, "La contraseña no puede tener más de 100 caracteres.")
            .regex(
                /[a-z]/,
                "La contraseña debe contener al menos una letra minúscula."
            )
            .regex(
                /[A-Z]/,
                "La contraseña debe contener al menos una letra mayúscula."
            )
            .regex(/[0-9]/, "La contraseña debe contener al menos un número."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"],
    });

export type NewPasswordFormInputs = z.infer<typeof NewPasswordSchema>;


export const SettingsSchema = z.object({
    name:z.string().min(1, "Nombre es requerido"),
    isTwoFactorEnabled:z.optional(z.boolean()),
    role:z.enum([UserRole.ADMIN,UserRole.USER]),
    email:z.optional(z.string().email()),
    password:z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6))
})

export type SettingFormInputs = z.infer<typeof SettingsSchema>;