import { User } from "../../model/models/User";

const registration = async (user: User) => {
    const newUser: User = new User({ ...user });
    return await newUser.save()
}

export { registration }