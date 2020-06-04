import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-priority-picker',
  templateUrl: './priority-picker.component.html',
  styleUrls: ['./priority-picker.component.css']
})
export class PriorityPickerComponent {
  @Input()
  selectedPriority: number;
  @Output()
  changePriority = new EventEmitter();

  private priority1 = '/assets/icons/priority1.svg';
  private priority2 = '/assets/icons/priority2.svg';
  private priority3 = '/assets/icons/priority3.svg';
  private priority4 = '/assets/icons/priority4.svg';
  private priority5 = '/assets/icons/priority5.svg';

  constructor() {
  }

  select(i: number) {
    this.selectedPriority = i;
    this.changePriority.emit(i);
  }
}
