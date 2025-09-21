import {RegisterUserRequest} from "./models/register-user-request";
import {RegisterUserResponse} from "./models/register-user-response";
import {UserRepository} from "../domain/user-repository";
import {Email} from "../domain/entities/email";
import {Password} from "../domain/entities/password";
import {User} from "../domain/entities/user";
import {UseCase} from "@src/shared/application/use-case";
export class RegisterUserUseCase
implements UseCase<RegisterUserRequest, RegisterUserResponse> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const emailValueObject = new Email(request.email);

    const existing = await this.userRepository.findByEmail(emailValueObject);
    if (existing) throw new Error("User already exists");

    const password = await Password.createPlain(request.password);

    const user = new User(emailValueObject, password);

    await this.userRepository.save(user);

    return {
      email: user.email.getValue(),
    };
  }
}
