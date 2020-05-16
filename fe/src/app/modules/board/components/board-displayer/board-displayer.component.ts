import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../models/board';
import {BoardService} from '../../../../services/board/boardService';
import {ColumnService} from '../../../../services/column/columnService';
import {TaskService} from '../../../../services/task/taskService';
import {Column} from '../../../column/models/column';

@Component({
  selector: 'app-board-displayer',
  templateUrl: './board-displayer.component.html',
  styleUrls: ['./board-displayer.component.css']
})
export class BoardDisplayerComponent implements OnInit {
  @Input()
  boardId: string;
  boardModel: Board = null;
  private pickerStyle = '/assets/icons/move-picker.svg';

  constructor(private boardService: BoardService,
              private columnService: ColumnService,
              private taskService: TaskService) { }

  ngOnInit(): void {
    console.log(this.boardId);
    this.boardService.getBoardById(this.boardId).subscribe(value => {
      this.boardModel = value;
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
    // const column = {
    //   board_id: this.boardModel.id,
    //   title: 'neTestColumn',
    //   position: this.boardModel.columns.length
    // };
    // this.columnService.addColumn(column).subscribe(value => {
    //   console.log(value);
    // });
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
