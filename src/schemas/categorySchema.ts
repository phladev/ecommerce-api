import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(1, 'Category must have a name!')
})

export const deleteCategorySchema = z.object({
  id: z.string().min(1, 'Category must have a name!')
})