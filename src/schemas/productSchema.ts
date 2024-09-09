import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1, 'Please enter a name to your product!'),
  quantity: z.number().positive().min(1, 'Please enter the quantity of your product!'),
  price: z.number().positive().min(0.01, 'Please enter a price to your product!'),
  discountPercentage: z.number().positive().min(0).max(100),
  imageUrl: z.string(),
  description: z.string()
    .min(50, 'The description must have at least 50 characters.')
    .max(2000, 'The description must not exceed 2000 characters.'),
})

export const editProductSchema = z.object({
  id: z.string().min(1, 'Please enter the product id!'),
  name: z.string().min(1, 'Please enter a name to your product!'),
  quantity: z.number().positive().min(1, 'Please enter the quantity of your product!'),
  price: z.number().positive().min(0.01, 'Please enter a price to your product!'),
  discountPercentage: z.number().positive().min(0).max(100),
  imageUrl: z.string(),
  description: z.string()
    .min(50, 'The description must have at least 50 characters.')
    .max(2000, 'The description must not exceed 2000 characters.'),
})

export const deleteProductSchema = z.object({
  id: z.string().min(1, 'Please enter the product id!')
})
