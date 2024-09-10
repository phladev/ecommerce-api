import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/authController'
import { getProducts } from '../controllers/productsController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { createOrder } from '../controllers/orderController'

const router = Router()

//Auth

router.post('/register', registerUser)
router.post('/login', loginUser)

//Shop
router.get('/products', getProducts)
router.post('/orders', authMiddleware, createOrder)

export default router