import { Request, Response } from "express"
import { db } from "../lib/prisma"

export const getUsers = async(req: Request, res: Response) => {
  try {

    const { page = 1, limit = 10 } = req.query

    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)


    const users = await db.user.findMany({
      skip,
      take,
      include: {
        orders: true
      }
    })

    const totalUsers = await db.user.count()
    const totalPages = Math.ceil(totalUsers / Number(limit))

    if(!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." })
    }

    return res.status(200).json({
      users,
      currentPage: Number(page),
      totalPages,
      totalUsers
    })
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}