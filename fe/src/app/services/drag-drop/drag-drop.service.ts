import {Injectable} from '@angular/core';
import {CdkDropList} from '@angular/cdk/drag-drop';

@Injectable({providedIn: 'root'})
export class DragDropService {
  dragDropColumns: CdkDropList<any>[] = [];

  constructor() {
  }

  registerColumn(cdkDropList: CdkDropList) {
    this.dragDropColumns.push(cdkDropList);
  }

  getDragDropColumns(): CdkDropList<any>[] {
    return this.dragDropColumns;
  }

  deleteColumn(cdkDropList: CdkDropList): void {
    this.dragDropColumns.splice(this.dragDropColumns.indexOf(cdkDropList), 1);
  }
}
