import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import apiController from '../controllers/apiController.js'

const router = express.Router()

router.get('/userRecipes', authMiddleware, apiController.getUserRecipes)
router.post('/saveCommunityRecipe', authMiddleware, apiController.saveCommunityRecipe)

export default router