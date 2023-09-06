import { User as AppUser } from "../model/Models/User";

declare global {
    namespace Express {
        class User extends AppUser { }
    }
}