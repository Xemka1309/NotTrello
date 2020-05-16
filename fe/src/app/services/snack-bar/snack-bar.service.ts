import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

  public openLongSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', {
      duration: 6000,
    });
  }
}
