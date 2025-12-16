import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = 3000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())

app.use('/api', userRoutes)

app.use('/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`app has begun on port ${PORT}`)
})
