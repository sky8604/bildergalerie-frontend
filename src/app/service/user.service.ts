import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  private readonly baseURL = 'http://localhost:8080/bbc-jsf-skeleton-1.0.0/user';

  public signUp(email: string, userName: string, password: string): Observable<User> {

    return this.httpClient.post<User>(this.baseURL + '/signup', {
      email,
      userName,
      password
    });
  }

  public signIn(email: string, password: string): Observable<loginDTO> {
    return this.httpClient.post<loginDTO>(this.baseURL + '/signin', {
      email,
      password
    })
  }
}

interface loginDTO {
  userName: string;
  email: string;
  token: string;
}
