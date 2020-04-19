import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bord } from 'src/app/modules/bords/models/bord';

@Injectable({
  providedIn: 'root'
})

export class BordsService {
  private baseUrl = '/api';
  private getBordTypesUrl = `${this.baseUrl}/board/get/types`;
  private getBordsUrl = `${this.baseUrl}/board/get/boards`;
  private createBordUrl = `${this.baseUrl}/board/add`;
  constructor(private http: HttpClient) { }

  public createBord(bord: Bord): Observable<any> {
    if (bord) {
      return this.http.post<Bord>(this.createBordUrl, bord, {
        observe: 'response'
      });
    }
  }

  public getBordTypes(): Observable<any> {
    return this.http.get<string[]>(this.getBordTypesUrl);
  }

  public getBords(): Observable<any> {
    return this.http.get<any>(this.getBordsUrl);
  }

}
