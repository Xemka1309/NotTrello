import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {PagesModule} from './modules/pages/pages.module';
import {HomeComponent} from './modules/pages/components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserModule} from './modules/user/user.module';
import {RegFormComponent} from './modules/user/components/reg-form/reg-form.component';
import {LogInFormComponent} from './modules/user/components/log-in-form/log-in-form.component';
import {BoardModule} from './modules/board/board.module';
import {MarkModule} from './modules/mark/mark.module';
import {CommentsDisplayerComponent} from './modules/task/components/comments-displayer/comments-displayer.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

import {APIInterceptor} from './interceptors/APIInterceptor';
import {CanActivateLoginPagesService} from './services/security/can-activate-login-pages.service';
import {CanActivateNotLoginPagesService} from './services/security/can-activate-not-login-pages.service';
import {NavBarModule} from './modules/navigation/nav-bar.module';
import {BoardPageComponent} from './modules/pages/components/board/board-page.component';
import {ProfileComponent} from './modules/pages/components/profile/profile-component';
import {TaskModule} from './modules/task/task.module';
import {ColumnModule} from './modules/column/column.module';
import {BoardMenuComponent} from './modules/board/components/board-menu/board-menu.component';

import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {DirectiveModule} from './directives/directive.module';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {BoardJoinComponent} from './modules/board/components/board-join/board-join.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollY: true
};
const socketIoConfig: SocketIoConfig = {url: 'http://localhost:8000', options: {forceNew: true}};


const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [CanActivateLoginPagesService]},
  {path: 'board/:id', component: BoardPageComponent, canActivate: [CanActivateLoginPagesService]},
  {path: 'reg', component: RegFormComponent, canActivate: [CanActivateNotLoginPagesService]},
  {path: 'login', component: LogInFormComponent, canActivate: [CanActivateNotLoginPagesService]},
  {path: 'profile', component: ProfileComponent, canActivate: [CanActivateLoginPagesService]},
  {path: 'board/join/:str', component: BoardJoinComponent, canActivate: [CanActivateLoginPagesService]},
  { path: 'comments', component: CommentsDisplayerComponent},
  {path: 'board/menu/:id', component: BoardMenuComponent, canActivate: [CanActivateLoginPagesService]},
  {path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DirectiveModule,
    PagesModule,
    UserModule,
    TaskModule,
    ColumnModule,
    MatSliderModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MarkModule,
    BoardModule,
    BrowserAnimationsModule,
    NgbPopoverModule,
    NavBarModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(socketIoConfig),
  ],
  providers: [APIInterceptor, {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true
  },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
