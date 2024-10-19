import * as z from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
const phoneRegex =
  /^(\+\d{1,3}\s?)?(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/;


const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "The name must be at least 3 characters!" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const hotelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().regex(phoneRegex, {
    message: "Please enter a valid phone number.",
  }),
  email: z.string().regex(emailRegex, {
    message: "Please enter a valid email address.",
  }),
  owner: z.string().min(1, "Owner is required"),
  images: z.array(z.string()).min(1).nonempty(),
  location: z.string().min(1, "Location is required"),
});
