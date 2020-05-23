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
import { CommentsDisplayerComponent} from './components/comments-displayer/comments-displayer.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DirectiveModule} from '../../directives/directive.module';
import {MarkModule} from '../mark/mark.module';
import {PriorityModule} from '../priority/priority.module';
import {CheckListModule} from '../check-list/check-list.module';
@NgModule({
  declarations: [TaskSimpleComponent, TaskDetailsComponent, CommentsDisplayerComponent],
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
    MatCardModule,
    DirectiveModule,
    MarkModule,
    PriorityModule,
    CheckListModule
  ],
  exports: [TaskSimpleComponent, TaskDetailsComponent, CommentsDisplayerComponent],
  entryComponents: [TaskDetailsComponent],
  providers: [],
})
export class TaskModule {

}
