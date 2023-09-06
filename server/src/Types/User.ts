import {User as AppUser} from "../model/models/User";

declare global {
    namespace Express {
        class User extends AppUser {}
    }
}