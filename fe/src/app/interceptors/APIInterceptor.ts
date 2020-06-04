import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from '../services/storage/storage.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SnackBarService} from '../services/snack-bar/snack-bar.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService,
              private router: Router,
              private snack: SnackBarService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = this.storage.getToken();
    const authReq = req.clone({
      headers: new HttpHeaders(token && token !== 'null' ? {
        'x-access-token': token
      } : null)
    });
    return next.handle(authReq).pipe(tap(evt => evt.type, error => {
      console.log(error);
      if (error instanceof HttpErrorResponse && 403 === error.status) {
        this.storage.clearToken();
        this.snack.openSnackBar('Время вашего сеанса истекло, пожалуйста авторизуйтесь еще раз!');
        this.router.navigate(['/login']);
      }
    }));
  }
}
