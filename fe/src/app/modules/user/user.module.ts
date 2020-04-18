import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [RegFormComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    BrowserAnimationsModule
  ],
  exports: [RegFormComponent],
  providers: [],
})
export class UserModule {

}
