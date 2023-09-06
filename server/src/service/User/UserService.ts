import { User } from "../../model/Models/User";

const registration = async (user: User) => {
    const newUser: User = new User({ ...user });
    return await newUser.save()
}

export { registration }