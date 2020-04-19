import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from 'src/app/services/board/boardService';
import { FormGroup, FormControl } from '@angular/forms';

export interface BoardsConstructorDialogData {
  title: string;
  description: string;
  bordType: string;
  bordTypes: string[];
}

@Component({
  selector: 'app-boards-constructor',
  templateUrl: './boards-constructor.component.html',
  styleUrls: ['./boards-constructor.component.css']
})
export class BoardsConstructorComponent implements OnInit {
  public title: string;
  public description: string;
  public bordType: string;
  public bordTypes: string[];

  constructor(private bordService: BoardService, public dialog: MatDialog) { }

  public ngOnInit() {
    this.bordService.getBoardTypes().subscribe( (result) => {
      this.bordTypes = result.map(x => x.type);
    }, error => console.log(error));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BoardsConstructorDialog, {
      width: '600px',
      data: { bordTypes: this.bordTypes, title: this.title, description: this.description, bordType: this.bordType }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      const board = {
        id: 0,
        title: result.title,
        description: result.title || '',
        boardType: result.bordType
      };
      this.bordService.createBord(board).subscribe(response => {
        console.log('response');
        console.log(response);
      });

    });
  }
}


@Component({
  selector: 'app-bords-constructor-dilog',
  templateUrl: '../boards-constructor-dialog/boards-constructor-dilog.component.html',
  styleUrls: ['../boards-constructor-dialog/boards-constructor-dilog.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class BoardsConstructorDialog implements OnInit {
  public bordTypes: string[];
  public form: FormGroup;
  constructor(
    private bordService: BoardService,
    public dialogRef: MatDialogRef<BoardsConstructorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: BoardsConstructorDialogData
  ) { }

  public ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      bordType: new FormControl()
    });
    this.bordService.getBoardTypes().subscribe((result) => {
      this.bordTypes = result;
    }, error => console.log(error));
  }

  validate() {
    return this.data.title && this.data.bordType;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
