import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/classes/session/session';
import { User } from 'src/app/classes/user/user';

@Injectable({
  providedIn: 'root'
})
export class CurrentSessionService {
  private storage: Storage;
  private currentSession: Session | null = null;

  private readonly STORED_SESSION = 'FinTenSession';

  constructor(private router: Router) {
    this.storage = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.storage.setItem(this.STORED_SESSION, JSON.stringify(session));
  }

  private loadSessionData(): Session {
    const storedSession = JSON.parse(this.storage.getItem(this.STORED_SESSION));
    return storedSession
      ? new Session(storedSession.token, new User(storedSession.user))
      : null;
  }

  getCurrentSession(): Session | null {
    return this.currentSession;
  }

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

  removeCurrentSession(): void {
    this.storage.removeItem(this.STORED_SESSION);
    this.currentSession = null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentToken() !== null;
  }

  getCurrentUser(): User {
    const session = this.getCurrentSession();
    return session !== null ? session.user : null;
  }

  getCurrentToken(): string {
    const session = this.getCurrentSession();
    return session && session.token ? session.token : null;
  }
}
