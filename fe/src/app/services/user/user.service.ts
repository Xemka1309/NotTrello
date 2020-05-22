import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/user/models/user';
import {Participant} from '../../models/participant';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = '/api/user';
  private regUrl = `${this.baseUrl}/add`;
  private editUrl = `${this.baseUrl}/edit`;
  private logInUrl = `${this.baseUrl}/login`;
  private getUserByIdUrl = `${this.baseUrl}/get`;
  constructor(private http: HttpClient) {}

  public registerUser(user: User): Observable<any> {
    if (user) {
      return this.http.post<User>(this.regUrl, user, {
        observe: 'response'
      });
    }
  }

  public editUser(user: User): Observable<any> {
    if(user) {
      return this.http.put<User>(this.editUrl, user, {
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

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl);
  }

  public getUserById(id: string): Observable<User> {
    const params = new HttpParams({
      fromObject: {id}
    });

    return this.http.get<User>(this.getUserByIdUrl, {params});
  }
}
