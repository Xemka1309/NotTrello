import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NavBarComponent } from './components/navigation/nav-bar.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
@NgModule({
  declarations: [RegFormComponent, NavBarComponent, LogInFormComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule
  ],
  exports: [RegFormComponent, NavBarComponent, LogInFormComponent],
  providers: [],
})
export class UserModule {

}
