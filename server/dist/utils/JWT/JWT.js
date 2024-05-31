import { sign } from "jsonwebtoken";
export const generateToken = (login) => {
    const opt = {
        expiresIn: `${process.env.JWT_EXPIRES}`, algorithm: "HS512"
    };
    return `${process.env.TOKEN_PREFIX} ${sign({ login }, `${process.env.SECRET_JWT}`, opt)}`;
};
