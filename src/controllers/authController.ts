import { Request, Response } from 'express'
import { loginUserSchema, registerUserSchema } from '../schemas/userSchema'
import { db } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { loginAdminSchema, registerAdminSchema } from '../schemas/adminSchema'

//User

export const registerUser = async (req: Request, res: Response) => {
  try {
    const parsed = registerUserSchema.safeParse(req.body)

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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const parsed = loginUserSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const { email, password } = parsed.data

    const user = await db.user.findUnique({where: {email}})

    if(!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
    res.status(200).json({ token })
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}

//Admin

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const parsed = registerAdminSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const { name, email, password } = parsed.data

    const hashedPassword = await bcrypt.hash(password, 12)

    const admin = await db.admin.create({data: {name, email, password: hashedPassword}})
    res.status(201).json(admin)
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const parsed = loginAdminSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const { email, password } = parsed.data

    const admin = await db.admin.findUnique({where: {email}})

    if(!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
    res.status(200).json({ token })
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}