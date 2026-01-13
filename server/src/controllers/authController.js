import authServices from "../services/authServices.js"

const createAccount = async (req, res) => {
  const { name, email, password } = req.body
  const createAccountServiceResponse = await authServices.createAccount({ name, email, password })

  if(createAccountServiceResponse === null) res.status(409).json({ message: 'user already exists' })
  if(createAccountServiceResponse) res.status(201).json(createAccountServiceResponse)
}

const signIn = async (req, res) => {
  const { email, password } = req.body
  const signInServiceResponse = await authServices.signIn({ email, password })

  if(signInServiceResponse.status === 401) res.status(401).json({ message: 'incorrect credentials' })
  res.status(200).json(signInServiceResponse)
}

export default { createAccount, signIn }
