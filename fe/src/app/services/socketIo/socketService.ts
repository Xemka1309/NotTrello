import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { SocketEvents } from './socketEvents';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private socket: Socket) { }

  public listenBoard(id: number): Observable<any> {
    const data = {
      id
    };
    return this.socket.emit(SocketEvents.getBoard, data);
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next());
    });
  }
  //public send()

}
