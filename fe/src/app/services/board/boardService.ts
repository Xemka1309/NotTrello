import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Board} from '../../modules/board/models/board';
import {ColumnService} from '../column/columnService';

@Injectable({
  providedIn: 'root'
})

export class BoardService {
  private baseUrl = '/api/board';
  private getBordTypesUrl = `${this.baseUrl}/get/types`;
  private getBoardsUrl = `${this.baseUrl}/get/boards`;
  private createBordUrl = `${this.baseUrl}/add`;
  private getBoardByIdUrl = `${this.baseUrl}/get/board`;

  constructor(private http: HttpClient, private columnService: ColumnService) {
  }

  public createBoard(board: Board): Observable<any> {
    if (board) {
      return this.http.post<Board>(this.createBordUrl, board, {
        observe: 'response'
      });
    }
  }

  public updateBoard(board: Board): Observable<any> {
    if (!board) {
      return;
    }
    return this.http.put<Board>(this.baseUrl + '/edit', board);
  }

  public reorderBoard(board: Board) {
    if (!board || !board.columns) {
      return;
    }
    board.columns.forEach(col => {
      this.columnService.updateColumn(col);
    });
  }

  public getBoardTypes(): Observable<any> {
    return this.http.get(this.getBordTypesUrl);
  }

  public getBoards(): Observable<any> {
    return this.http.get<any>(this.getBoardsUrl);
  }

  public getBoardById(id: string): Observable<Board> {
    const params = new HttpParams({
      fromObject: {id}
    });
    console.log(this.getBoardByIdUrl);

    return this.http.get<Board>(this.getBoardByIdUrl, {params});
  }
}
