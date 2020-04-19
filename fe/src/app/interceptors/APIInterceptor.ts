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
import {StorageService} from '../services/storage.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService, private router: Router) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = this.storage.getToken();
    const authReq = req.clone({
      headers: new HttpHeaders(token && token !== 'null' ? {
        'x-access-token': token
      } : null)
    });
    console.log('Intercepted HTTP call', authReq);
    return next.handle(authReq).pipe(tap(evt => console.log(evt), error => {
      console.log(error);
      if (error instanceof HttpErrorResponse) {
        this.storage.clearToken();
        this.router.navigate(['/login']);
      }
    }));
  }
}
