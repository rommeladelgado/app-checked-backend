import {UserRepositoryImpl} from "../../../modules/users/infrastructure/user-repository-impl";
import {NextFunction, Response, Request} from "express";
import {RegisterUserUseCase} from "../../../modules/users/application/register-user.use-case";
import {LoginUserUseCase} from "../../../modules/users/application/login-user.use-case";

const userRepository = new UserRepositoryImpl();

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;
    const loginUserUseCase = new RegisterUserUseCase(userRepository);
    const authResponse = await loginUserUseCase.execute({email, password});
    res.json(authResponse);
  } catch (e) {
    next(e);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;
    const loginUserUseCase = new LoginUserUseCase(userRepository);
    const authResponse = await loginUserUseCase.execute({email, password});
    res.json(authResponse);
  } catch (e) {
    next(e);
  }
}

export {
  register,
  login,
};
