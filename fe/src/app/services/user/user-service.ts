import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/user/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = '/api';
  private regUrl = `${this.baseUrl}/user/add`;
  private logInUrl = `${this.baseUrl}/user/login`;
  constructor(private http: HttpClient) {}

  public registerUser(user: User): Observable<any> {
    if (user) {
      return this.http.post<User>(this.regUrl, user, {
        observe: 'response'
      });
    }

  }

  public logIn(login: string, password: string): Observable<any> {
    if (login && password) {
      const info = {
        login,
        password
      };
      return this.http.post<any>(this.logInUrl, info, {
        observe: 'response'
      });
    }

  }
}
