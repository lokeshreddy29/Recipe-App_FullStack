import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import * as jose from 'jose'

const app = express()
const PORT = 3000

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

//Routes
app.use('/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`app has begun on port ${PORT}`)
})



//jose test

// const { privateKey, publicKey } = await jose.generateKeyPair('ES256', {
//   extractable: true
// })
// console.log(privateKey)
// console.log(publicKey)
// const publicPem = await jose.exportSPKI(publicKey)
// const privatePem = await jose.exportPKCS8(privateKey)
// console.log(privatePem)
// console.log(publicPem)
// const payloadObj = JSON.stringify({id: '112'})
// const jws = await new jose.FlattenedSign(
//   new TextEncoder().encode(payloadObj),
// )
//   .setProtectedHeader({ alg: 'ES384' })
//   .sign(privateKey)

// console.log(jws)

// const compactJWS = jws.protected + "." + jws.payload + "." + jws.signature



// const { payload, protectedHeader } = await jose.compactVerify(compactJWS, publicKey)
// // console.log(protectedHeader)
// const decodedId = JSON.parse(new TextDecoder().decode(payload))
// console.log(decodedId.id)

const privateKey = await jose.importPKCS8(
  process.env.JWT_PRIVATE_KEY,
  'ES256'
)
// console.log(privateKey)
const publicKey = await jose.importSPKI(
  process.env.JWT_PUBLIC_KEY,
  'ES256'
)

const jwt = await new jose.SignJWT({ email: 'lokeshr3ddy@gmail.com' })
  .setProtectedHeader({ alg: 'ES256' })
  .setIssuedAt()
  .setIssuer('urn:example:issuer')
  .setAudience('urn:example:audience')
  .setExpirationTime('2h')
  .sign(privateKey)

// console.log(jwt)


const { payload, protectedHeader, error } = await jose.jwtVerify(jwt, publicKey, {
  issuer: 'urn:example:issuer',
  audience: 'urn:example:audience',
})

// console.log(payload)
// console.log(protectedHeader)