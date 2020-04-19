import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NavBarComponent} from './components/nav-bar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, MatButtonModule, BrowserAnimationsModule, MatMenuModule, MatInputModule],
  exports: [NavBarComponent],
  providers: [],
})
export class NavBarModule {

}
