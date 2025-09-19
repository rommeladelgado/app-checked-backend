// src/modules/users/domain/password.ts
import * as bcrypt from "bcrypt";


export class Password {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static async createPlain(password: string): Promise<Password> {
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    const hash = await bcrypt.hash(password, 10);
    return new Password(hash);
  }

  static fromHash(hash: string): Password {
    return new Password(hash);
  }

  async compare(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.value);
  }

  getValue(): string {
    return this.value;
  }
}
