import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BordsService } from 'src/app/services/bords/bordsService';
import { FormGroup, FormControl } from '@angular/forms';

export interface BordsConstructorDialogData {
  title: string;
  description: string;
  bordType: string;
  bordTypes: string[];
}

@Component({
  selector: 'app-bords-constructor',
  templateUrl: './bords-constructor.component.html',
  styleUrls: ['./bords-constructor.component.css']
})
export class BordsConstructorComponent implements OnInit {
  public title: string;
  public description: string;
  public bordType: string;
  public bordTypes: string[];

  constructor(private bordService: BordsService, public dialog: MatDialog) { }

  public ngOnInit() {
    this.bordService.getBordTypes().subscribe( (result) => {
      this.bordTypes = result.map(x => x.type);
    }, error => console.log(error));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BordsConstructorDialog, {
      width: '600px',
      data: { bordTypes: this.bordTypes, title: this.title, description: this.description, bordType: this.bordType }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      const bord = {
        id: 0,
        title: result.title,
        description: result.title || '',
        boardType: result.bordType
      };
      this.bordService.createBord(bord).subscribe(respnse => {
        console.log("response");
        console.log(respnse);
      });
    });
  }
}


@Component({
  selector: 'app-bords-constructor-dilog',
  templateUrl: '../bords-constructor-dialog/bords-constructor-dilog.component.html',
  styleUrls: ['../bords-constructor-dialog/bords-constructor-dilog.component.css']
})
export class BordsConstructorDialog implements OnInit {
  public bordTypes: string[];
  public form: FormGroup;
  constructor(
    private bordService: BordsService,
    public dialogRef: MatDialogRef<BordsConstructorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: BordsConstructorDialogData
  ) { }

  public ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      bordType: new FormControl()
    });
    this.bordService.getBordTypes().subscribe((result) => {
      this.bordTypes = result;
    }, error => console.log(error));
  }

  validate() {
    if (this.data.title && this.data.bordType){
      return true;
    }
    return false;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
