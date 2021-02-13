import { FinTenLogin } from 'src/app/interfaces/fin-ten-login';
import { User } from '../user/user';

export class Session {
  public token: string;
  public user: User;

  constructor(data: FinTenLogin) {
    this.token = data.token;
    this.user = new User(data);
  }
}
