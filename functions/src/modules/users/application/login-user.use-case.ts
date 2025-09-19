import {JwtService} from "../../../shared/security/JwtService.js";
import {AuthRequest} from "./models/auth-request";
import {UserRepository} from "../domain/user-repository";
import {Email} from "../domain/entities/email";
import {Password} from "../domain/entities/password";
import {UseCase} from "../../../shared/application/use-case";
import {AuthResponse} from "./models/auth-response";


export class LoginUserUseCase implements UseCase<AuthRequest, AuthResponse> {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(request: AuthRequest) {
    const emailValueObject = new Email(request.email);
    const user = await this.userRepository.findByEmail(emailValueObject);
    if (!user) throw new Error("Invalid credentials");

    const passwordValueObjet = await Password.createPlain(request.password);
    const ok = passwordValueObjet.compare(user.password.getValue());
    if (!ok) throw new Error("Invalid credentials");

    const payload = {sub: user.id};
    const accessToken = JwtService.signAccess(payload);
    const refreshToken = JwtService.signRefresh({sub: user.id});

    return {
      accessToken,
      refreshToken,
      user: {email: user.email.getValue()},
    } as AuthResponse;
  }
}
