import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AppComponent} from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {PagesModule} from './modules/pages/pages.module';
import { HomeComponent } from './modules/pages/components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './modules/user/user.module';
import { RegFormComponent } from './modules/user/components/reg-form/reg-form.component';
import { LogInFormComponent } from './modules/user/components/log-in-form/log-in-form.component';
import { APIInterceptor } from './interceptors/APIInterceptor';
import {CanActivateLoginPagesService} from './services/security/can-activate-login-pages.service';
import {CanActivateNotLoginPagesService} from './services/security/can-activate-not-login-pages.service';
import {NavBarModule} from './modules/navigation/nav-bar.module';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [CanActivateLoginPagesService]},
  { path: 'reg', component: RegFormComponent, canActivate: [CanActivateNotLoginPagesService]},
  { path: 'login', component: LogInFormComponent, canActivate: [CanActivateNotLoginPagesService]},
  { path: '**', component: HomeComponent}
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PagesModule,
    UserModule,
    MatSliderModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NavBarModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [APIInterceptor, {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
