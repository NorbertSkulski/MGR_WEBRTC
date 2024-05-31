import { prisma } from "../../database/Datadase";
const contactList = async (loggedUser) => {
    const findFirends = await prisma.usersToUsers.findMany({ where: { OR: [{ userUuid: loggedUser.uuid }, { friendUuid: loggedUser.uuid }] }, include: { friend: true, user: true } });
    if (!findFirends) {
        return [];
    }
    return findFirends.flatMap(el => [el.user, el.friend]).flatMap(el => el).filter(el => el.uuid !== loggedUser.uuid);
};
const deleteContact = async (loggedUser, uuid) => {
    return prisma.usersToUsers.deleteMany({ where: { OR: [{ userUuid: uuid, friendUuid: loggedUser.uuid }, { userUuid: loggedUser.uuid, friendUuid: uuid }] } });
};
export { contactList, deleteContact };
