import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CheckList} from '../../../models/check-list';
import {CheckListItem} from '../../../models/check-list-item';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent {
  @Input()
  checkLists: CheckList[];
  @Output()
  state = new EventEmitter();
  deleteStyle = '/assets/icons/suicide.svg';

  constructor() {
  }

  addCheckListItem(i: number) {
    const cli = new CheckListItem();
    cli.completed = false;
    cli.content = 'новый айтем';
    cli.check_list_id = this.checkLists[i].id;
    this.checkLists[i].items.push(cli);
  }

  changeCliContent(event, i: number, j: number) {
    this.checkLists[i].items[j].content = event;
    this.state.emit(this.checkLists);
  }

  changeItemStatus(event, i: number, j: number) {
    this.checkLists[i].items[j].completed = !this.checkLists[i].items[j].completed;
    this.state.emit(this.checkLists);
  }

  changeCheckListTitle(event, i: number) {
    this.checkLists[i].title = event;
    this.state.emit(this.checkLists);
  }

  deleteCheckList(i: number) {
    this.checkLists.splice(i, 1);
    this.state.emit(this.checkLists);
  }

  deleteCheckListItem(i: number, j: number) {
    this.checkLists[i].items.splice(j, 1);
  }
}
