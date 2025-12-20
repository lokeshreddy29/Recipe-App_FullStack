import prisma from "../prismaClient.js"
import bcrypt from "bcrypt"
import * as jose from "jose"

const createAccount = async ({ name, email, password }) => {
  try {
    const doesUserAlreadyExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    if (doesUserAlreadyExist) return null

    const saltRounds = 10
    const passValHashed = bcrypt.hashSync(password, saltRounds)

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passValHashed,
      },
    })

    const privateKey = await jose.importPKCS8(
      process.env.JWT_PRIVATE_KEY,
      "ES256"
    )
    const AccessToken = await new jose.SignJWT({
      email: email,
      name: name,
    })
      .setProtectedHeader({ alg: "ES256" })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(privateKey)

    return AccessToken

  } catch (err) {
    return err
  }
}

const signIn = async ({ email, password }) => {
  try {
    const doesUserExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    if (!doesUserExist) return {status: 401, message: "Incorrect credentials"}

    const userDetails = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    const passwordValidation = bcrypt.compareSync(
      password,
      userDetails.password
    )
    if (!passwordValidation) return {status: 401, message: "Incorrect credentials"}

    const privateKey = await jose.importPKCS8(
      process.env.JWT_PRIVATE_KEY,
      "ES256"
    )
    const AccessToken = await new jose.SignJWT({
      email: email,
      id: userDetails.id,
    })
      .setProtectedHeader({ alg: "ES256" })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(privateKey)

    return AccessToken
  } catch (err) {
    return err
  }
}

export default { createAccount, signIn }
