import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('token');
    const authReq = req.clone({
      headers: new HttpHeaders(token && token !== 'null' ? {
        'x-access-token': token
      } : null)
    });
    console.log('Intercepted HTTP call', authReq);
    return next.handle(authReq);
  }
}
