export class User {
  public username: string;
  public email: string;

  constructor({ username, email }: { username: string; email: string }) {
    this.username = username;
    this.email = email;
  }

  toString(): string {
    return `${this.username} (${this.email})`;
  }
}
