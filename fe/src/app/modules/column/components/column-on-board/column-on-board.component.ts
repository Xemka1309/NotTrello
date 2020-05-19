import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Column} from '../../../../models/column';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DragDropService} from '../../../../services/drag-drop/drag-drop.service';
import {Task} from 'src/app/models/task';
import {ColumnService} from 'src/app/services/column/columnService';

@Component({
  selector: 'app-column-on-board',
  templateUrl: './column-on-board.component.html',
  styleUrls: ['./column-on-board.component.css']
})
export class ColumnOnBoardComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  @Output()
  columnModel: Column;

  @Output()
  deleteEvent = new EventEmitter();

  @ViewChild(CdkDropList, {static: false})
  el: CdkDropList;

  private menuStyle = '/assets/icons/menu.svg';

  constructor(private dragDropService: DragDropService,
              private columnService: ColumnService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dragDropService.registerColumn(this.el);
  }

  ngOnDestroy(): void {
    this.dragDropService.deleteColumn(this.el);
  }

  get columnsConnectedTo(): CdkDropList<any>[] {
    return this.dragDropService.getDragDropColumns();
  }

  drop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container && event.previousIndex === event.currentIndex) {
      return;
    }
    const movedTask = event.previousContainer.data[event.currentIndex] as Task;
    console.log(movedTask.column_id);
    movedTask.column_id = this.columnModel.id;
    console.log(movedTask.column_id);
    this.columnService.taskMoved(event.previousIndex, event.currentIndex, movedTask);
    if (event.previousContainer === event.container) {
      moveItemInArray(this.columnModel.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  changeTitle($event: any) {
    console.log($event);
  }

  deleteColumn() {
    this.deleteEvent.emit(this.columnModel.id);
  }
}
