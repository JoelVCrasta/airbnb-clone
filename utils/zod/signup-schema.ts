import { z } from "zod"

export const SignupSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "Minimum 2 characters are required" })
    .max(20, { message: "Maximum of 20 characters are allowed" })
    .regex(/^[a-zA-Z]+$/, { message: "Only letters are allowed" }),

  lastname: z
    .string()
    .min(2, { message: "Minimum 2 characters are required" })
    .max(20, { message: "Maximum of 20 characters are allowed" })
    .regex(/^[a-zA-Z]+$/, { message: "Only letters are allowed" }),

  username: z
    .string()
    .min(2, { message: "Minimum 2 characters are required" })
    .max(20, { message: "Maximum of 20 characters are allowed" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Only letters, numbers, and underscores are allowed",
    }),

  email: z.email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 30 characters long" }),
})
