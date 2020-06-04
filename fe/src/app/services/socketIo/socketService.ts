import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {SocketEvents} from './socketEvents';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) {
  }

  public startListenBoard(id: string): Observable<any> {
    const data = {
      boardId: id
    };
    return this.socket.emit(SocketEvents.listenBoard, data);
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next());
    });
  }


}
