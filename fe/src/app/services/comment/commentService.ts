import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../../models/comment';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private baseUrl = '/api/comment';
  private getCommentByIdUrl = `${this.baseUrl}/get`;
  private getCommentsByTaskIdUrl = `${this.baseUrl}/getByTaskid`;
  private createCommentUrl = `${this.baseUrl}/add`;
  private updateCommentUrl = `${this.baseUrl}/edit`;
  private deleteCommentUrl = `${this.baseUrl}/delete`;

  constructor(private http: HttpClient) {
  }

  public createComment(comment: Comment): Observable<any> {
    if (comment) {
      return this.http.post<Comment>(this.createCommentUrl, comment, {
        observe: 'response'
      });
    }
  }

  public updateComment(comment: Comment): Observable<any> {
    if (!comment) {
      return;
    }
    return this.http.put<Comment>(this.updateCommentUrl, comment,{
      observe: 'response'
    })
  }

  public deleteComment(commentId): Observable<any> {
    if (!commentId) {
      return;
    }
    const params = new HttpParams({
      fromObject: { id: commentId }
    });
    return this.http.delete(this.deleteCommentUrl, {params, observe:'response'});
  }

  public getCommentById(id: string): Observable<Comment> {
    const params = new HttpParams({
      fromObject: {id}
    });

    return this.http.get<Comment>(this.getCommentByIdUrl, {params});
  }

  public getCommentsByTaskId(task_id: string): Observable<Comment[]> {
    const params = new HttpParams({
      fromObject: {id: task_id}
    });

    return this.http.get<Comment[]>(this.getCommentsByTaskIdUrl, {params});
  }
}
