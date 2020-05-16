import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Column } from 'src/app/modules/board/models/column';
import { ColumnSnapshot } from '../models/ColumnSnapshot';
import { Task } from 'src/app/modules/board/models/task';
import { ApiUrlBuilder, Models, Actions } from '../urlBuilder';


@Injectable({
  providedIn: 'root'
})

export class ColumnService {

  constructor(private http: HttpClient) { }

  public addColumn(column: any): Observable<any> {
    return this.http.post(ApiUrlBuilder.getUrl(Models.column, Actions.add), column);
  }

  public getColumnsByBoardId(id: string): Observable<Column[]> {
    const params = new HttpParams({
      fromObject: {id}
    });

    return this.http.get<Column[]>(ApiUrlBuilder.getUrl(Models.column, Actions.getColByBoardId), {params});
  }

  public addTask(task: Task): Observable<any> {
    return this.http.post<Task>(ApiUrlBuilder.getUrl(Models.task, Actions.add), task);
  }
  public updateTask(task: Task) {
    return this.http.put<Task>(ApiUrlBuilder.getUrl(Models.task, Actions.edit), task);
  }
  public deleteTask(task: Task, id: string) {
    const params = new HttpParams({
      fromObject: { id }
    });
    return this.http.delete(ApiUrlBuilder.getUrl(Models.task, Actions.delete), {params});
  }
  public deleteColumn(column: Column, id: string){
    const params = new HttpParams({
      fromObject: { id }
    });
    return this.http.delete(ApiUrlBuilder.getUrl(Models.column, Actions.delete), { params });
  }
  public reorderTask(column: Column) {
    column.tasks.forEach(x => {
      this.updateTask(x);
    });
  }
}
