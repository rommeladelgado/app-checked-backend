import {
  UserRepositoryImpl,
} from "@src/modules/users/infrastructure/user-repository-impl";
import {
  NextFunction, Response, Request,
} from "express";
import {
  RegisterUserUseCase,
} from "@src/modules/users/application/register-user.use-case";
import {
  LoginUserUseCase,
} from "@src/modules/users/application/login-user.use-case";
import {getErrorMessage} from "@src/api/http/helpers/error-message";

const userRepository = new UserRepositoryImpl();
async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;
    const registerUserUseCase = new RegisterUserUseCase(userRepository);
    const authResponse = await registerUserUseCase.execute({email, password});
    res.status(201).json(authResponse);
  } catch (e: unknown) {
    const errorMessage = getErrorMessage(e);
    if (errorMessage === "User already exists") {
      return res.status(409).json({error: errorMessage});
    }
    next(e);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;
    const loginUserUseCase = new LoginUserUseCase(userRepository);
    const authResponse = await loginUserUseCase.execute({email, password});
    res.status(200).json(authResponse);
  } catch (e: unknown) {
    const errorMessage = getErrorMessage(e);
    if (errorMessage === "Invalid credentials") {
      return res.status(401).json({error: errorMessage});
    }
    next(e);
  }
}

export {register, login};
