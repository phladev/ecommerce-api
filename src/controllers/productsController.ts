import { Request, Response } from 'express'
import {  editProductSchema, productIdSchema, productSchema } from '../schemas/productSchema'
import { db } from '../lib/prisma'


export const registerProduct = async(req: Request, res: Response ) => {
  try {
    const parsed = productSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const {name, price, imageUrl, description, discountPercentage, quantity, categories} = parsed.data

    const existingCategories = await db.category.findMany({
      where: { name: { in: categories } },
    })

    if (existingCategories.length !== categories.length) {
      return res.status(400).json({ message: 'Some categories do not exist.' });
    }

    const product = await db.product.create({
      data: {
        name,
        price,
        description,
        discountPercentage,
        imageUrl,
        quantity,
        categories: {
          connect: existingCategories.map(category => ({ id: category.id })),
        },
      },
      include: {
        categories: true
      }
    })
    res.status(201).json(product)
  } catch(error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, name, minPrice, maxPrice, category, hasDiscount  } = req.query

    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {}

    if (name) {
      filters.name = {
        contains: String(name),
        mode: "insensitive",
      }
    }

    if (minPrice) {
      filters.price = {
        gte: Number(minPrice),
      }
    }

    if (maxPrice) {
      filters.price = {
        ...filters.price,
        lte: Number(maxPrice),
      }
    }

    if (category) {
      filters.categories = {
        some: {
          name: String(category),
        },
      }
    }

    if (hasDiscount === 'true') {
      filters.discountPercentage = {
        gt: 0,
      }
    }

    const where = Object.keys(filters).length > 0 ? filters : undefined

    const products = await db.product.findMany({
      where,
      skip,
      take,
      include: {
        categories: {
          select: {
            name: true
          }
        }
      }
    })

    const totalProducts = await db.product.count({
      where,
    })

    const totalPages = Math.ceil(totalProducts / Number(limit))

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found." })
    }

    return res.status(200).json({
      products,
      currentPage: Number(page),
      totalPages,
      totalProducts,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const updateProduct = async(req: Request, res: Response) => {
  try {
    const parsed = editProductSchema.safeParse(req.body)
    const parsedParams = productIdSchema.safeParse(req.params)

    if (!parsedParams.success) {
      return res.status(400).json({ errors: parsedParams.error.errors[0].message })
    }

    const { id } = parsedParams.data

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const { name, price, imageUrl, description, discountPercentage, quantity, categories } = parsed.data

    const existingCategories = await db.category.findMany({
      where: { name: { in: categories } },
    })

    if (existingCategories.length !== categories.length) {
      return res.status(400).json({ message: 'Some categories do not exist.' })
    }

    const product = await db.product.findUnique({
      where: { id },
      include: { categories: true },
    })

    if (!product) {
      return res.status(404).json({ message: "Product not found." })
    }

    await db.product.update({
      where: { id },
      data: {
        categories: {
          disconnect: product.categories.map(category => ({ id: category.id })),
        },
      },
    })

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        discountPercentage,
        imageUrl,
        quantity,
        categories: {
          connect: existingCategories.map(category => ({ id: category.id })),
        },
      },
      include: {
        categories: true,
      },
    })

    return res.status(200).json({ message: "Product updated successfully.", product: updatedProduct })
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async(req: Request, res: Response) => {
  try {
    const parsed = productIdSchema.safeParse(req.params)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const { id } = parsed.data

    const product = await db.product.findUnique({where: {id}})

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    await db.product.delete({where: {id}})
    return res.status(200).json({ message: "Product deleted successfully." })
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}