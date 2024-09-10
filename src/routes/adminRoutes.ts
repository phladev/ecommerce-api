import { Router } from 'express'
import { loginAdmin, registerAdmin } from '../controllers/authController'
import { deleteProduct, getProducts, registerProduct, updateProduct } from '../controllers/productsController'
import { authMiddlewareADM } from '../middlewares/authMiddleware'
import { getOrders } from '../controllers/orderController'

const router = Router()


//Auth
router.post('/register', registerAdmin)
router.post('/login', loginAdmin)

//Product
router.get('/products', getProducts)
router.post('/products', authMiddlewareADM, registerProduct)
router.put('/products', authMiddlewareADM, updateProduct)
router.delete('/products/:id', authMiddlewareADM, deleteProduct)

//Order
router.get('/orders', authMiddlewareADM, getOrders)

export default router