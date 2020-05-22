import {Component, Input, OnInit} from '@angular/core';
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
  private pickerStyle = '/assets/icons/move-picker.svg';
  menuVisible = 'hidden';
  private md5 = new Md5();

  constructor(private boardService: BoardService,
              private columnService: ColumnService,
              private taskService: TaskService,
              private userService: UserService,
              private particService: ParticipantService,
              private snack: SnackBarService,
              private router: Router,
              private socket: Socket) { }

  ngOnInit(): void {
    console.log(this.boardId);
    this.boardService.getBoardById(this.boardId).subscribe(value => {
      this.boardModel = value;
      console.log('board model');
      console.log(this.boardModel);
      this.boardModel.columns.forEach((col, i) => {
        col.tasks.forEach(t => {
          t.column_id = col.id;
        });
      });
      this.boardService.getConcretePartic(this.boardId).subscribe(
        result => {
          this.participantRole = result.user_role;
        }, error => {
        if(this.boardModel.boardType === 'PRIVATE') {
          this.router.navigate(['/home']);
          this.snack.openLongSnackBar('Туда низя...');
        }
      });
      console.log(this.boardModel);
      this.listenChanges();
    });
  }

  private listenChanges() {
    this.menuVisible = 'hidden';
    this.socket.on('connect', () => {
      this.socket.connect();
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

  private sendBoardChanges(): void {
    this.socket.emit('board refresh', {
      boardId: this.boardId
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
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
  }

  // tslint:disable-next-line:variable-name
  addTask(column: Column) {
    const body = {
      column_id: column.id,
      title: 'Новая задачка',
      priority: 'HIGH',
      due_time: 14123123,
      position: column.tasks.length
    };
    this.taskService.addTask(body).subscribe(response => {
      console.log(response);
      this.sendBoardChanges();
    });
  }

  public taskMoved(event) {
    const taskId = event as number;
    this.sendBoardChanges();
  }

  public deleteColumn(event) {
    console.log(event);
    Board.deleteColumn(this.boardModel, event as number);
    this.sendBoardChanges();
  }

  showMenu(): void {
    this.menuVisible = 'visible';
  }

  picChanged(e){
    this.boardService.getBoardById(this.boardModel.id.toString()).subscribe(r => {
      this.boardModel = r;
    })
  }
  isClosed(closed: any) {
    closed ? this.menuVisible = 'hidden' : this.menuVisible = 'visible';
  }

  get backgroundImage() {
    return {'background-image': 'url(' + this.boardModel.pictureUrl + ')'};
  }

  get generateAccessRef() {
    const md5 = new Md5();
    const str = md5.appendStr(this.boardModel.id.toString()).end();
    return 'Ссылка для приглашения вами других челов: http://localhost:4200/board/join/' + str;
  }
}
