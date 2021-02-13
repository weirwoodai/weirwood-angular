import { FinTenLogin } from 'src/app/interfaces/fin-ten-login';

export class User {
  public username: string;
  public email: string;

  constructor({ username, email }: FinTenLogin) {
    this.username = username;
    this.email = email;
  }

  toString(): string {
    return `${this.username} (${this.email})`;
  }
}
