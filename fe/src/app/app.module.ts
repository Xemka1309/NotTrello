import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {PagesModule} from './modules/pages/pages.module';
import { HomeComponent } from './modules/pages/components/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {} from '@angular/material';

import { UserModule } from './modules/user/user.module';
import { RegFormComponent } from './modules/user/components/reg-form/reg-form.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'reg', component: RegFormComponent},
  { path: '**', component: HomeComponent}
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    UserModule,
    MatSliderModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
