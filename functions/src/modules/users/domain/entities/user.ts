
import {Email} from "./email";
import {Password} from "./password";

export class User {
  constructor(
        public readonly email: Email,
        public readonly password: Password,
        public readonly id?: string
  ) {}

  static register(email: Email, password: Password): User {
    return new User(email, password);
  }

  static rehydrate(id: string, email: Email, password: Password) {
    return new User(email, password, id);
  }
}
