import { Request, Response } from 'express'
import { deleteProductSchema, editProductSchema, productSchema } from '../schemas/productSchema'
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

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const products = await db.product.findMany({
      skip,
      take,
    });

    const totalProducts = await db.product.count();
    const totalPages = Math.ceil(totalProducts / Number(limit));

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }

    return res.status(200).json({
      products,
      currentPage: Number(page),
      totalPages,
      totalProducts,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateProduct = async(req: Request, res: Response) => {
  try {
    const parsed = editProductSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const {id, name, price, imageUrl, description, discountPercentage, quantity} = parsed.data

    const product = await db.product.findUnique({
      where: { id },
    })

    if (!product) {
      return res.status(404).json({ message: "Product not found." })
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        name,
        price,
        imageUrl,
        description,
        discountPercentage,
        quantity,
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
    const parsed = deleteProductSchema.safeParse(req.params)

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