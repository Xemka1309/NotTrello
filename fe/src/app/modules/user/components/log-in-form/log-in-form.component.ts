import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form-component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {

  public logInForm: FormGroup;
  constructor(private userService: UserService, private router: Router ) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      login: new FormControl(),
      password: new FormControl(),
    });
  }

  public goToRegistration() {
    this.router.navigate(['/reg']);
  }
  public logIn() {
    const login = this.logInForm.controls.login.value;
    const password = this.logInForm.controls.password.value;
    this.userService.logIn(login, password).subscribe((result) => {
      console.log(result);
      if (result.status === 200) {
        alert(`log in ok `);
        localStorage.setItem('token', result.body.token);
      }
    }, error => console.log(error));
  }
}
