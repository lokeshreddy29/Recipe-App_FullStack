import express from 'express'
const app = express()
import userServices from '../services/userServices.js'

const getUser = async (req, res) => {
    await userServices.createUser()

    res.status(201).send("success")
    
}

export default { getUser }