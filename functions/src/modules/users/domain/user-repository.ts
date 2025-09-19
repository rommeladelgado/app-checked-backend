import {User} from "./entities/user";
import {Email} from "./entities/email";

export interface UserRepository {
    save(user: User): Promise<User | null>;
    findByEmail(email: Email): Promise<User | null> ;
}
