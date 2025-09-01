import { z } from "zod"

const SignInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" })
    .max(30, { message: "Password must be at most 20 characters long" }),
})

export default SignInSchema
