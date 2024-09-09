import { Router } from 'express'
import { loginAdmin, registerAdmin } from '../controllers/authController'
import { registerProduct } from '../controllers/productsController'
import { authMiddlewareADM } from '../middlewares/authMiddleware'

const router = Router()

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.post('/products', authMiddlewareADM, registerProduct)

export default router