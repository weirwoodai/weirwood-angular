export class Login {
  public username: string;
  public password: string;

  constructor({ username, password }) {
    this.username = username || '';
    this.password = password || '';
  }
}
