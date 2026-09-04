import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productsRouter from './routes/products.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is alive' })
})

app.use('/api/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})