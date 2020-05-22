import { Injectable} from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import {Task} from '../../models/task';
import { TaskMark } from 'src/app/models/task-mark';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = '/api/task';
  private addTaskUrl = `${this.baseUrl}/add`;
  private editTaskUrl = `${this.baseUrl}/edit`;
  private deleteTaskUrl = `${this.baseUrl}/delete`;
  private addMarkToTaskUrl = `${this.baseUrl}/tomark/add`;

  constructor(private http: HttpClient) { }

  public addTask(task: any) {
    return this.http.post<Task>(this.addTaskUrl, task, {
      observe: 'response'
    });
  }

  public updateTask(task: any) {
    return this.http.put<Task>(this.editTaskUrl, task, {
      observe: 'response'
    });
  }

  public deleteTask(id: string): Observable<any> {
    const params = new HttpParams({
      fromObject: { id }
    });
    return this.http.delete(this.deleteTaskUrl, {params});
  }

  public addMarkToTask(markId: string, taskId: string): Observable<any> {
    const markTask = {
      mark_id: markId,
      task_id: taskId
    };
    return this.http.post<TaskMark>(this.addMarkToTaskUrl, markTask);
  }
}
