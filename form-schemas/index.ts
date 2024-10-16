import * as z from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const registerSchema = z.object({
    name: z.string().min(3, { message: 'The name must be at least 3 characters!' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "password must be at least 8 characters")
      .refine((password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
          password
        );
      }, "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."),
      
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",  
  path: ["confirmPassword"],});