import {AfterViewInit, Component, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Column} from '../../models/column';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DragDropService} from '../../../../services/drag-drop/drag-drop.service';

@Component({
  selector: 'app-column-on-board',
  templateUrl: './column-on-board.component.html',
  styleUrls: ['./column-on-board.component.css']
})
export class ColumnOnBoardComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  @Output()
  columnModel: Column;

  @ViewChild(CdkDropList, {static: false})
  el: CdkDropList;

  private menuStyle = '/assets/icons/menu.svg';

  constructor(private dragDropService: DragDropService) {
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
    if (event.previousContainer === event.container) {
      moveItemInArray(this.columnModel.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
