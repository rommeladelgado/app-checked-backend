import * as admin from "firebase-admin";
import {db} from "@src/infra/db/firestore";
import {
  UserRepositoryImpl,
} from "@src/modules/users/infrastructure/user-repository-impl";
import {Email} from "@src/modules/users/domain/entities/email";
import {User} from "@src/modules/users/domain/entities/user";
import {Password} from "@src/modules/users/domain/entities/password";
import {UserRepository} from "@src/modules/users/domain/user-repository";
if (!admin.app.length) {
  admin.initializeApp({projectId: "tests"});
}

describe("UserRepositoryImpl test", () => {
  let repo: UserRepository;

  beforeEach(() => {
    repo = new UserRepositoryImpl();
  });


  afterEach(async () => {
    const docs = await db.collection("users").listDocuments();
    await Promise.all(docs.map((d) => d.delete()));
  });

  describe("findByEmail", () => {
    it("when user does not exist", async () => {
      const email = new Email("email.notExist@email.com");
      const user = await repo.findByEmail(email);
      expect(user).toBeNull();
    });

    describe("when user exist", function() {
      beforeEach(async () => {
        const email = new Email("email.exist@email.com");
        const password = new Password("123");
        const user = new User(email, password);
        await repo.save(user);
      });

      it("when email exist", async () => {
        const email = new Email("email.exist@email.com");
        const user = await repo.findByEmail(email);
        expect(user).not.toBeNull();
        expect(user?.email.getValue()).toBe("email.exist@email.com");
      });
    });
  });


  it("save(), when save user, working", async () => {
    const email = new Email("testing@email.com");
    const password = new Password("123");
    const user =new User(email, password);
    const userSaved = await repo.save(user);
    expect(userSaved?.email.getValue()).toBe("testing@email.com");
    expect(userSaved?.password.getValue()).toBe(password.getValue());
  });
});
