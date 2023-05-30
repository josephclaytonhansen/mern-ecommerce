import express from 'express'
import productRoutes from './routes/productRoutes.js'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
const port = process.env.PORT || 5000

const app = express()
connectDB()

app.get("/", (req, res) => {
    res.send("API is running")
})

app.use("/api/products", productRoutes)
app.use(notFound)

app.listen(port, () => {console.log(`Server running on port ${port}`)})