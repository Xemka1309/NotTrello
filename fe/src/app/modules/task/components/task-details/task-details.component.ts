import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../../../models/task';
import {TaskService} from '../../../../services/task/taskService';

@Component({
  selector: 'app-task-details',
  templateUrl: 'task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
  private popoverActive = false;
  private popoverState = 'nothing';
  private readonly markPicker = 'markPicker';
  private taskTitle;
  private taskDescription;

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: Task) {}

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.taskTitle = this.data.title;
    this.taskDescription = this.data.description;

    //this.taskService.addMarkToTask('32','6').subscribe();

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
    const task = new Task();
    task.title = this.taskTitle;
    task.description = this.taskDescription;
    task.pos = this.data.pos;
    task.marks = this.data.marks;
    task.id = this.data.id;
    task.column_id = this.data.column_id;
    task.completed = this.data.completed;
    task.priority_id = this.data.priority_id;
    task.idNum = this.data.idNum;
    this.dialogRef.close(task);
  }

  changeTitle(event) {
    this.taskTitle = event;
  }

  changeDescription(event) {
    this.taskDescription = event;
  }
}
