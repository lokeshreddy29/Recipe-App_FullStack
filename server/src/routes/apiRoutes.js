import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import apiController from '../controllers/apiController.js'

const router = express.Router()

router.get('/userRecipes', authMiddleware, apiController.getUserRecipes)

export default router