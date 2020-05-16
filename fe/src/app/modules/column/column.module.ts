import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {ColumnOnBoardComponent} from './components/column-on-board/column-on-board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TaskModule} from '../task/task.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
@NgModule({
  declarations: [ColumnOnBoardComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    DragDropModule,
    TaskModule,
    PerfectScrollbarModule
  ],
  exports: [ColumnOnBoardComponent],
  providers: [],
})
export class ColumnModule {

}
