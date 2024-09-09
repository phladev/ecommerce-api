import { Router } from 'express'
import { loginAdmin, registerAdmin } from '../controllers/authController'
import { deleteProduct, getProducts, registerProduct } from '../controllers/productsController'
import { authMiddlewareADM } from '../middlewares/authMiddleware'

const router = Router()


//Auth
router.post('/register', registerAdmin)
router.post('/login', loginAdmin)

//Product
router.get('/products', getProducts)
router.post('/products', authMiddlewareADM, registerProduct)
router.delete('/products/:id', authMiddlewareADM, deleteProduct)

export default router