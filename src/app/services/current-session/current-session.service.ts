import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/classes/session/session';
import { User } from 'src/app/classes/user/user';

@Injectable({
  providedIn: 'root'
})
export class CurrentSessionService {
  private currentSession: Session | null = null;

  private readonly STORED_SESSION = 'FinTenSession';

  constructor(private router: Router) {}

  setCurrentSession(session: Session): void {
    this.currentSession = session;
  }

  getCurrentSession(): Session | null {
    return this.currentSession;
  }

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

  removeCurrentSession(): void {
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
