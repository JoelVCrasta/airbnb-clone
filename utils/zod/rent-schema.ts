import { z } from "zod"

export const rentSchema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  guestCount: z.number().min(1, { message: "Guest count must be at least 1" }),
  roomCount: z.number().min(1, { message: "Room count must be at least 1" }),
  bathroomCount: z
    .number()
    .min(1, { message: "Bathroom count must be at least 1" }),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one image is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z
    .number()
    .min(1, { message: "Price must be at least 1" })
    .max(100000, { message: "Price must be at most 100000" }),
})
