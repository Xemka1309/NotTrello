import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Task} from '../../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = '/api/task';
  private addTaskUrl = `${this.baseUrl}/add`;

  constructor(private http: HttpClient) { }

  public addTask(task: any) {
    return this.http.post<Task>(this.addTaskUrl, task, {
      observe: 'response'
    });
  }
}
