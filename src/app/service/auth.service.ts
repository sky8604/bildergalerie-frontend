import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {tokenGetter} from '../app.module';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {
  }

  authorizeToken(): boolean {
    const token = tokenGetter();
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (e) {
      return false;
    }
  }

  getUserName(): string {
    let decodedJWT = this.decodeToken();
    return decodedJWT.userName;
  }

  private decodeToken(): any {
    let token = tokenGetter();
    return JSON.parse(window.atob(token.split('.')[1]));
  }
}
