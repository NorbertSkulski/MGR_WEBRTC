import { User, Permission, Status } from "@prisma/client";
import { generateToken } from "../../utils/JWT/JWT";
import { prisma } from "../../database/Datadase";
import { loginError } from "../../utils/Errors/Errors";
import { compare } from "bcrypt";
import { cloneDeep } from "lodash";

type Atuh_Credentials = {
    login: string,
    password: string
}

type UserDataType = {
    uuid: string
    email: string
    id: number
    name: string
    lastName: string
    phone: string | null
    login: string
    admin: boolean
    deleted: boolean
    banned: boolean
    password?: string
    permissions: Permission[]
    status: Status
}

const login = async (atuhCredentials: Atuh_Credentials) => {
    try {
        const user: User | null = await prisma.user.findFirst({ where: { login: atuhCredentials.login } ,include: { friendOf:true, friends: true, friendRequestFrom:true, friendRequestTo:true },});
        if (!user)
            throw loginError;

        const match: boolean = await compare(atuhCredentials.password, user.password);

        if (!match)
            throw loginError;

        const userData: UserDataType = cloneDeep(user);
        delete userData.password;

        return { token: generateToken(user.login), userData: userData };
    } catch (err) {
        console.error(err);
        throw loginError;
    }
}


export { login };