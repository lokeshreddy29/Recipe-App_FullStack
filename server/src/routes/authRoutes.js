import express from 'express'
const router = express.Router()
import authController from '../controllers/authController.js'

router.post('/createAccount', authController.createAccount)

export default router