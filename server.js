import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import './config/db.js'
import authRoutes from './routes/AuthRoutes.js'
import productRoutes from './routes/ProductRoutes.js'
import cookieParser from 'cookie-parser';
dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || '*' ,
  credentials: true
}))
app.use(cookieParser())

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/products",productRoutes)
app.get('/', (req, res) => {
  res.send('API is running')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
