import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../../../models/board';
import {BoardService} from '../../../../services/board/boardService';
import {ColumnService} from '../../../../services/column/columnService';
import {TaskService} from '../../../../services/task/taskService';
import {Column} from '../../../../models/column';
import {UserService} from '../../../../services/user/user.service';
import { Socket } from 'ngx-socket-io';
import {Md5} from 'ts-md5';
import {ParticipantService} from '../../../../services/participant/participant.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../../../services/snack-bar/snack-bar.service';
import { Mark } from 'src/app/models/mark';
import { GitService } from 'src/app/services/githubflow/gitHubService';
import { Message } from 'src/app/models/message';



export interface ColAssign {
  colId: number;
  containerId: number;
}
export interface ItemAssign {
  index: number;
  position: number;
}

@Component({
  selector: 'app-board-displayer',
  templateUrl: './board-displayer.component.html',
  styleUrls: ['./board-displayer.component.css']
})
export class BoardDisplayerComponent implements OnInit {
  @Input()
  boardId: string;
  boardModel: Board = null;
  participantRole: String = '';
  participants: any[];
  private posDictionary: ItemAssign[];
  private colDictionary: ColAssign[];
  private pickerStyle = '/assets/icons/move-picker.svg';
  menuVisible = 'hidden';
  chatHidden = true;
  private userLogin = 'anonimus';
  private md5 = new Md5();
  public messages : Message[] = [];

  @Output()
  resetChatState = new EventEmitter<boolean>();

  constructor(private boardService: BoardService,
              private columnService: ColumnService,
              private taskService: TaskService,
              private userService: UserService,
              private particService: ParticipantService,
              private snack: SnackBarService,
              private router: Router,
              private socket: Socket,
              private git: GitService) { }

  ngOnInit(): void {
    this.boardService.getBoardById(this.boardId).subscribe(value => {
      this.boardModel = value;
      console.log('Board model loaded');
      console.log(this.boardModel);
      this.boardModel.columns.forEach((col, i) => {
        col.tasks.forEach(t => {
          t.column_id = col.id;
        });
      });
      this.rePosition();
      this.userService.getCurrentUser().subscribe(u => {
        this.userLogin = u.login;
      });
      this.boardService.getConcretePartic(this.boardId).subscribe(
        result => {
          this.participantRole = result.user_role;
        }, error => {
          if (this.boardModel.boardType === 'PRIVATE') {
            this.router.navigate(['/home']);
            this.snack.openLongSnackBar('Туда низя...');
          }
        });
      this.listenChanges();
    });
  }


  private rePosition() {
    let ind = 0;
    for (let col of this.boardModel.columns) {
      col.position = ind++;
      let j = 0;
      for (let task of col.tasks) {
        task.position = j++;
      }
    }

    this.boardModel.columns.forEach(element => {
      this.columnService.updateColumn(element).subscribe(r => {
        let a = r;
      });
      element.tasks.forEach(t => {
        this.taskService.updateTask(t).subscribe(t => {
          let a = '';
        });
      });
    });

  }

  private listenChanges() {
    this.menuVisible = 'hidden';
    this.socket.on('connect', () => {
      this.socket.connect();
    });

    this.socket.on('chatMessage', (message) => {
      this.messages.push({
        content : message.message,
        senderLogin : message.sender
      });
      console.log(this.messages);
    });

    this.socket.on('board changed', (data) => {
      console.log('board changes accepted');
      this.boardService.getBoardById(this.boardId).subscribe(value => {
        this.boardModel = value;
        this.boardModel.columns.forEach((col, i) => {
          col.tasks.forEach(t => {
            t.column_id = col.id;
          });
        });
      });
    });
    this.socket.emit('connect to board', {
      boardId: this.boardId
    });
    this.socket.on('disconnect', () => this.socket.disconnect);
    this.socket.on('error', (error: string) => {
      console.log(error);
    });
  }

  public gitGo(){
    this.git.GetRepoBranches();
  }
  private sendBoardChanges(): void {
    this.socket.emit('board refresh', {
      boardId: this.boardId
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container
      && event.previousIndex === event.currentIndex) {
      return;
    }
    const first  = event.previousContainer.data[event.previousIndex] as Column;
    const second = event.previousContainer.data[event.currentIndex] as Column;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    const buff = first.position;
    first.position = second.position;
    second.position = buff;
    this.columnService.updateColumn(first).subscribe(r => {
      this.columnService.updateColumn(second).subscribe(r => {
        this.sendBoardChanges();
      });
    });
    this.rePosition();
  }

  addColumn() {
    const column = {
      board_id: this.boardModel.id,
      title: 'новая колонка',
      position: this.boardModel.columns.length
    } as Column;
    this.columnService.addColumn(column).subscribe(value => {
      this.boardModel.columns.push(value);
      this.sendBoardChanges();
    });
    this.rePosition();
  }

  // tslint:disable-next-line:variable-name
  addTask(column: Column) {
    const body = {
      column_id: column.id,
      title: 'Новая задачка',
      priority: 'HIGH',
      due_time: 14123123,
      position: column.tasks.length,
    };
    this.taskService.addTask(body).subscribe(response => {
      console.log(response);
      this.rePosition();
      this.sendBoardChanges();
    });
  }

  public taskMoved(event) {
    this.rePosition();
    this.sendBoardChanges();
  }

  public deleteColumn(event) {
    const colId = (event as number).toString();
    this.columnService.deleteColumn(colId).subscribe(r => {
      this.snack.openLongSnackBar('Удалили столбец...');
    });
    this.boardModel.columns.splice(this.boardModel.columns.findIndex(c => c.id == event as number), 1);
    this.rePosition();
    this.sendBoardChanges();
  }

  showMenu(): void {
    this.menuVisible = 'visible';
  }

  picChanged(e) {
    if (!this.boardModel) {
      return;
    }
    this.boardService.getBoardById(this.boardModel.id.toString()).subscribe(r => {
      this.boardModel = r;
    });
  }
  isClosed(closed: any) {
    closed ? this.menuVisible = 'hidden' : this.menuVisible = 'visible';
  }

  get backgroundImage() {
    if (!this.boardModel) {
      return;
    }
    return {'background-image': 'url(' + this.boardModel.pictureUrl + ')'};
  }

  get generateAccessRef() {
    if (!this.boardModel) {
      return;
    }
    const md5 = new Md5();
    const str = md5.appendStr(this.boardModel.id.toString()).end();
    return 'Ссылка для приглашения вами других челов: http://localhost:4200/board/join/' + str;
  }
  public showChat() {
    if (this.chatHidden) {
      this.chatHidden = false;
    }
    else {
      this.chatHidden = true;
      //this.resetChatState.emit(true);
    }

  }
  public sendMessage(event){
    this.socket.emit('chatMessageb', {
      message: event as string,
      sender: this.userLogin,
      boardId: this.boardId
    });
  }
}
