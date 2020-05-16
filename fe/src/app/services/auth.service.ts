import {Injectable} from '@angular/core';
import {StorageService} from './storage/storage.service';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private storage: StorageService) {}

  public isAuthenticated(): boolean {
    const token = this.storage.getToken();
    return token && token !== 'null';
  }
}
