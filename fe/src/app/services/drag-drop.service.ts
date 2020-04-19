import {Injectable} from '@angular/core';
import {CdkDropList} from '@angular/cdk/drag-drop';

@Injectable({providedIn: 'root'})
export class DragDropService {
  dropListConnectedToList: CdkDropList<any>[] = [];

  constructor() {
  }

register(cdkDropList: CdkDropList) {
  this.dropListConnectedToList.push(cdkDropList);
}

getDropListConnectedToList(): CdkDropList<any>[] {
  return this.dropListConnectedToList;
}

delete(cdkDropList: CdkDropList): void {
  this.dropListConnectedToList.splice(this.dropListConnectedToList.indexOf(cdkDropList), 1);
}
}
