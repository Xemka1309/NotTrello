import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JoinBoardService {
  private baseUrl = '/api/join/';

  constructor(private http: HttpClient) {
  }

  public tryJoin(hash: string): Observable<string> {
    return this.http.get<string>(this.baseUrl + hash);
  }
}
