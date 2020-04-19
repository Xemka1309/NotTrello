import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../models/board';
import {BoardService} from '../../../../services/board/boardService';
import {ColumnService} from "../../../../services/column/columnService";

@Component({
  selector: 'app-board-displayer',
  templateUrl: './board-displayer.component.html',
  styleUrls: ['./board-displayer.component.css']
})
export class BoardDisplayerComponent implements OnInit {
  @Input()
  boardId: string;
  boardModel: Board;
  constructor(private boardService: BoardService,
              private columnService: ColumnService) { }

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
    const column = {
      board_id: this.boardModel.id,
      title: 'testTitle',
      position: this.boardModel.columns.length
    }
    this.columnService.addColumn(column).subscribe(value => {
      console.log(value);
    });
  }
}
