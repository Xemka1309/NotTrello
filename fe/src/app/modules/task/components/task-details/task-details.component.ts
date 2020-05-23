import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../../../models/task';
import {DialogModel} from '../task-simple/task-simple.component';
import {Mark} from '../../../../models/mark';
import {MarkService} from '../../../../services/mark/markService';

@Component({
  selector: 'app-task-details',
  templateUrl: 'task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  private popoverActive = false;
  private popoverState = 'nothing';
  private readonly markPicker = 'markPicker';
  private newTaskModel: Task;

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    private markService: MarkService,
    @Inject(MAT_DIALOG_DATA) public data: DialogModel) {}

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.newTaskModel = this.data.task;

    const tasks: Mark[] = [];
    tasks.push({content:'test1',color:'#000000','board_id':9});
    tasks.push({content:'test2',color:'#000000','board_id':9});
    this.markService.addMarkArray(tasks).subscribe(result => {
      console.log(result);
    });

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

  changeMarkPicker() {
    if (this.popoverActive && this.popoverState === this.markPicker) {
      this.popoverActive = false;
      return;
    }
    if (this.popoverState !== this.markPicker) {
      this.popoverState = this.markPicker;
      this.popoverActive = true;
      return;
    }
    this.popoverActive = true;
  }

  private closeThis() {
    this.dialogRef.close(this.newTaskModel);
  }

  changeTitle(event) {
    this.newTaskModel.title = event;
  }

  changeDescription(event) {
    this.newTaskModel.description = event;
  }
}
