import { SignOptions, sign } from "jsonwebtoken"



export const generateToken = (login: String): String => {

    const opt: SignOptions = {
        expiresIn: `${process.env.JWT_EXPIRES}`, algorithm: (process.env.JWT_ALGORITHM as Algorithm|any)
    }

    return `${process.env.TOKEN_PREFIX} ${sign({ login }, `${process.env.SECRET_JWT}`, opt)}`
}