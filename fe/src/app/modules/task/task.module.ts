import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {TaskSimpleComponent} from './components/task-simple/task-simple.component';
import {TaskDetailsComponent} from './components/task-details/task-details.component';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [TaskSimpleComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  exports: [TaskSimpleComponent, TaskDetailsComponent],
  entryComponents: [TaskDetailsComponent],
  providers: [],
})
export class TaskModule {

}
