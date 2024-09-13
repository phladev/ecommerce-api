import { Request, Response } from "express"
import { db } from "../lib/prisma"

export const getUsers = async(_req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      include: {
        orders: true
      }
    })

    if(!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." })
    }

    return res.status(200).json(users)
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}