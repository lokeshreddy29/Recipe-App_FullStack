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

    const userID = await prisma.user.findUnique({
      select: {
        id: true,
      },
      where : {
        email: email,
      },
    })

    const privateKey = await jose.importPKCS8(
      process.env.JWT_PRIVATE_KEY,
      "ES256"
    )
    const accessToken = await new jose.SignJWT({
      email: email,
      id: userID,
    })
      .setProtectedHeader({ alg: "ES256" })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("15 minutes")
      .sign(privateKey)

    return {
      UserName: name,
      UserID: userID,
      AccessToken: accessToken,
    }

  } catch (err) {
    return err
  }
}

const signIn = async ({ email, password }) => {
  try {
    
    const userDetails = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    if (!userDetails) return {status: 401, message: "Incorrect credentials"}

    const passwordValidation = bcrypt.compareSync(
      password,
      userDetails.password
    )
    if (!passwordValidation) return {status: 401, message: "Incorrect credentials"}

    const privateKey = await jose.importPKCS8(
      process.env.JWT_PRIVATE_KEY,
      "ES256"
    )
    const accessToken = await new jose.SignJWT({
      email: email,
      id: userDetails.id,
    })
      .setProtectedHeader({ alg: "ES256" })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("15 minutes")
      .sign(privateKey)

    return {
      UserName: userDetails.name,
      UserID: userDetails.id,
      AccessToken: accessToken,
    }
  } catch (err) {
    return err
  }
}

export default { createAccount, signIn }
