import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
@NgModule({
  declarations: [HomeComponent],
  imports: [ CommonModule, MatSliderModule, MatButtonModule, BrowserAnimationsModule, MatProgressSpinnerModule ],
  exports: [HomeComponent],
  providers: [],
})
export class PagesModule {

}
