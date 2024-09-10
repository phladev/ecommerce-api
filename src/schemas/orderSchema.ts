import { z } from "zod";

export const orderSchema = z.object({
  userId: z.string().min(1, { message: 'Please enter the userId!' }),
  productIds: z
    .array(z.string().min(1, { message: 'Product ID must be a valid string!' }))
    .min(1, { message: 'Please provide at least one product ID!' }),
});
