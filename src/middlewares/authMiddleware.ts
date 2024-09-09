import { Admin, User } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { db } from "../lib/prisma"

interface AuthRequest extends Request  {
  user?: User
}

interface AuthRequestADM extends Request  {
  admin?: Admin
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === 'object' && 'id' in decoded) {
      const user = await db.user.findUnique({ where: { id: (decoded as JwtPayload).id } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export const authMiddlewareADM = async (req: AuthRequestADM, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === 'object' && 'id' in decoded) {
      const admin = await db.admin.findUnique({ where: { id: (decoded as JwtPayload).id } });

      if (!admin) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.admin = admin;
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}