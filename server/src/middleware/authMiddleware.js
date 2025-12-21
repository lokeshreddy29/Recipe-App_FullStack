import * as jose from "jose"

const authMiddleware = async (req, res, next) => {
  const token = await req.headers.authorization
  if(!token) res.status(403).json({message: "Access token not found"})

  const tokenArray = token.split(' ')
  if(tokenArray[0] !== 'Bearer') res.status(403).json({message: "Invalid token"})
  

  const publicKey = await jose.importSPKI(process.env.JWT_PUBLIC_KEY, "ES256")
  const { payload } = await jose.jwtVerify(tokenArray[1], publicKey, {
    issuer: "urn:example:issuer",
    audience: "urn:example:audience",
  })

  req.userID = payload.id
  
  next()
}

export default authMiddleware
