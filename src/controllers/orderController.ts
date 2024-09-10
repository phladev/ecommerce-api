import { Request, Response } from "express";
import { db } from "../lib/prisma";
import { orderSchema } from "../schemas/orderSchema";


export const createOrder = async (req: Request, res: Response) => {
  try {

    const parsed = orderSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const { userId, productIds } = req.body;

    const userExists = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    const products = await db.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    if (products.length !== productIds.length) {
      return res.status(404).json({ message: "Some products not found." });
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
    });

    return res.status(201).json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
