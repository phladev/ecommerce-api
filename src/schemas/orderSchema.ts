import { z } from "zod";

export const orderSchema = z.object({
  userId: z.string().min(1, { message: 'Please enter the userId!' }),
  items: z.array(
    z.object({
      productId: z.string().min(1, { message: 'Product ID must be a valid string!' }),
      quantity: z.number().min(1, { message: 'Quantity must be at least 1!' }),
    })
  ).min(1, { message: 'Please provide at least one product with quantity!' }),
})

export const getUserOrderSchema = z.object({
  userId: z.string().min(1, { message: 'Please enter the userId!' }),
})
