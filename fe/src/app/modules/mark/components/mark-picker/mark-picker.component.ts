import {ActivatedRoute} from '@angular/router';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MarkService} from '../../../../services/mark/markService';
import {Mark} from '../../../../models/mark';

@Component({
  selector: 'app-mark-picker',
  templateUrl: './mark-picker.component.html',
  styleUrls: ['./mark-picker.component.css']
})
export class MarkPickerComponent {
  @Input()
  marks: Mark[];
  @Input()
  selectedMarks: Mark[];
  @Output()
  clickMark = new EventEmitter();
  markSelected = '/assets/icons/check-mark.svg';

  constructor() {
  }

  clickOnMark(i: number) {
    this.clickMark.emit(this.marks[i]);
  }
}
