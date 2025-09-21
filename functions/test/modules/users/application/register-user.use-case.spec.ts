import {UserRepository} from "@src/modules/users/domain/user-repository";
import {Email} from "@src/modules/users/domain/entities/email";
import {Password} from "@src/modules/users/domain/entities/password";
import {User} from "@src/modules/users/domain/entities/user";
import {
  RegisterUserUseCase,
} from "@src/modules/users/application/register-user.use-case";


jest.mock("@src/modules/users/domain/entities/password");

describe("RegisterUserUseCase", () => {
  let repo: jest.Mocked<UserRepository>;
  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    repo = {
      findByEmail: jest.fn(),
      save: jest.fn(),

    } as unknown as jest.Mocked<UserRepository>;

    useCase = new RegisterUserUseCase(repo);
    jest.clearAllMocks();
  });

  it("registers a new user when email does not exist", async () => {
    repo.findByEmail.mockResolvedValue(null);
    (Password.createPlain as jest.Mock).mockResolvedValue({
      getValue: () => "hashed-123",
    });

    repo.save.mockImplementation(async (u: User) => {
      return User.rehydrate(u.id ?? "u1", u.email, u.password);
    });

    const result =
        await useCase.execute({email: "test@mail.com", password: "secret"});


    const [[calledEmail]] = (repo.findByEmail as jest.Mock).mock.calls;
    expect(calledEmail).toBeInstanceOf(Email);
    expect(calledEmail.getValue()).toBe("test@mail.com");


    expect(Password.createPlain).toHaveBeenCalledWith("secret");
    expect(repo.save).toHaveBeenCalledTimes(1);
    const [[savedUser]] = (repo.save as jest.Mock).mock.calls;
    expect(savedUser).toBeInstanceOf(User);
    expect(savedUser.email.getValue()).toBe("test@mail.com");
    expect(savedUser.password.getValue()).toBe("hashed-123");
    expect(result)
      .toEqual({email: "test@mail.com"});
  });

  it("throws if email already exists", async () => {
    const email = new Email("test@mail.com");
    const password = new Password("has123");
    const existingUser = new User(email, password);
    repo.findByEmail.mockResolvedValue(existingUser);


    await expect(
      useCase.execute({email: "test@mail.com", password: "secret"})
    ).rejects.toThrow("User already exists");

    expect(repo.save).not.toHaveBeenCalled();
  });
});
