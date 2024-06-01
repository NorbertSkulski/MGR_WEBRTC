"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFriendRequest = exports.acceptFriendRequest = exports.friendRequestsLists = exports.friendRequest = exports.registration = void 0;
const Datadase_1 = require("../../database/Datadase");
const bcrypt_1 = require("bcrypt");
const CheckType_1 = require("../../utils/Types/CheckType");
const registration = async (user) => {
    return await Datadase_1.prisma.user.create({ data: { ...user, password: (0, bcrypt_1.hashSync)(user.password, 15) } });
};
exports.registration = registration;
const friendRequest = async (body) => {
    const toUser = await Datadase_1.prisma.user.findFirst({ where: { id: Number(body.toUserUuid) } });
    const fromUser = await Datadase_1.prisma.user.findFirst({ where: { uuid: body.fromUserUuid } });
    if (!(0, CheckType_1.checkIsUser)(toUser)) {
        throw "Wrong user id !";
    }
    if (!(0, CheckType_1.checkIsUser)(fromUser)) {
        throw "Wrong user id !";
    }
    if (fromUser.id === toUser.id) {
        throw "To id należy do zalogowanego użytkownika!";
    }
    const data = {
        fromUserUuid: body.fromUserUuid, toUserUuid: toUser.uuid
    };
    return await Datadase_1.prisma.friendRequest.create({ data: data });
};
exports.friendRequest = friendRequest;
const friendRequestsLists = async (body) => {
    return await Datadase_1.prisma.friendRequest.findMany({ where: { toUserUuid: body.logedUser.uuid }, include: { fromUser: true, toUser: true } });
};
exports.friendRequestsLists = friendRequestsLists;
const acceptFriendRequest = async (data) => {
    try {
        const { body } = data;
        await Datadase_1.prisma.friendRequest.deleteMany({ where: { fromUserUuid: body.fromUserUuid, toUserUuid: body.toUserUuid } });
        const isExist = await Datadase_1.prisma.usersToUsers.findFirst({ where: { OR: [{ userUuid: body.toUserUuid, friendUuid: body.fromUserUuid }, { userUuid: body.fromUserUuid, friendUuid: body.toUserUuid }] } });
        if (isExist)
            return isExist;
        return await Datadase_1.prisma.usersToUsers.create({ data: { userUuid: body.toUserUuid, friendUuid: body.fromUserUuid } });
    }
    catch (err) {
        throw err;
    }
};
exports.acceptFriendRequest = acceptFriendRequest;
const deleteFriendRequest = async (fromUserUuid, toUserUuid) => {
    try {
        return await Datadase_1.prisma.friendRequest.deleteMany({ where: { fromUserUuid: fromUserUuid, toUserUuid: toUserUuid } });
    }
    catch (err) {
        throw err;
    }
};
exports.deleteFriendRequest = deleteFriendRequest;
