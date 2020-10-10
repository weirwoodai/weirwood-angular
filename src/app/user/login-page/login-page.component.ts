import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/classes/session/session';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CurrentSessionService } from 'src/app/services/current-session/current-session.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(public currentSession: CurrentSessionService) {}

  ngOnInit(): void {}

  onSuccessfulAuthentication(event: Session) {
    this.currentSession.setCurrentSession(event);
  }
}
