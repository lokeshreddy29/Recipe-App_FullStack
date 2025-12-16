import prisma from "../prismaClient.js"
import bcrypt from "bcrypt"

const createAccount = async ({ name, email, password }) => {

    const doesUserAlreadyExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(doesUserAlreadyExist != null) return null

    const saltRounds = 10
    const passValHashed = bcrypt.hashSync(password, saltRounds)

    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: passValHashed
        }
    })

    return "created"
}

export default { createAccount }