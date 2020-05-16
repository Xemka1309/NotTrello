import {Component, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../models/task';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  openDetails() {

  }
}
