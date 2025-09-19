// src/modules/users/domain/task.ts
export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid email format");
    }
    this.value = value.toLowerCase();
  }

  private isValid(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
