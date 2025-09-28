import { isEmailExist } from "services/auth/auth.service";
import { z } from "zod";
//fullname, email, password, confirmPassword
const emailSchema =
    z.string().email("Email không đúng định dạng ")
        .refine(async (email) => {
            const existingUser = await isEmailExist(email);
            return !existingUser
        }, {
            message: "Email already exists",
            path: ["email"],
        })



const passwordSchema = z
    .string()
    .min(3, { message: "Password Tối thiểu 3 kí tự " })
    .max(20, { message: "Password tối đa 20 kí tự " })



export const RegisterSchema = z.object({
    fullname: z.string().trim().min(1, { message: "Tên Không được để trống" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password confirm kg chính xác ",
    path: ['confirmPassword']
});


export type TRegisterSchema = z.infer<typeof RegisterSchema>;