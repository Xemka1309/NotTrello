import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../../services/storage.service';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(private storage: StorageService,
              private router: Router,
              private authService: AuthService) { }

  logOut() {
    this.storage.clearToken();
    this.router.navigate(['/login']);
  }
  get isLoggedIn(){
    return this.authService.isAuthenticated();
  }
  ngOnInit(): void { }
}
