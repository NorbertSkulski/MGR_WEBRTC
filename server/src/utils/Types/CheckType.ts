import { User } from "@prisma/client";

function checkIsUser(user: User | any): user is User {
    return Boolean((user as User).uuid);
}


export {checkIsUser};