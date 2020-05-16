import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {BoardPageComponent} from './components/board/board-page.component';
import {BoardModule} from '../board/board.module';
import { ProfileComponent } from './components/profile/profile-component';
@NgModule({
  declarations: [HomeComponent, BoardPageComponent, ProfileComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BoardModule
  ],
  exports: [HomeComponent, BoardPageComponent, ProfileComponent],
  providers: [],
})
export class PagesModule {

}
