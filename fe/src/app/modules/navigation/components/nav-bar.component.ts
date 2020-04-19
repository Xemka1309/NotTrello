import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../../services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(private storage: StorageService,
              private router: Router) { }

  logOut() {
    this.storage.clearToken();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void { }
}
