export class SignUp {
  username: string;
  email: string;
  password: string;
  recaptcha: string;

  constructor({ username, email, password, recaptcha }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.recaptcha = recaptcha;
  }
}
