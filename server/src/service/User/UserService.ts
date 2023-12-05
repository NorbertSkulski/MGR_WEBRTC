import { User } from "@prisma/client";
import { prisma } from "../../database/Datadase";

const registration = async (user: User) : Promise<User> => {
    
  return await prisma.user.create({data:user});;
}

export { registration }