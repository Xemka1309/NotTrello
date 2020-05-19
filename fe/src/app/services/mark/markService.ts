import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Mark} from "../../modules/mark/models/mark";

@Injectable({
  providedIn: 'root'
})

export class MarkService {
  private baseUrl = '/api/mark';
  private getMarkByIdUrl = `${this.baseUrl}/get`;
  private createMarkUrl = `${this.baseUrl}/add`;
  private updateMarkUrl = `${this.baseUrl}/edit`;
  private deleteMarkUrl = `${this.baseUrl}/delete`;

  constructor(private http: HttpClient) {
  }

  public createMark(mark: Mark): Observable<any> {
    if (mark) {
      return this.http.post<Mark>(this.createMarkUrl, mark, {
        observe: 'response'
      });
    }
  }

  public updateMark(mark: Mark): Observable<any> {
    if (!mark) {
      return;
    }
    return this.http.put<Mark>(this.updateMarkUrl, mark,{
      observe: 'response'
    })
  }

  public getMarkById(id: string): Observable<Mark> {
    const params = new HttpParams({
      fromObject: {id}
    });
    console.log(this.getMarkByIdUrl);

    return this.http.get<Mark>(this.getMarkByIdUrl, {params});
  }
}
