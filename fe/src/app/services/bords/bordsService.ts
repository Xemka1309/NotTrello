import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/user/models/user';

@Injectable({
  providedIn: 'root'
})
export class BordsService {
  private baseUrl = '/api';
  private getBordTypesUrl = `${this.baseUrl}/board/get/types`;
  constructor(private http: HttpClient) { }

  public registerUser(user: User): Observable<any> {
    if (user) {
      return this.http.post<User>(this.getBordTypesUrl, user, {
        observe: 'response'
      });
    }

  }

  public getBordTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.getBordTypesUrl);
  }

}
