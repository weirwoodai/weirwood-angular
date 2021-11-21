import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Login } from 'src/app/classes/login/login';
import { Session } from 'src/app/classes/session/session';
import { SignUp } from 'src/app/classes/signup/sign-up';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';

enum FormType {
  LOG_IN = 'Log in',
  SIGN_UP = 'Sign up',
  RESET = 'Reset'
}
@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;
  recaptchaKey = environment.recaptchaKey;

  type: FormType = FormType.SIGN_UP;
  loading = false;

  serverMessage: string;

  @Output() successfulAuthentication = new EventEmitter<Session>();

  constructor(private auth: AuthenticationService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.required]],
      passwordConfirm: ['', []],
      recaptcha: ['', []]
    });
  }

  get FormType() {
    return FormType;
  }

  changeType(val: FormType): void {
    this.addEmailValidators();
    this.addUsernameValidators();

    if (val === FormType.LOG_IN) {
      this.removeEmailValidators();
    }

    if (val === FormType.RESET) {
      this.removeUsernameValidators();
    }

    this.type = val;
  }

  recaptchaResult(event: string): void {
    console.log({ event });
  }

  private removeUsernameValidators() {
    this.removeFieldValidators(this.username);
  }

  private removeEmailValidators() {
    this.removeFieldValidators(this.email);
  }

  private removeFieldValidators(field: AbstractControl) {
    field.setValidators([]);
    field.updateValueAndValidity();
  }

  private addUsernameValidators() {
    this.addFieldValidators(this.username, [Validators.required]);
  }

  private addEmailValidators() {
    this.addFieldValidators(this.email, [Validators.required, Validators.email]);
  }

  private addFieldValidators(
    field: AbstractControl,
    validators: ((control: AbstractControl) => ValidationErrors)[]
  ) {
    field.setValidators(validators);
    field.updateValueAndValidity();
  }

  get isLogin(): boolean {
    return this.type === FormType.LOG_IN;
  }

  get isSignup(): boolean {
    return this.type === FormType.SIGN_UP;
  }

  get isPasswordReset(): boolean {
    return this.type === FormType.RESET;
  }

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get recaptcha() {
    return this.form.get('recaptcha');
  }

  get passwordDoesMatch(): boolean {
    if (this.type !== FormType.SIGN_UP) return true;

    return this.password.value === this.passwordConfirm.value;
  }

  get recaptchaValid(): boolean {
    if (this.type !== FormType.SIGN_UP) return true;

    return this.recaptcha.valid && !this.recaptcha.pristine;
  }

  async onSubmit() {
    try {
      this.loading = true;

      const username = this.username.value;
      const email = this.email.value;
      const password = this.password.value;
      const recaptcha = this.recaptcha.value;

      if (this.isLogin) {
        const session = await this.auth.login(new Login({ username, password }));
        this.successfulAuthentication.emit(session);
      }

      if (this.isSignup) {
        const signup = new SignUp({ username, email, password, recaptcha });
        const session = await this.auth.signup(signup);
        this.successfulAuthentication.emit(session);
      }

      if (this.isPasswordReset) {
        throw new Error('Unsupported operation!');
      }
    } catch (e) {
      console.log(e);
      this.serverMessage = e.error.error || e.toString();
    } finally {
      this.loading = false;
    }
  }
}
