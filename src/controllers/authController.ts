import { Request, Response } from 'express'
import { userSchema } from '../schemas/userSchema'
import bcrypt from 'bcryptjs'
import { db } from '../lib/prisma'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const parsed = userSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const { name, email, password } = parsed.data

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await db.user.create({data: {name, email, password: hashedPassword}})
    res.status(201).json(user)
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}