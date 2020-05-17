import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Actions, ApiUrlBuilder, Models} from '../urlBuilder';
import {Column} from 'src/app/modules/column/models/column';
import { Task } from 'src/app/modules/task/models/task';


@Injectable({
  providedIn: 'root'
})

export class ColumnService {

  constructor(private http: HttpClient) { }

  public addColumn(column: Column): Observable<any> {
    if (!column) {
      return;
    }
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

  public taskMoved(prevPos: number, currentPos: number, task: Task){
    task.position = currentPos;
    this.updateTask(task);
  }

  public deleteTask(task: Task, id: string) {
    const params = new HttpParams({
      fromObject: { id }
    });
    return this.http.delete(ApiUrlBuilder.getUrl(Models.task, Actions.delete), {params});
  }

  public updateColumn(column: Column) {
    if (!column) {
      return;
    }
    return this.http.put<Column>(ApiUrlBuilder.getUrl(Models.task, Actions.edit), column);
  }
  public deleteColumn(column: Column, id: string) {
    if (!column || !id) {
      return;
    }
    const params = new HttpParams({
      fromObject: { id }
    });
    return this.http.delete(ApiUrlBuilder.getUrl(Models.column, Actions.delete), { params });
  }

  public reorderColumn(column: Column) {
    if (!column) {
      return;
    }

    column.tasks.forEach(x => {
      this.updateTask(x);
    });
  }
}
