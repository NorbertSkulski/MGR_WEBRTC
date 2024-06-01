import { FriendRequest, User } from "@prisma/client";
import { prisma } from "../../database/Datadase";
import { hashSync } from "bcrypt";
import { checkIsUser } from "../../utils/Types/CheckType";

type FriendRequestType = {
  fromUserUuid: string
  toUserUuid: number
}

type FriendRequestListsBodyType = {
  logedUser: User
}

type AcceptFriendRequestType = {
  body: FriendRequest
}

const registration = async (user: User): Promise<User> => {
  return await prisma.user.create({ data: { ...user, password: hashSync(user.password, 15) } });
}

const friendRequest = async (body: FriendRequestType): Promise<FriendRequest> => {

  const toUser = await prisma.user.findFirst({ where: { id: Number(body.toUserUuid) } })
  const fromUser = await prisma.user.findFirst({ where: { uuid: body.fromUserUuid } })


  if (!checkIsUser(toUser)) {
    throw "Wrong user id !";
  }

  if (!checkIsUser(fromUser)) {
    throw "Wrong user id !";
  }

  if (fromUser.id === toUser.id) {
    throw "To id należy do zalogowanego użytkownika!"
  }

  const data = {
    fromUserUuid: body.fromUserUuid, toUserUuid: toUser.uuid
  }

  return await prisma.friendRequest.create({ data: data })
}

const friendRequestsLists = async (body: FriendRequestListsBodyType) => {
  return await prisma.friendRequest.findMany({ where: { toUserUuid: body.logedUser.uuid }, include: { fromUser: true, toUser: true } });
}


const acceptFriendRequest = async (data: AcceptFriendRequestType) => {
  try {
    const { body } = data;

    await prisma.friendRequest.deleteMany({ where: { fromUserUuid: body.fromUserUuid, toUserUuid: body.toUserUuid } });
    const isExist = await prisma.usersToUsers.findFirst({ where: { OR: [{ userUuid: body.toUserUuid, friendUuid: body.fromUserUuid }, { userUuid: body.fromUserUuid, friendUuid: body.toUserUuid }] } });
    if (isExist)
      return isExist;

    return await prisma.usersToUsers.create({ data: { userUuid: body.toUserUuid, friendUuid: body.fromUserUuid } });

  } catch (err) {
    throw err;
  }
}

const deleteFriendRequest = async (fromUserUuid: string,toUserUuid:string) => {
  try {
    return await prisma.friendRequest.deleteMany({ where: { fromUserUuid: fromUserUuid, toUserUuid: toUserUuid } });
  } catch (err) {
    throw err;
  }
}

export { registration, friendRequest, friendRequestsLists, acceptFriendRequest, deleteFriendRequest }