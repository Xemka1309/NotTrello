import { Injectable } from '@angular/core';
import {AuthService} from '../auth.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateLoginPagesService implements CanActivate {
  constructor(public auth: AuthService,
              private router: Router) {

  }

  public canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
