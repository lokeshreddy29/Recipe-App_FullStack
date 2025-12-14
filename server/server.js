import express from 'express'
import './src/routes/userRoutes'

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
  res.send("Hello world")
})

app.use('/api', userRoutes)

app.listen(PORT, () => {
  console.log(`app has begun on port ${PORT}`)
})
