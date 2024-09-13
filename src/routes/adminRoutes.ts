import { Router } from 'express'
import { loginAdmin, registerAdmin } from '../controllers/authController'
import { deleteProduct, registerProduct, updateProduct } from '../controllers/productsController'
import { authMiddlewareADM } from '../middlewares/authMiddleware'
import { getOrders } from '../controllers/orderController'
import { deleteCategory, registerCategory } from '../controllers/categoryController'
import { getUsers } from '../controllers/userInfoController'

const router = Router()


//Auth
router.post('/register', registerAdmin)
router.post('/login', loginAdmin)

//User
router.get('/users', authMiddlewareADM, getUsers)

//Product
router.post('/products', authMiddlewareADM, registerProduct)
router.put('/products/:id', authMiddlewareADM, updateProduct)
router.delete('/products/:id', authMiddlewareADM, deleteProduct)

//Order
router.get('/orders', authMiddlewareADM, getOrders)

//Categories
router.post('/categories', authMiddlewareADM, registerCategory)
router.delete('/categories/:id', authMiddlewareADM, deleteCategory)

export default router