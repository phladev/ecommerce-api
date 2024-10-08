import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api', userRoutes)
app.use('/api/admin', adminRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
