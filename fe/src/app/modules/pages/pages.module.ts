import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {BoardPageComponent} from './components/board/board-page.component';
import { BoardModule } from '../board/board.module';


@NgModule({
  declarations: [HomeComponent, BoardPageComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    BoardModule
  ],
  exports: [HomeComponent, BoardPageComponent],
  providers: [],
})
export class PagesModule {

}
