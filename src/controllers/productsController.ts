import { Request, Response } from 'express'
import { productSchema } from '../schemas/productSchema'
import { db } from '../lib/prisma'


export const registerProduct = async(req: Request, res: Response ) => {
  try {
    const parsed = productSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const {name, price, imageUrl, description, discountPercentage, quantity} = parsed.data


    const product = await db.product.create({data: {name, price, description, discountPercentage, imageUrl, quantity,} })
    res.status(201).json(product)
  } catch(error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}