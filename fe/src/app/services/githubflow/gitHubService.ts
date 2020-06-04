import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment';

@Injectable({
  providedIn: 'root'
})

export class GitService {

  private baseUrl = 'https://api.github.com/';
  constructor(private http:HttpClient){}

  public GetRepoBranches() {
    this.http.get(this.baseUrl + 'repos/Xemka1309/NotTrello/branches').subscribe(r => {
      console.log(r);
    });
  }

}
