import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../models/board';
import {BoardService} from '../../../../services/board/boardService';
import {ColumnService} from '../../../../services/column/columnService';
import {TaskService} from '../../../../services/task/taskService';
import {Column} from '../../../column/models/column';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-board-displayer',
  templateUrl: './board-displayer.component.html',
  styleUrls: ['./board-displayer.component.css']
})
export class BoardDisplayerComponent implements OnInit {
  @Input()
  boardId: string;
  boardModel: Board = null;
  //private soket: Socket = null;
  private pickerStyle = '/assets/icons/move-picker.svg';

  constructor(private boardService: BoardService,
              private columnService: ColumnService,
              private taskService: TaskService,
              private socket: Socket) { }

  ngOnInit(): void {
    console.log(this.boardId);
    this.boardService.getBoardById(this.boardId).subscribe(value => {
      this.boardModel = value;
      this.boardModel.columns.forEach((col, i) => {
        col.tasks.forEach(t => {
          t.column_id = col.id;
        });
      });
      this.listenChanges();
    });
  }

  private listenChanges(){
    this.socket.on("connect", () => {
      this.socket.connect();
      this.socket.ioSocket.join(`boardRoom:${this.boardId}`);
    });
    this.socket.on("disconnect", () => this.socket.disconnect);
    this.socket.on("error", (error: string) => {
      console.log(`ERROR: "${error}"`);
    });
  }

  drop(event: CdkDragDrop<any>) {
    //
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
    });
  }

  // tslint:disable-next-line:variable-name
  addTask(column: Column) {
    const body = {
      column_id: column.id,
      title: 'testTaskTitle',
      priority: 'HIGH',
      due_time: 14123123,
      position: column.tasks.length
    };
    this.taskService.addTask(body).subscribe(response => {
      console.log(response);
    });
  }

}
