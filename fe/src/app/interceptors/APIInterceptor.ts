import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from '../services/storage.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = this.storage.getToken();
    const authReq = req.clone({
      headers: new HttpHeaders(token && token !== 'null' ? {
        'x-access-token': token
      } : null)
    });
    console.log('Intercepted HTTP call', authReq);
    return next.handle(authReq);
  }
}
