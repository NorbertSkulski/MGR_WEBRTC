import { User } from "@prisma/client";

function checkIsUser(user: User | any): user is User {
    return Boolean(user) && Boolean(user.uuid);
}


export {checkIsUser};