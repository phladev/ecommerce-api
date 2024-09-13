import { Request, Response } from "express"
import { categorySchema, deleteCategorySchema } from "../schemas/categorySchema"
import { db } from "../lib/prisma"

export const registerCategory = async(req: Request, res: Response ) => {
  try {
    const parsed = categorySchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const {name} = parsed.data


    const category = await db.category.create({data: {name} })
    res.status(201).json(category)
  } catch(error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}

export const deleteCategory = async(req: Request, res: Response ) => {
  try {
    const parsed = deleteCategorySchema.safeParse(req.params)

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors[0].message })
    }

    const { id } = parsed.data

    const category = await db.category.findUnique({where: {id}})

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    await db.category.delete({where: {id}})
    return res.status(200).json({ message: "Category deleted successfully." })
  } catch (error) {
    if(error instanceof Error)
    res.status(500).json({ message: error.message })
  }
}

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await db.category.findMany({})

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found." })
    }

    return res.status(200).json({
      categories,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}