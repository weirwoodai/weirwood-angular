import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentSessionService } from '../current-session/current-session.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(
    private router: Router,
    private currentSession: CurrentSessionService
  ) {}

  canActivate(): boolean {
    if (this.currentSession.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
