import { generateToken } from "../../utils/JWT/JWT";
import { prisma } from "../../database/Datadase";
import { loginError } from "../../utils/Errors/Errors";
import { compare } from "bcrypt";
import { cloneDeep } from "lodash";
const login = async (atuhCredentials) => {
    try {
        const user = await prisma.user.findFirst({ where: { login: atuhCredentials.login }, include: { friendOf: true, friends: true, friendRequestFrom: true, friendRequestTo: true }, });
        if (!user)
            throw loginError;
        const match = await compare(atuhCredentials.password, user.password);
        if (!match)
            throw loginError;
        const userData = cloneDeep(user);
        delete userData.password;
        return { token: generateToken(user.login), userData: userData };
    }
    catch (err) {
        console.error(err);
        throw loginError;
    }
};
export { login };
