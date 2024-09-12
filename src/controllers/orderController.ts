import { Request, Response } from "express"
import { db } from "../lib/prisma"
import { orderSchema } from "../schemas/orderSchema"


interface UserRequest extends Request {
  user?: {
    id: string;
  };
}

export const createOrder = async (req: Request, res: Response) => {
  try {

    const parsed = orderSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const { userId, productIds } = parsed.data

    const userExists = await db.user.findUnique({
      where: { id: userId },
    })

    if (!userExists) {
      return res.status(404).json({ message: "User not found." })
    }

    const products = await db.product.findMany({
      where: {
        id: { in: productIds },
      },
    })

    if (products.length !== productIds.length) {
      return res.status(404).json({ message: "Some products not found." })
    }

    const order = await db.order.create({
      data: {
        userId,
        products: {
          connect: productIds.map((id: string) => ({ id })),
        },
      },
      include: {
        products: true,
        User: true,
      },
    })

    return res.status(201).json(order)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query

    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    const orders = await db.order.findMany({
      skip,
      take,
      include: {
        User: true,
        products: true,
      },
    })

    const totalOrders = await db.order.count()
    const totalPages = Math.ceil(totalOrders / Number(limit))

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found." })
    }

    return res.status(200).json({
      orders,
      currentPage: Number(page),
      totalPages,
      totalOrders,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const getUserOrders = async (req: UserRequest, res: Response) => {
  try {
    if(!req.user) {
      return res.status(401).json({ message: "Unauthorized access" })
    }

    const userId = req.user.id

    const { page = 1, limit = 10 } = req.query

    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    const orders = await db.order.findMany({
      where: {
        userId,
      },
      skip,
      take,
      include: {
        products: true,
      },
    })

    const totalOrders = await db.order.count({
      where: {
        userId,
      },
    })
    const totalPages = Math.ceil(totalOrders / Number(limit))

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." })
    }

    return res.status(200).json({
      orders,
      currentPage: Number(page),
      totalPages,
      totalOrders,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}
