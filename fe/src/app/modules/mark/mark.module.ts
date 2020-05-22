import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkCreatorComponent } from './components/mark-creator/mark-creator.component';
import {MarkPickerComponent} from './components/mark-picker/mark-picker.component';

@NgModule({
  declarations: [MarkCreatorComponent, MarkPickerComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  entryComponents: [],
  exports: [
    MarkCreatorComponent,
    MarkPickerComponent
  ],
  providers: [],
})
export class MarkModule { }
