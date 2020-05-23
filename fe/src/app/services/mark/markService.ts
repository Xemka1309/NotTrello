import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Mark} from '../../models/mark';
import {Task} from '../../models/task';

@Injectable({
  providedIn: 'root'
})

export class MarkService {
  private baseUrl = '/api/mark';
  private getMarkByIdUrl = `${this.baseUrl}/get`;
  private getMarksByBoardIdUrl = `${this.baseUrl}/getByBoardId`;
  private createMarkUrl = `${this.baseUrl}/add`;
  private addMarkArrayUrl = `${this.baseUrl}/addArray`;
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
    return this.http.put<Mark>(this.updateMarkUrl, mark, {
      observe: 'response'
    });
  }

  public deleteMark(markId): Observable<any> {
    if (!markId) {
      return;
    }
    const params = new HttpParams({
      fromObject: { id: markId }
    });
    return this.http.delete(this.deleteMarkUrl, {params, observe: 'response'});
  }

  public getMarkById(id: string): Observable<Mark> {
    const params = new HttpParams({
      fromObject: {id}
    });

    return this.http.get<Mark>(this.getMarkByIdUrl, {params});
  }

  public getMarksByBoardId(id: string): Observable<Mark[]> {
    const params = new HttpParams({
      fromObject: {id}
    });

    return this.http.get<Mark[]>(this.getMarksByBoardIdUrl, {params});
  }

  public addMarkArray(marks: Mark[]): Observable<any>{
    return this.http.post<Mark[]>(this.addMarkArrayUrl, marks,{observe: 'response'})
  }
}
