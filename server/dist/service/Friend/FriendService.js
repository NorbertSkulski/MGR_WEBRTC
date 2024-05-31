"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.contactList = void 0;
const Datadase_1 = require("../../database/Datadase");
const contactList = async (loggedUser) => {
    const findFirends = await Datadase_1.prisma.usersToUsers.findMany({ where: { OR: [{ userUuid: loggedUser.uuid }, { friendUuid: loggedUser.uuid }] }, include: { friend: true, user: true } });
    if (!findFirends) {
        return [];
    }
    return findFirends.flatMap(el => [el.user, el.friend]).flatMap(el => el).filter(el => el.uuid !== loggedUser.uuid);
};
exports.contactList = contactList;
const deleteContact = async (loggedUser, uuid) => {
    return Datadase_1.prisma.usersToUsers.deleteMany({ where: { OR: [{ userUuid: uuid, friendUuid: loggedUser.uuid }, { userUuid: loggedUser.uuid, friendUuid: uuid }] } });
};
exports.deleteContact = deleteContact;
