import {Component, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../../models/task';
import {MatDialog} from '@angular/material/dialog';
import {TaskDetailsComponent} from '../task-details/task-details.component';
import {Socket} from 'ngx-socket-io';
import {TaskService} from '../../../../services/task/taskService';
import { Mark } from 'src/app/models/mark';

@Component({
  selector: 'app-task-simple',
  templateUrl: './task-simple.component.html',
  styleUrls: ['./task-simple.component.css']
})
export class TaskSimpleComponent implements OnInit {
  @Input()
  @Output()
  taskModel: Task;

  @Input()
  marks: Mark[];
  private penStyle = '/assets/icons/pen.svg';
  private priority1 = '/assets/icons/priority1.svg';
  private priority2 = '/assets/icons/priority2.svg';
  private priority3 = '/assets/icons/priority3.svg';
  private priority4 = '/assets/icons/priority4.svg';
  private priority5 = '/assets/icons/priority5.svg';
  constructor(public dialog: MatDialog,
              private socket: Socket,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskModel.marks = [];
    this.marks.forEach(mark => {
      if (this.taskModel.marks_ids.findIndex(m => m === mark.id) !== -1) {
        this.taskModel.marks.push(mark);
      }
    });

  }

  openDetails() {
    const calcWidth = window.innerWidth / 2;
    const width = calcWidth.toString() + 'px';
    const rightPos = ((window.innerWidth + calcWidth) / 2 );
    const popoverWidth = (Math.floor(rightPos / 5)).toString() + 'px';
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      width,
      data: {
        width: popoverWidth,
        leftPos: (rightPos + 5).toString() + 'px',
        task: this.taskModel,
        marks: this.marks
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.taskModel = result;
    });

  }
}

export interface DialogModel {
  width?: string;
  leftPos?: string;
  task?: Task;
  marks?: Mark[];
}
