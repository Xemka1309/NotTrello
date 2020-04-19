import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from 'src/app/modules/bords/models/board';

@Injectable({
  providedIn: 'root'
})

export class BoardService {
  private baseUrl = '/api/board';
  private getBordTypesUrl = `${this.baseUrl}/get/types`;
  private getBoardsUrl = `${this.baseUrl}/get/boards`;
  private createBordUrl = `${this.baseUrl}/add`;
  private getBoardByIdUrl = `${this.baseUrl}/board`;

  constructor(private http: HttpClient) { }

  public createBord(board: Board): Observable<any> {
    if (board) {
      return this.http.post<Board>(this.createBordUrl, board, {
        observe: 'response'
      });
    }
  }

  public getBoardTypes(): Observable<any> {
    return this.http.get(this.getBordTypesUrl);
  }

  public getBoards(): Observable<any> {
    return this.http.get<any>(this.getBoardsUrl);
  }

  public getBoardById(): Observable<any> {
    return this.http.get<any>(this.getBoardByIdUrl);
  }
}