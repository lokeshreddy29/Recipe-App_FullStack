import bcrypt from 'bcrypt'
import prisma from '../prismaClient.js'

const createUser = async () => {
    const saltRounds = 10
    var hashedPassword = bcrypt.hashSync("ASDFeuro", saltRounds)
    await prisma.user.create({
        data: {
            name: "vijay",
            email: "lokeshr3ddyyyy@test.com",
            password: hashedPassword
        }
    })
}



export default { createUser }