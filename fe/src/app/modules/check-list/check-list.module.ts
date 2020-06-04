import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CheckListComponent} from './components/check-list.component';
import {MatCheckboxModule} from '@angular/material';
import {DirectiveModule} from '../../directives/directive.module';

@NgModule({
  declarations: [CheckListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    DirectiveModule
  ],
  entryComponents: [],
  exports: [
    CheckListComponent
  ],
  providers: [],
})
export class CheckListModule { }
