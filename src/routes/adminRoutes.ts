import { Router } from 'express'
import { loginAdmin, registerAdmin } from '../controllers/authController'
import { getProducts, registerProduct } from '../controllers/productsController'
import { authMiddlewareADM } from '../middlewares/authMiddleware'

const router = Router()


//Auth
router.post('/register', registerAdmin)
router.post('/login', loginAdmin)

//Product
router.get('/products', getProducts)
router.post('/products', authMiddlewareADM, registerProduct)

export default router