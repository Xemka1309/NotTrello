import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {StorageService} from '../../../../services/storage.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form-component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {

  public logInForm: FormGroup;
  constructor(private userService: UserService,
              private router: Router,
              private storage: StorageService ) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      login: new FormControl(),
      password: new FormControl(),
    });
  }

  public goToRegistration() {
    this.router.navigate(['/reg']);
  }

  private goToHome() {
    this.router.navigate(['/home']);
  }

  public logIn() {
    this.storage.clearToken();
    const login = this.logInForm.controls.login.value;
    const password = this.logInForm.controls.password.value;
    this.userService.logIn(login, password).subscribe((result) => {

      if (result.status === 200) {
        alert(result.body.message);
        this.storage.setToken(result.body.token);
        this.goToHome();
      }
    }, error => console.log(error));
  }
}
