import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import * as jose from 'jose'

const app = express()
const PORT = 3000

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
//

//Routes
app.use('/auth', authRoutes)
app.use('/api', apiRoutes)
//




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

const jwt2 = 'eyJhbGciOiJFUzI1NiJ9.eyJlbWFpbCI6Imxva2VzaHIzZGR5QGdtYWlsLmNvbSIsImlkIjoxNjYsImlhdCI6MTc2NjI5NTc0OSwiaXNzIjoidXJuOmV4YW1wbGU6aXNzdWVyIiwiYXVkIjoidXJuOmV4YW1wbGU6YXVkaWVuY2UiLCJleHAiOjE3NjYzMDI5NDl9.BfZri2QvxUst7lX0OAFknPo6o_4ifJibjKRj8gZvTHY8BAh9PgJlYob4RByp1_jKT7jrUGG5Fb_aMR6zxnhqMw'

// const { payload, protectedHeader, error } = await jose.jwtVerify(jwt2, publicKey, {
//   issuer: 'urn:example:issuer',
//   audience: 'urn:example:audience',
// })

// console.log(payload)
// console.log(protectedHeader)