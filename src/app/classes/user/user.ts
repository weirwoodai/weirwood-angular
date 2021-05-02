import { FinTenLogin } from 'src/app/interfaces/fin-ten-login';

export class User {
  public username: string;
  public email: string;
  public isPremium: boolean;

  constructor({ username, email, isPremium }: FinTenLogin) {
    this.username = username;
    this.email = email;
    this.isPremium = isPremium;
  }

  toString(): string {
    return `${this.username} (${this.email})`;
  }
}
