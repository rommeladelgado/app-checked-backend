import {UserRepository} from "@src/modules/users/domain/user-repository";
import {
  LoginUserUseCase,
} from "@src/modules/users/application/login-user.use-case";
import {Email} from "@src/modules/users/domain/entities/email";
import {Password} from "@src/modules/users/domain/entities/password";
import {User} from "@src/modules/users/domain/entities/user";
import {JwtService} from "@src/shared/security/JwtService";


jest.mock("@src/shared/security/JwtService");
jest.mock("@src/modules/users/domain/entities/password");

describe("LoginUserUseCase", () => {
  let repo: jest.Mocked<UserRepository>;
  let useCase: LoginUserUseCase;

  beforeEach(() => {
    repo = {
      findByEmail: jest.fn(),
      save: jest.fn(),
      // add other methods if your interface requires them
    } as unknown as jest.Mocked<UserRepository>;

    useCase = new LoginUserUseCase(repo);

    jest.clearAllMocks();
  });

  function createUserMock(
    opts?: Partial<{ id: string; email: string; password: string }>
  ) {
    const id = opts?.id ?? "u1";
    const email = new Email(opts?.email ?? "test@mail.com");
    const password = new Password(opts?.password ?? "hashed123");
    return new User(email, password, id);
  }

  it("should authenticate and return tokens when credentials are valid",
    async () => {
      const user = createUserMock();
      repo.findByEmail.mockResolvedValue(user);

      (Password.createPlain as jest.Mock).mockResolvedValue({
        compare: jest.fn().mockReturnValue(true),
      });

      (JwtService.signAccess as jest.Mock)
        .mockReturnValue("access.jwt.token");
      (JwtService.signRefresh as jest.Mock)
        .mockReturnValue("refresh.jwt.token");


      const result = await useCase.
        execute({email: "test@mail.com", password: "secret"});


      const [[argEmail]] = (repo.findByEmail as jest.Mock).mock.calls;
      expect(argEmail).toBeInstanceOf(Email);
      expect(argEmail.getValue()).toBe("test@mail.com");

      expect(Password.createPlain).toHaveBeenCalledWith("secret");
      expect(JwtService.signAccess).toHaveBeenCalledWith({sub: "u1"});
      expect(JwtService.signRefresh).toHaveBeenCalledWith({sub: "u1"});

      expect(result).toEqual({
        accessToken: "access.jwt.token",
        refreshToken: "refresh.jwt.token",
        user: {email: "test@mail.com"},
      });
    });

  it("should throw if user is not found", async () => {
    repo.findByEmail.mockResolvedValue(null);

    await expect(
      useCase.execute({email: "missing@mail.com", password: "x"})
    ).rejects.toThrow("Invalid credentials");

    expect(Password.createPlain).not.toHaveBeenCalled();
    expect(JwtService.signAccess).not.toHaveBeenCalled();
  });

  it("should throw if password does not match", async () => {
    const user = createUserMock({email: "test@mail.com"});
    repo.findByEmail.mockResolvedValue(user);

    (Password.createPlain as jest.Mock).mockResolvedValue({
      compare: jest.fn().mockReturnValue(false),
    });

    await expect(
      useCase.execute({email: "test@mail.com", password: "bad"})
    ).rejects.toThrow("Invalid credentials");

    expect(JwtService.signAccess).not.toHaveBeenCalled();
  });
});
