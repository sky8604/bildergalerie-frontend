import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {AlertService} from "../components/alert";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {}

  canActivate(): boolean {
    if (this.authService.authorizeToken()) {
      return true;
    }
    this.alertService.error('Du musst eingeloggt sein, um diese Seite zu laden.', {
      autoClose: false,
      keepAfterRouteChange: true
    })
    this.router.navigateByUrl('/signin');
    return false;
  }
}
