import {Component, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../../models/task';
import {MatDialog} from '@angular/material/dialog';
import {TaskDetailsComponent} from '../task-details/task-details.component';

@Component({
  selector: 'app-task-simple',
  templateUrl: './task-simple.component.html',
  styleUrls: ['./task-simple.component.css']
})
export class TaskSimpleComponent implements OnInit {
  @Input()
  @Output()
  taskModel: Task;
  private penStyle = '/assets/icons/pen.svg';

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDetails() {
    const width = (window.innerWidth / 2).toString() + 'px';
    console.log(width);
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      width,
      data: {
        id: this.taskModel.idNum,
        priority_id: this.taskModel.priority_id,
        title: this.taskModel.title,
        description: this.taskModel.description,
        dueTime: this.taskModel.dueTime,
        completed: this.taskModel.completed
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
