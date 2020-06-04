import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../../../models/task';
import {DialogModel} from '../task-simple/task-simple.component';
import {Mark} from '../../../../models/mark';
import {MarkService} from '../../../../services/mark/markService';
import {CheckList} from '../../../../models/check-list';

@Component({
  selector: 'app-task-details',
  templateUrl: 'task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  private popoverActive = false;
  private popoverState = 'nothing';
  private readonly markPicker = 'markPicker';
  private readonly priorityPicker = 'priorityPicker';
  private newTaskModel: Task;
  private priority1 = '/assets/icons/priority1.svg';
  private priority2 = '/assets/icons/priority2.svg';
  private priority3 = '/assets/icons/priority3.svg';
  private priority4 = '/assets/icons/priority4.svg';
  private priority5 = '/assets/icons/priority5.svg';

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    private markService: MarkService,
    @Inject(MAT_DIALOG_DATA) public data: DialogModel) {}

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.newTaskModel = this.data.task;
    if (!this.newTaskModel.check_lists) {
      this.newTaskModel.check_lists = [];
    }

    this.dialogRef.beforeClosed().subscribe(result => {
      this.closeThis();
    });
    this.dialogRef.backdropClick().subscribe(result => {
      this.closeThis();
    });
  }

  changeMark(event) {
    console.log(event);
    const mark = event as Mark;
    if (!this.newTaskModel.marks) {
      this.newTaskModel.marks = [];
    }

    if (!this.newTaskModel.marks_ids) {
      this.newTaskModel.marks_ids = [];
    }

    if (this.newTaskModel.marks.includes(mark)) {
      const i = this.newTaskModel.marks.indexOf(mark);
      this.newTaskModel.marks.splice(i, 1);
    } else {
      this.newTaskModel.marks.push(mark);
    }

    if (this.newTaskModel.marks_ids.includes(mark.id)) {
      const i = this.newTaskModel.marks_ids.indexOf(mark.id);
      this.newTaskModel.marks_ids.splice(i, 1);
    } else {
      this.newTaskModel.marks_ids.push(mark.id);
    }
  }

  changeState(state: string) {
    if (this.popoverActive && this.popoverState === state) {
      this.popoverActive = false;
      return;
    }
    if (this.popoverState !== state) {
      this.popoverState = state;
      this.popoverActive = true;
      return;
    }
    this.popoverActive = true;
  }

  private closeThis() {
    this.preparePositions();
    this.dialogRef.close(this.newTaskModel);
  }

  private preparePositions() {
    this.newTaskModel.check_lists.forEach((cl, i) => {
      cl.position = i;
    });
  }

  changeTitle(event) {
    this.newTaskModel.title = event;
  }

  changeDescription(event) {
    this.newTaskModel.description = event;
  }

  changePriority(event) {
    this.newTaskModel.priority_id = event;
  }

  changeCheckList(event) {
    this.newTaskModel.check_lists = event;
  }

  deleteMe() {
    const a = {
      deleted: true
    } as DialogModel;
    this.dialogRef.close(a);
  }

  addCheckList() {
    const checkList = new CheckList();
    checkList.items = [];
    checkList.task_id = +this.newTaskModel.id;
    checkList.title = 'новый чек-лист';
    this.newTaskModel.check_lists.push(checkList);
  }
}
