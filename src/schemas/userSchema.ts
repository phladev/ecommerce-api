import { z } from 'zod'

export const registerUserSchema = z.object({
  name: z.string().min(1, 'Name is required!'),
  email: z.string().email('Please enter a valid email!'),
  password: z.string().min(6, 'Please enter a valid password!')
})

export const loginUserSchema = z.object({
  email: z.string().email('Please enter a valid email!'),
  password: z.string().min(6, 'Please enter a valid password!')
})