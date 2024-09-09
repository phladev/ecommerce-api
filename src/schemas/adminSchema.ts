import { z } from "zod"


export const registerAdminSchema = z.object({
  name: z.string().min(1, 'Name is required!'),
  email: z.string().email('Please enter a valid email!'),
  password: z.string().min(6, 'Please enter a valid password!')
})


export const loginAdminSchema = z.object({
  email: z.string().email('Please enter a valid email!'),
  password: z.string().min(6, 'Please enter a valid password!')
})