import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BoardsConstructorComponent, BoardsConstructorDialog } from './components/boards-constructor/boards-constructor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardDisplayerComponent } from './components/board-displayer/board-displayer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardsListComponent } from './components/bords-list/boards-list-component';
import { RouterModule } from '@angular/router';
import { BoardMenuComponent } from "./components/board-menu/board-menu.component";

@NgModule({
  declarations: [BoardsConstructorComponent, BoardsConstructorDialog, BoardsListComponent, BoardDisplayerComponent, BoardMenuComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule
  ],
  entryComponents: [BoardsConstructorDialog],
  exports: [
    BoardsConstructorComponent,
    BoardDisplayerComponent,
    BoardsListComponent,
    BoardMenuComponent
  ],
  providers: [],
})
export class BoardModule { }
