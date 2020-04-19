import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Column } from 'src/app/modules/board/models/column';


@Injectable({
  providedIn: 'root'
})

export class ColumnService {
  private baseUrl = '/api/column';
  private getColumnsByBoardIdUrl = `${this.baseUrl}/getByBoardId`;

  constructor(private http: HttpClient) { }

  public getColumnsByBoardId(id: string): Observable<Column[]> {
    const params = new HttpParams({
      fromObject: {id}
    });

    return this.http.get<Column[]>(this.getColumnsByBoardIdUrl, {params});
  }
}
