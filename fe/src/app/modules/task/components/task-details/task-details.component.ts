import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../../../models/task';
import {DialogModel} from '../task-simple/task-simple.component';

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
    @Inject(MAT_DIALOG_DATA) public data: DialogModel) {}

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.newTaskModel = this.data.task;

    this.dialogRef.beforeClosed().subscribe(result => {
      this.closeThis();
    });
    this.dialogRef.backdropClick().subscribe(result => {
      this.closeThis();
    });
  }

  changeMark(event) {
    console.log(event);
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
