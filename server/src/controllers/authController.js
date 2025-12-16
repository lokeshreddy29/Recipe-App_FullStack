import authServices from "../services/authServices.js"

const createAccount = async (req, res) => {
  console.log("method:", req.method)
  console.log("headers:", req.headers["content-type"])
  console.log("body:", req.body)

  const { name, email, password } = req.body
  const serviceResponse = await authServices.createAccount({ name, email, password })

  if(serviceResponse === null) {
    res.status(409).json({message: 'user already exists'})
  }
  if(serviceResponse === "created") {
    res.status(201).send('user created')
  }
}

export default { createAccount }
