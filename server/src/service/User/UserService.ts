import { User } from "@prisma/client";
import { prisma } from "../../database/Datadase";
import { hashSync } from "bcrypt";

const registration = async (user: User) : Promise<User> => {
  return await prisma.user.create({data:{...user,password:hashSync(user.password, 15)}});;
}

export { registration }