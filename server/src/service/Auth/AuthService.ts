import { User } from "@prisma/client";
import { generateToken } from "../../utils/JWT/JWT";
import { prisma } from "../../database/Datadase";
import { loginError } from "../../utils/Errors/Errors";
import { compare } from "bcrypt";

type Atuh_Credentials = {
    login: string,
    password: string
}

const login = async  (atuhCredentials: Atuh_Credentials) => {
    
    const user:User|null = await prisma.user.findFirst({where:{login:atuhCredentials.login}});
    if(!user)
        throw loginError;

    const match:boolean = await compare(atuhCredentials.password,user.password);

    if(!match)
        throw loginError;
    
    return {token:generateToken(user.login), userlogin:user.login};
}


export { login };