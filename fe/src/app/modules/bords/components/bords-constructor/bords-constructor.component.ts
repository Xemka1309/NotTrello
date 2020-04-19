import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BordsService } from 'src/app/services/bords/bordsService';

export interface BordsConstructorDialogData {
  title: string;
  description: string;
  bordType: string;
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

  public ngOnInit(){
    this.bordService.getBordTypes().subscribe( (result) => {
      this.bordTypes = result;
      console.log(result);
    }, error => console.log(error));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BordsConstructorDialog, {
      width: '600px',
      data: { title: this.title, description: this.description, bordType: this.bordType }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}


@Component({
  selector: 'app-bords-constructor-dilog',
  templateUrl: '../bords-constructor-dialog/bords-constructor-dilog.component.html',
  styleUrls: ['../bords-constructor-dialog/bords-constructor-dilog.component.css']
})
export class BordsConstructorDialog{
  constructor(
    public dialogRef: MatDialogRef<BordsConstructorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: BordsConstructorDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
