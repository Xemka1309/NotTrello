import {Component, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../../models/task';
import {MatDialog} from '@angular/material/dialog';
import {TaskDetailsComponent} from '../task-details/task-details.component';
import {Socket} from 'ngx-socket-io';
import {TaskService} from '../../../../services/task/taskService';

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

  constructor(public dialog: MatDialog,
              private socket: Socket,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  openDetails() {
    const calcWidth = window.innerWidth / 2;
    const width = calcWidth.toString() + 'px';
    const rightPos = ((window.innerWidth + calcWidth) / 2 ).toString() + 'px';
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      width,
      data: {
        id: this.taskModel.idNum,
        priority_id: this.taskModel.priority_id,
        title: this.taskModel.title,
        description: this.taskModel.description,
        dueTime: this.taskModel.dueTime,
        completed: this.taskModel.completed,
        pos: rightPos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.taskModel = result;
    });

  }
}
