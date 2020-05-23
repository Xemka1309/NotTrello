import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PriorityPickerComponent} from './priority-picker/priority-picker.component';

@NgModule({
  declarations: [PriorityPickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PriorityPickerComponent
  ],
  providers: [],
})
export class PriorityModule { }
