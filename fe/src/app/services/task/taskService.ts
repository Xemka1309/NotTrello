import { Injectable} from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import {Task} from '../../models/task';
import { TaskMark } from 'src/app/models/task-mark';
import { Observable } from 'rxjs';
import {CheckList} from '../../models/check-list';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = '/api/task';
  private getTaskUrl = `${this.baseUrl}/get`;
  private addTaskUrl = `${this.baseUrl}/add`;
  private addTaskArrayUrl = `${this.baseUrl}/addArray`;
  private editTaskUrl = `${this.baseUrl}/edit`;
  private deleteTaskUrl = `${this.baseUrl}/delete`;
  private addMarkToTaskUrl = `${this.baseUrl}/tomark/add`;
  private deleteMarkToTaskUrl = `${this.baseUrl}/tomark/delete`;

  private checkListUrl = '/api/checklist';
  private addCheckListArrayUrl = `${this.checkListUrl}/addArray`;

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

  public deleteMarkToTask(markId: string, taskId: string): Observable<any> {
    const params = new HttpParams({
      fromObject: { markId, taskId }
    });
    return this.http.delete(this.deleteMarkToTaskUrl, {params, observe: 'response'});
  }

  public setTaskPriority(taskId: string, priorityId: string): Observable<any> {
    const taskToUpdate = {id: taskId, task_priority_id: priorityId};
    return this.http.put(this.editTaskUrl, taskToUpdate, {observe: 'response'});
  }

  public addTaskArray(tasks: Task[]): Observable<any>{
    return this.http.post<Task[]>(this.addTaskArrayUrl, tasks,{observe: 'response'})
  }

  public addCheckListArray(checkLists: CheckList[]): Observable<any>{
    return this.http.post<CheckList[]>(this.addCheckListArrayUrl, checkLists,{observe: 'response'})
  }
}
