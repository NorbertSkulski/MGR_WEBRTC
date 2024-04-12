import { SignOptions, sign } from "jsonwebtoken"



export const generateToken = (login: String): String => {

    const opt: SignOptions = {
        expiresIn: `${process.env.JWT_EXPIRES}`, algorithm: "HS512"
    }

    return `${process.env.TOKEN_PREFIX} ${sign({ login }, `${process.env.SECRET_JWT}`, opt)}`
}